import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import JobRequestForm from "./JobRequestForm";
import AdminFormContext from "../../../context/modules/AdminFormContext";
import { AdminFormListData } from "../../../types/AdminGategoryType";
import axios from "axios";
import {  createAxiosInstance } from "../../../context/modules/Interceptor";
// import EventPopup from "./EventPopup";
import EventPopup from "../../client/calendar/EventPopup";


const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
}

const ClientCalendarDashboard: React.FC = () => {
  const [getCalendarData, setGetCalendarData] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleEventClick = (event: CalendarEvent) => {
    // alert(`Event clicked: ${event.title} on ${moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}`);
    setSelectedEvent(event);
  };

  // const handleSlotClick = (slotInfo: SlotInfo) => {
  //   // setCalendarDate(moment(slotInfo.start).format('MMMM Do YYYY'));
  // };

  const { setGetSubCategoriesItemsDatas } = useContext(AdminFormContext) as AdminFormListData;
  


  useEffect(() => {
    const getCalendarDate = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/client/calender-show-data');
        console.log(response.data, 'response.data');
        if (response.data && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((event: any) => {
            const [year, month, day] = event.date.split('T')[0].split('-');
            const [hours, minutes] = event.time.split(':');
            const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 
            return {
              id:event._id,           
              title: event.jobTitle.jobTitle,
              start: startDate,
              end: endDate,
              description: event.description,
              location: event.location,
            };
          });
          setGetCalendarData(formattedData);
        } else {
          console.log(response.data.msg);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching calendar data:", error.response?.data?.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };
    getCalendarDate();
  }, []);

  useEffect(() => {
    const axiosInstance = createAxiosInstance();
    const getMainCategory = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:5000/api/admin/get-sub-category-items");
        const categories = response.data.subCategoryItems;
        setGetSubCategoriesItemsDatas(categories);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching categories:", error.response?.data?.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };
    getMainCategory();
  }, [setGetSubCategoriesItemsDatas]);

  console.log(getCalendarData, 'getCalendarData');

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
          // onSelectSlot={handleSlotClick}
          style={{ height: "90vh", cursor: "pointer",fontSize: "12px" }}
        />
      </div>
      {selectedEvent && (
      <EventPopup
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    )}
      {/* {isActive && (
        <JobRequestForm calendarDate={calendarDate} setIsActive={setIsActive} />
      )} */}
    </>
  );
};

export default ClientCalendarDashboard;
