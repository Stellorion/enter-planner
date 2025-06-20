'use client';

import { useEffect } from 'react';
import { EventClickArg, EventChangeArg } from '@fullcalendar/core';
import { Event } from '@/src/types/event';
import { useCalendarStore } from '@/src/containers/Calendar/store/useCalendarStore';
import CalendarComponent from '@/src/containers/Calendar/components/CalendarComponent';
import AddEventModal from '@/src/containers/Calendar/components/modal/AddEventModal';
import UpdateModal from '@/src/containers/Calendar/components/modal/UpdateModal';
import EventsSidebar from '@/src/containers/Calendar/components/EventsSidebar';
import { formatAsDayString, formatEventDates } from './Calendar.utils';
import { localToUTC, toDateString } from '@/utils/dateUtils';

export default function Calendar() {
  const {
    allEvents,
    showModal,
    showUpdateModal,
    selectedEvent,
    newEvent,
    setNewEvent,
    addEvent,
    deleteEvent,
    setShowModal,
    setShowUpdateModal,
    setSelectedEvent,
    resetNewEvent,
    updateEvent,
    fetchEvents,
    currentDate,
    setCurrentDate,
    viewType,
    setViewType,
    visibleRange,
    setVisibleRange,
  } = useCalendarStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    const clickedDate = new Date(arg.date);
    clickedDate.setHours(0, 0, 0, 0);

    const endDate = new Date(clickedDate);
    endDate.setDate(clickedDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    const startDateFormatted = formatAsDayString(clickedDate);
    const endDateFormatted = formatAsDayString(endDate);

    setNewEvent({
      ...newEvent,
      start: startDateFormatted,
      end: endDateFormatted,
      allDay: arg.allDay,
      id: new Date().getTime().toString(),
    });

    setShowModal(true);
  }

  function handleUpdateModal(clickInfo: EventClickArg) {
    const event: Event = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || undefined,
      allDay: clickInfo.event.allDay,
      notes: clickInfo.event.extendedProps?.notes || '',
      color:
        clickInfo.event.backgroundColor ||
        clickInfo.event.extendedProps?.color ||
        '#3788d8',
    };
    setSelectedEvent(event);
    setShowUpdateModal(true);
  }

  function handleUpdate(updatedEvent: Event) {
    const eventToUpdate = { ...updatedEvent };

    if (!eventToUpdate.allDay) {
      eventToUpdate.start = localToUTC(eventToUpdate.start);
      if (eventToUpdate.end) eventToUpdate.end = localToUTC(eventToUpdate.end);
    } else {
      eventToUpdate.start = toDateString(eventToUpdate.start);
      if (eventToUpdate.end) eventToUpdate.end = toDateString(eventToUpdate.end);
    }

    updateEvent(eventToUpdate);
    setShowUpdateModal(false);
    setSelectedEvent(null);
  }

  function handleUpdateChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    if (!selectedEvent) return;
    const { name, value, type } = event.target;
    const isCheckbox = type === 'checkbox';
    const newValue = isCheckbox
      ? (event.target as HTMLInputElement).checked
      : value;
    setSelectedEvent({ ...selectedEvent, [name]: newValue });
  }

  function handleDelete() {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setShowUpdateModal(false);
      setSelectedEvent(null);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowUpdateModal(false);
    setSelectedEvent(null);
    resetNewEvent();
  }

  function handleEventChange(changeInfo: EventChangeArg) {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.startStr,
      end: changeInfo.event.endStr || null,
      allDay: changeInfo.event.allDay,
      notes: changeInfo.event.extendedProps?.notes || '',
      color:
        changeInfo.event.backgroundColor ||
        changeInfo.event.extendedProps?.color,
    };

    updateEvent(updatedEvent);
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = event.target;
    const isCheckbox = type === 'checkbox';
    const newValue = isCheckbox
      ? (event.target as HTMLInputElement).checked
      : value;

    if (name === 'allDay') {
      const newStart = newEvent.start;
      const newEnd = newEvent.end;

      setNewEvent({
        ...newEvent,
        allDay: newValue as boolean,
        start: newValue
          ? newStart.split('T')[0]
          : `${newStart.split('T')[0]}T${new Date().getHours().toString().padStart(2, '0')}:00`,
        end: newEnd
          ? newValue
            ? newEnd.split('T')[0]
            : `${newEnd.split('T')[0]}T${(new Date().getHours() + 1).toString().padStart(2, '0')}:00`
          : undefined,
      });
    } else {
      setNewEvent({ ...newEvent, [name]: newValue });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let eventToAdd = { ...newEvent };

    if (!eventToAdd.allDay) {
      // Convert local input to UTC ISO string before saving
      eventToAdd.start = localToUTC(eventToAdd.start);
      if (eventToAdd.end) eventToAdd.end = localToUTC(eventToAdd.end);
    } else {
      eventToAdd.start = toDateString(eventToAdd.start);
      if (eventToAdd.end) eventToAdd.end = toDateString(eventToAdd.end);
    }

    addEvent(eventToAdd);
    setShowModal(false);
    resetNewEvent();
  }

  function handleDatesSet(arg: { start: Date; end: Date; view: any }) {
    setCurrentDate(new Date(arg.view.currentStart));
    setViewType(arg.view.type);
    setVisibleRange({ start: arg.start, end: arg.end });
  }

  function handleEventClick(event: Event) {
    setSelectedEvent(event);
    setShowUpdateModal(true);
  }

  return (
    <div className="flex h-screen flex-col pt-16">
      <main className="flex-1 md:overflow-hidden">
        <div className="flex h-full flex-col gap-0 lg:flex-row">
          <div className="flex-1 bg-white text-gray-800 shadow-lg lg:rounded-l-sm lg:p-6 dark:bg-gray-900 dark:text-gray-100">
            <CalendarComponent
              allEvents={allEvents}
              handleDateClick={handleDateClick}
              handleUpdateModal={handleUpdateModal}
              handleEventChange={handleEventChange}
              handleDatesSet={handleDatesSet}
            />
          </div>
          <EventsSidebar
            events={allEvents}
            currentDate={currentDate}
            viewType={viewType}
            visibleRange={visibleRange}
            onEventClick={handleEventClick}
          />
        </div>
        <UpdateModal
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleCloseModal={handleCloseModal}
          data={selectedEvent}
          handleChange={handleUpdateChange}
        />
        <AddEventModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          data={newEvent}
          handleCloseModal={handleCloseModal}
        />
      </main>
    </div>
  );
}
