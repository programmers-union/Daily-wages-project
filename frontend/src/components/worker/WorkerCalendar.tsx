import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Sample Event',
    start: new Date(),
    end: new Date(moment().add(1, 'hours').toDate()),
  },
];

const WorkerCalendar: React.FC = () => {
  return (
    <div className='p-6'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default WorkerCalendar;
