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
    <div id="draggable-el">
      <h1 className="mb-6 border-b border-gray-200 pb-3 text-xl text-center font-semibold text-gray-800">
        Drag Event
      </h1>
      {events.map((event) => (
        <div
          className="fc-event mb-2 cursor-move rounded-sm bg-blue-500 p-2 text-white hover:-translate-y-0.5 hover:shadow-md"
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
