import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import JobRequestForm from "./JobRequestForm";
import AdminFormContext from "../../../context/modules/AdminFormContext";
import { AdminFormListData } from "../../../types/AdminGategoryType";
import axios from "axios";
import {  createAxiosInstance } from "../../../context/modules/Interceptor";
import EventPopup from "./EventPopup";


const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
  id: string;
}
interface Event {
  date: string;
  time: string;
  _id: string; // Add this line to include the _id property
  jobTitle: {
    jobTitle: string;
  };
  description: string;
  location: string;
}

const ClientCalendar: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<string | null>(null);
  const [getCalendarData, setGetCalendarData] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const { setGetSubCategoriesItemsDatas } = useContext(AdminFormContext) as AdminFormListData;

  const axiosInstance = createAxiosInstance();
  useEffect(() => {
    const getCalendarDate = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/client/calender-show-data');
        if (response.data && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((event: Event) => {
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
  }, [setGetSubCategoriesItemsDatas,axiosInstance]);

  const handleEventClick = (event: CalendarEvent) => {
    console.log(event,'&&&&event &&&&')
    // alert(`Event clicked: ${event.title} on ${moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}`);
    setSelectedEvent(event);
  };

  const handleSlotClick = (slotInfo: SlotInfo) => {
    setCalendarDate(moment(slotInfo.start).format('MMMM Do YYYY'));
    setIsActive(true);
  };
  const handleJobRequestSubmit = () => {
    // Fetch the latest data after a new job request is submitted
    setCalendarDate(new Date().toISOString());
  };
  const handleEditEvent = ( ) => {

  }
  const handleDeleteEvent = ( ) => {}

  return (
    <>
      <div className="p-6 helvetic mt-16">
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
          onSelectSlot={handleSlotClick}
          style={{ height: "90vh", cursor: "pointer",fontSize: "12px" }}
        />
      </div>
      {selectedEvent && (
      <EventPopup
      event={selectedEvent}
      onClose={() => setSelectedEvent(null)}
      onEdit={handleEditEvent} // Add this line
      onDelete={handleDeleteEvent} 
      />
    )}
      {isActive && (
        <JobRequestForm 
        calendarDate={calendarDate ?? ""} 
        setIsActive={setIsActive} 
        onSubmitSuccess={handleJobRequestSubmit } />
      )}
    </>
  );
};

export default ClientCalendar;
