'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import allLocales from '@fullcalendar/core/locales/en-gb';
import { CalendarComponentProps } from '@/src/types/event';
import EventTooltip from './EventTooltip';
import { useCalendarUiStore } from '@/src/store/useCalendarStore';
import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaRegCalendarPlus } from "react-icons/fa";

const MobileCalendarComponent = ({
  allEvents,
  handleDateClick,
  handleUpdateModal,
  handleEventChange,
  handleDatesSet,
}: CalendarComponentProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const title = useCalendarUiStore((state) => state.title);
  const setTitle = useCalendarUiStore((state) => state.setTitle);

  const handleDatesSetInternal = (arg: any) => {
    setTitle(arg.view.title);
    handleDatesSet(arg);
  };

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
  };
  const handleNext = () => {
    calendarRef.current?.getApi().next();
  };

  const handleAddEvent = () => {
    handleDateClick({
      date: new Date(),
      allDay: false
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center gap-1">
          <button onClick={handlePrev} aria-label="Previous">
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <span className="font-semibold text-lg px-2">{title}</span>
          <button onClick={handleNext} aria-label="Next">
            <FaArrowRight className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={handleAddEvent}
          className="rounded-full transition"
          aria-label="Add Event"
        >
          <FaRegCalendarPlus className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={false}
          customButtons={{
            addEventButton: {
              text: 'Add Event',
              click: handleAddEvent
            }
          }}
          buttonText={{
            today: 'Today'
          }}
          height="100%"
          contentHeight="auto"
          aspectRatio={1.5}
          locale={allLocales}
          timeZone="Asia/Jerusalem"
          firstDay={0}
          datesSet={handleDatesSetInternal}
          events={allEvents as EventSourceInput}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEventRows={5}
          dateClick={handleDateClick}
          eventClick={handleUpdateModal}
          eventChange={handleEventChange}
          eventContent={(info) => (
            <EventTooltip
              title={info.event.title}
              notes={info.event.extendedProps?.notes}
              start={info.event.startStr}
              end={info.event.endStr}
              allDay={info.event.allDay}
            >
              <div
                className="w-full"
                style={{
                  backgroundColor: info.event.backgroundColor || info.event.extendedProps?.color,
                  color: '#ffffff'
                }}
              >
                {info.event.title}
              </div>
            </EventTooltip>
          )}
        />
      </div>
    </div>
  );
};

export default MobileCalendarComponent;