'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import allLocales from '@fullcalendar/core/locales/en-gb';

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
        right: 'dayGridMonth,timeGridWeek,timeGridDay addEventButton'
      }}
      customButtons={{
        addEventButton: {
          text: 'Add Event',
          click: () => {
            handleDateClick({ 
              date: new Date(), 
              allDay: false 
            });
          }
        }
      }}
      buttonText={{
        today: 'Today'
      }}
      locale={allLocales}
      timeZone="Asia/Jerusalem"
      firstDay={0}
      events={allEvents as EventSourceInput}
      nowIndicator={true}
      editable={true}
      droppable={true}
      selectable={true}
      selectMirror={true}
      dateClick={handleDateClick}
      drop={(data) => addEvent(data)}
      eventClick={(data) => handleDeleteModal(data)}
      eventChange={(changeInfo) => handleEventChange(changeInfo)}
    />
  );
};

export default CalendarComponent;