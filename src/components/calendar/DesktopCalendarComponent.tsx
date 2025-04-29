'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import allLocales from '@fullcalendar/core/locales/en-gb';
import { CalendarComponentProps } from '@/src/types/event';
import EventTooltip from './EventTooltip';

const CalendarComponent = ({
  allEvents,
  handleDateClick,
  handleUpdateModal,
  handleEventChange,
  handleDatesSet,
}: CalendarComponentProps) => {
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
      height={'100%'}
      stickyFooterScrollbar={true}
      locale={allLocales}
      timeZone="Asia/Jerusalem"
      firstDay={0}
      events={allEvents as EventSourceInput}
      nowIndicator={true}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEventRows={5}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      eventClick={handleUpdateModal}
      eventChange={handleEventChange}
      eventContent={(info) => {
        return (
          <EventTooltip
            title={info.event.title}
            notes={info.event.extendedProps?.notes}
            start={info.event.startStr}
            end={info.event.endStr}
            allDay={info.event.allDay}
          >
            <div 
              className="w-full cursor-pointer pointer-events-auto" 
              style={{ 
                backgroundColor: info.event.backgroundColor || info.event.extendedProps?.color,
                color: '#ffffff'
              }}
            >
              {info.event.title}
            </div>
          </EventTooltip>
        );
      }}
    />
  );
};

export default CalendarComponent;