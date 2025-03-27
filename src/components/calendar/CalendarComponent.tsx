'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';

interface Event {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay: boolean;
}

interface CalendarProps {
  allEvents: Event[];
  handleDateClick: (arg: { date: Date; allDay: boolean }) => void;
  addEvent: (data: DropArg) => void;
  handleDeleteModal: (data: { event: { id: string } }) => void;
  handleEventChange: (changeInfo: any) => void;
}

const CalendarComponent = ({
  allEvents,
  handleDateClick,
  addEvent,
  handleDeleteModal,
  handleEventChange,
}: CalendarProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={allEvents as EventSourceInput}
      nowIndicator={true}
      editable={true}
      droppable={true}
      selectable={true}
      selectMirror={true}
      dateClick={handleDateClick}
      drop={(data) => addEvent(data)}
      eventClick={(data) => handleDeleteModal(data)}
      eventChange={(changeInfo) => handleEventChange(changeInfo)} // Handle resizing and dragging
    />
  );
};

export default CalendarComponent;