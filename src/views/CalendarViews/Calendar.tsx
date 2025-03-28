'use client';

import { useEffect, useReducer } from 'react';
import { Draggable, DropArg } from '@fullcalendar/interaction';
import { EventChangeInfo } from '@/src/types/event';
import { calendarReducer, initialState } from '@/src/reducers/calendarReducer';
import { createEvent, isDuplicateEvent } from '@/utils/eventUtils';
import CalendarComponent from '@/src/components/calendar/CalendarComponent';
import DeleteModal from '@/src/components/calendar/DeleteModal';
import DraggableEvents from '@/src/components/calendar/DraggableEvents';
import AddEventModal from '@/src/components/calendar/AddEventModal';

export default function Calendar() {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  useEffect(() => {
    const draggableEl = document.getElementById('draggable-el');
    if (!draggableEl) return;

    const draggable = new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: (eventEl) => ({
        title: eventEl.getAttribute('title') || '',
        id: eventEl.getAttribute('data') || '',
        start: eventEl.getAttribute('start') || '',
      }),
    });

    return () => {
      draggable.destroy();
    };
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    dispatch({
      type: 'SET_NEW_EVENT',
      payload: {
        ...state.newEvent,
        start: arg.date,
        allDay: arg.allDay,
        id: new Date().getTime().toString(),
      },
    });
    dispatch({ type: 'SET_SHOW_MODAL', payload: true });
  }

  function addEvent(data: DropArg) {
    if (
      !isDuplicateEvent(state.allEvents, {
        title: data.draggedEl.innerText,
        start: data.date.toISOString(),
      })
    ) {
      const event = createEvent(
        data.draggedEl.innerText,
        data.date,
        data.allDay,
        '',
        'none'
      );
      dispatch({ type: 'ADD_EVENT', payload: event });
    }
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    dispatch({ type: 'SET_SHOW_DELETE_MODAL', payload: true });
    dispatch({ type: 'SET_ID_TO_DELETE', payload: data.event.id });
  }

  function handleDelete() {
    if (state.idToDelete) {
      dispatch({ type: 'DELETE_EVENT', payload: state.idToDelete });
    }
    dispatch({ type: 'SET_SHOW_DELETE_MODAL', payload: false });
    dispatch({ type: 'SET_ID_TO_DELETE', payload: null });
  }

  function handleCloseModal() {
    dispatch({ type: 'SET_SHOW_MODAL', payload: false });
    dispatch({ type: 'RESET_NEW_EVENT' });
    dispatch({ type: 'SET_SHOW_DELETE_MODAL', payload: false });
    dispatch({ type: 'SET_ID_TO_DELETE', payload: null });
  }

  function handleEventChange(changeInfo: EventChangeInfo) {
    const updatedEvent = createEvent(
      changeInfo.event.title,
      changeInfo.event.start || new Date(),
      changeInfo.event.allDay,
      changeInfo.event.notes,
      changeInfo.event.recurrence
    );

    if (changeInfo.event.end) {
      updatedEvent.end = changeInfo.event.end.toISOString();
    }

    dispatch({
      type: 'SET_ALL_EVENTS',
      payload: state.allEvents.map((event) =>
        event.id === changeInfo.event.id ? updatedEvent : event
      ),
    });
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_NEW_EVENT',
      payload: { ...state.newEvent, [name]: value },
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: 'ADD_EVENT', payload: state.newEvent });
    dispatch({ type: 'SET_SHOW_MODAL', payload: false });
    dispatch({ type: 'RESET_NEW_EVENT' });
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-25">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-9 rounded-sm bg-white p-6 text-gray-800 shadow-lg">
            <CalendarComponent
              allEvents={state.allEvents}
              handleDateClick={handleDateClick}
              addEvent={addEvent}
              handleDeleteModal={handleDeleteModal}
              handleEventChange={handleEventChange}
            />
          </div>

          <div className="col-span-3 rounded-sm bg-white p-6 shadow-lg">
            <DraggableEvents events={state.events} />
          </div>
        </div>

        <DeleteModal
          showDeleteModal={state.showDeleteModal}
          setShowDeleteModal={(value) =>
            dispatch({ type: 'SET_SHOW_DELETE_MODAL', payload: value })
          }
          handleDelete={handleDelete}
          handleCloseModal={handleCloseModal}
        />
        <AddEventModal
          showModal={state.showModal}
          setShowModal={(value) =>
            dispatch({ type: 'SET_SHOW_MODAL', payload: value })
          }
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newEvent={state.newEvent}
          handleCloseModal={handleCloseModal}
        />
      </main>
    </div>
  );
}
