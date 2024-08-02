import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import JobRequestForm from "./JobRequestForm";
import AdminFormContext from "../../../context/modules/AdminFormContext";
import { AdminFormListData } from "../../../types/AdminGategoryType";
import axios from "axios";

// Create a localizer
const localizer = momentLocalizer(moment);

// Sample events
const events = [
  {
    title: "Sample Event",
    start: new Date(),
    end: new Date(moment().add(1, "hours").toDate()),
  },
];

const ClientCalendar: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<string | null>(null);


  // Handle event click
  const handleEventClick = (event: { title: string; start: Date; end: Date }) => {
    alert(`Event clicked: ${event.title} on ${moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}`);
  };

  // Handle slot (date/time) click
  const handleSlotClick = ({ start }: { start: Date }) => {
    setIsActive(true);
    setCalendarDate(moment(start).format('MMMM Do YYYY'))
    // alert(`Slot clicked: ${moment(start).format('MMMM Do YYYY, h:mm:ss a')}`);
  };

  const { setGetSubCategoriesItemsDatas } = useContext(
    AdminFormContext
  ) as AdminFormListData;

  useEffect(() => {
    const GetMainCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/get-sub-category-items"
        );
        const categories = response.data.subCategoryItems;
        setGetSubCategoriesItemsDatas(categories);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching categories:",
            error.response?.data?.message
          );
          throw error.response?.data?.message || "Error fetching categories";
        } else {
          console.error("An unexpected error occurred:", error);
          throw "An unexpected error occurred";
        }
      }
    };
    GetMainCategory();
  }, [setGetSubCategoriesItemsDatas]);

  return (
    <>
      <div className="p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSlotClick}
          selectable
          style={{ height: 500, cursor: "pointer" }}
        />
      </div>
      {isActive && <JobRequestForm calendarDate={calendarDate} setIsActive={setIsActive} />}
    </>
  );
};

export default ClientCalendar;
