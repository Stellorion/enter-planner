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
      initialView="dayGridMonth"
      height="100%"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={false} // Changed to false to show all events
      weekends={true}
      events={allEvents as EventSourceInput}
      eventDurationEditable={true}
      eventResizableFromStart={true}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
      eventClick={handleUpdateModal}
      eventChange={handleEventChange}
      eventContent={(eventInfo) => (
        <EventTooltip
          title={eventInfo.event.title}
          notes={eventInfo.event.extendedProps?.notes}
          start={eventInfo.event.startStr}
          end={eventInfo.event.endStr}
          allDay={eventInfo.event.allDay}
        >
          <div 
            className="w-full h-full rounded px-1 cursor-pointer" 
            style={{ 
              backgroundColor: eventInfo.event.backgroundColor || eventInfo.event.extendedProps?.color,
              color: '#ffffff',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.85rem',
              lineHeight: '1.7'
            }}
          >
            {eventInfo.event.title}
          </div>
        </EventTooltip>
      )}
      slotEventOverlap={false}
      stickyHeaderDates={true}
      locale={allLocales}
      timeZone="Asia/Jerusalem"
      firstDay={0}
      nowIndicator={true}
      // Google Calendar-like styles
      buttonText={{
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
      }}
      dayHeaders={true}
      views={{
        dayGridMonth: {
          dayHeaderFormat: { weekday: 'short' },
          dayMaxEventRows: true,
        }
      }}
    />
  );
};

export default CalendarComponent;