'use client';

import { useEffect, useState } from 'react';
import { Draggable, DropArg } from '@fullcalendar/interaction';
import CalendarComponent from '@/src/components/calendar/CalendarComponent';
import DeleteModal from '@/src/components/calendar/DeleteModal';
import DraggableEvents from '@/src/components/calendar/DraggableEvents';
import AddEventModal from '@/src/components/calendar/AddEventModal';

interface Event {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay: boolean;
}

export default function Home() {
  const [events, setEvents] = useState([
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    { title: 'event 3', id: '3' },
    { title: 'event 4', id: '4' },
    { title: 'event 5', id: '5' },
  ]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    title: '',
    start: '',
    allDay: false,
  });

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title');
          let id = eventEl.getAttribute('data');
          let start = eventEl.getAttribute('start');
          return { title, id, start };
        },
      });
    }
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime().toString(),
    });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event: Event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime().toString(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(data.event.id);
  }

  function handleDelete() {
    setAllEvents(allEvents.filter((event) => event.id !== idToDelete));
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: '',
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleEventChange(changeInfo: any) {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.start || '',
      end: changeInfo.event.end || '',
      allDay: changeInfo.event.allDay,
    };

    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      )
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: '',
    });
  }

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <CalendarComponent
              allEvents={allEvents}
              handleDateClick={handleDateClick}
              addEvent={addEvent}
              handleDeleteModal={handleDeleteModal}
              handleEventChange={handleEventChange}
            />
          </div>
          <DraggableEvents events={events} />
        </div>

        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
          handleCloseModal={handleCloseModal}
        />
        <AddEventModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newEvent={newEvent}
          handleCloseModal={handleCloseModal}
        />
      </main>
    </div>
  );
}