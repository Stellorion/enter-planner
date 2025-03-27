'use client';

import { useEffect } from 'react';
import { Draggable } from '@fullcalendar/interaction';

interface DraggableEventsProps {
  events: { title: string; id: string }[];
}

const DraggableEvents = ({ events }: DraggableEventsProps) => {
  useEffect(() => {
    const draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData(eventEl) {
          return {
            title: eventEl.getAttribute('title'),
          };
        },
      });
    }
  }, []);

  return (
    <div
      id="draggable-el"
      className="mt-16 ml-8 w-full rounded-md border-2 p-2 lg:h-1/2"
    >
      <h1 className="text-center text-lg font-bold">Drag Event</h1>
      {events.map((event) => (
        <div
          className="fc-event m-2 ml-auto w-full rounded-md border-2 p-1 text-center"
          title={event.title}
          key={event.id}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
};

export default DraggableEvents;