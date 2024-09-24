import React, {  useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import AdminFormContext from "../../../context/modules/AdminFormContext";
// import { AdminFormListData } from "../../../types/AdminGategoryType";
import axios from "axios";
// import { createAxiosInstance } from "../../../context/modules/Interceptor";
import EventPopup from "../../client/calendar/EventPopup";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
  id: string;
}

type EventType = {
  _id: string;
  jobTitle: {
    jobTitle: string;
  };
  description: string;
  location: string;
};

const ClientCalendarDashboard: React.FC = () => {
  const [getCalendarData, setGetCalendarData] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  // const { setGetSubCategoriesItemsDatas } = useContext(AdminFormContext) as AdminFormListData;

  useEffect(() => {
    const getCalendarDate = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/client/calender-show-data');
        if (response.data && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((event: { date: string, time: string }) => {
            const [year, month, day] = event.date.split('T')[0].split('-');
            const [hours, minutes] = event.time.split(':');
            const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1-hour duration
            return {
              id: (event as unknown as EventType)._id,
              title: (event as unknown as EventType).jobTitle.jobTitle,
              start: startDate,
              end: endDate,
              description: (event as unknown as EventType).description,
              location: (event as unknown as EventType).location,
            };
          });
          setGetCalendarData(formattedData);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching calendar data:", error.response?.data?.message);
        }
      }
    };
    getCalendarDate();
  }, []);

  const handleEdit = (updatedEvent: CalendarEvent) => {
    setGetCalendarData(prevData =>
      prevData.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const handleDelete = (id: string) => {
    setGetCalendarData(prevData => prevData.filter(event => event.id !== id));
  };

  return (
    <>
      <div className="p-6 helvetic">
        <Calendar
          views={["day", "agenda", "work_week", "month"]}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={getCalendarData}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectEvent={handleEventClick}
          style={{ height: "90vh", cursor: "pointer", fontSize: "12px" }}
        />
      </div>
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ClientCalendarDashboard;
