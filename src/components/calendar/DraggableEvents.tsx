export default function DraggableEvents() {
    const events = [
      { title: 'Event 1', id: '1' },
      { title: 'Event 2', id: '2' },
      { title: 'Event 3', id: '3' },
      { title: 'Event 4', id: '4' },
    ];
  
    return (
      <div id="draggable-el" className="mt-16 ml-8 w-full rounded-md border-2 bg-violet-50 p-2 lg:h-1/2">
        <h1 className="text-center text-lg font-bold">Drag Event</h1>
        {events.map((event) => (
          <div key={event.id} className="fc-event m-2 w-full rounded-md border-2 bg-white p-1 text-center" title={event.title}>
            {event.title}
          </div>
        ))}
      </div>
    );
  }
  