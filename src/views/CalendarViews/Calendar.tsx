'use client';

import { useReducer } from 'react';
import { EventChangeInfo } from '@/src/types/event';
import { calendarReducer, initialState } from '@/src/reducers/calendarReducer';
import CalendarComponent from '@/src/components/calendar/CalendarComponent';
import DeleteModal from '@/src/components/calendar/DeleteModal';
import AddEventModal from '@/src/components/calendar/AddEventModal';

export default function Calendar() {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    dispatch({
      type: 'SET_NEW_EVENT',
      payload: {
        ...state.newEvent,
        start: arg.allDay 
          ? arg.date.toISOString().split('T')[0] 
          : arg.date.toISOString().slice(0, 16),
        allDay: arg.allDay,
        id: new Date().getTime().toString(),
      },
    });
    dispatch({ type: 'SET_SHOW_MODAL', payload: true });
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
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: typeof changeInfo.event.start === 'string' 
        ? changeInfo.event.start 
        : new Date(changeInfo.event.start).toISOString(),
      end: changeInfo.event.end,
      allDay: changeInfo.event.allDay,
      notes: changeInfo.event.extendedProps?.notes || ''
    };
  
    dispatch({
      type: 'SET_ALL_EVENTS',
      payload: state.allEvents.map((event) =>
        event.id === changeInfo.event.id ? updatedEvent : event
      ),
    });
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;
    const isCheckbox = type === 'checkbox';
    const newValue = isCheckbox ? (event.target as HTMLInputElement).checked : value;
  
    if (name === 'allDay') {
      const newStart = state.newEvent.start;
      const newEnd = state.newEvent.end;
  
      dispatch({
        type: 'SET_NEW_EVENT',
        payload: {
          ...state.newEvent,
          allDay: newValue as boolean,
          start: newValue 
            ? newStart.split('T')[0] 
            : `${newStart.split('T')[0]}T${new Date().getHours().toString().padStart(2, '0')}:00`,
          end: newEnd 
            ? newValue
              ? newEnd.split('T')[0]
              : `${newEnd.split('T')[0]}T${(new Date().getHours() + 1).toString().padStart(2, '0')}:00`
            : undefined
        }
      });
    } else {
      dispatch({
        type: 'SET_NEW_EVENT',
        payload: { ...state.newEvent, [name]: newValue }
      });
    }
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
        <div className="rounded-sm bg-white p-6 text-gray-800 shadow-lg">
          <CalendarComponent
            allEvents={state.allEvents}
            handleDateClick={handleDateClick}
            handleDeleteModal={handleDeleteModal}
            handleEventChange={handleEventChange}
          />
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
