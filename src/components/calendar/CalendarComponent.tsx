'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import allLocales from '@fullcalendar/core/locales/en-gb';
import { Event } from '@/src/types/event'

interface CalendarProps {
  allEvents: Event[];
  handleDateClick: (arg: { date: Date; allDay: boolean }) => void;
  handleDeleteModal: (data: { event: { id: string } }) => void;
  handleEventChange: (changeInfo: any) => void;
}

const CalendarComponent = ({
  allEvents,
  handleDateClick,
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
      selectable={true}
      selectMirror={true}
      dayMaxEventRows={5}
      dateClick={handleDateClick}
      eventClick={(data) => handleDeleteModal(data)}
      eventChange={(changeInfo) => handleEventChange(changeInfo)}
      eventDidMount={(info) => {
        const title = info.event.title;
        const notes = info.event.extendedProps.notes;
        const tooltip = notes ? `${title}\n${notes}` : title;
        info.el.setAttribute('title', tooltip);
      }}
    />
  );
};

export default CalendarComponent;