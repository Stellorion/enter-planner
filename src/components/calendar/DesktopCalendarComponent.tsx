'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import { CalendarComponentProps } from '@/src/types/event';
import EventTooltip from './EventTooltip';
import { useRef, useCallback } from 'react';

const DesktopCalendarComponent = ({
  allEvents,
  handleDateClick,
  handleUpdateModal,
  handleEventChange,
  handleDatesSet,
}: CalendarComponentProps) => {
  const calendarRef = useRef<FullCalendar>(null);

  const handleEventChangeCallback = useCallback(
    (info: any) => {
      Promise.resolve().then(() => {
        handleEventChange(info);
      });
    },
    [handleEventChange]
  );

  const handleEventClickCallback = useCallback(
    (info: any) => {
      Promise.resolve().then(() => {
        handleUpdateModal(info);
      });
    },
    [handleUpdateModal]
  );

  const handleDateClickCallback = useCallback(
    (info: any) => {
      Promise.resolve().then(() => {
        handleDateClick(info);
      });
    },
    [handleDateClick]
  );

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay addEventButton',
      }}
      customButtons={{
        addEventButton: {
          text: 'Add Event',
          click: () => {
            handleDateClickCallback({
              date: new Date(),
              allDay: false,
            });
          },
        },
      }}
      initialView="dayGridMonth"
      height="100%"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={false}
      weekends={true}
      events={allEvents as EventSourceInput}
      eventDurationEditable={true}
      eventResizableFromStart={true}
      datesSet={handleDatesSet}
      dateClick={handleDateClickCallback}
      eventClick={handleEventClickCallback}
      eventChange={handleEventChangeCallback}
      eventContent={(eventInfo) => (
        <EventTooltip
          title={eventInfo.event.title}
          notes={eventInfo.event.extendedProps?.notes}
          start={eventInfo.event.startStr}
          end={eventInfo.event.endStr}
          allDay={eventInfo.event.allDay}
        >
          <div
            className="h-full w-full cursor-pointer rounded px-1"
            style={{
              backgroundColor:
                eventInfo.event.backgroundColor ||
                eventInfo.event.extendedProps?.color,
              color: '#ffffff',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.85rem',
              lineHeight: '1.7',
              pointerEvents: 'none',
            }}
          >
            {eventInfo.event.title}
          </div>
        </EventTooltip>
      )}
      slotEventOverlap={false}
      stickyHeaderDates={true}
      locale="en"
      timeZone="Asia/Jerusalem"
      firstDay={0}
      nowIndicator={true}
      buttonText={{
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
      }}
      dayHeaders={true}
      views={{
        dayGridMonth: {
          dayHeaderFormat: { weekday: 'short' },
          dayMaxEventRows: true,
        },
      }}
    />
  );
};

export default DesktopCalendarComponent;
