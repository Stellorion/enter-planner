import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Event {
  id: number;
  title: string;
  start: string;
  allDay: boolean;
}

interface EventModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setAllEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  newEvent: Event;
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>;
}

export default function EventModal({ show, setShow, setAllEvents, newEvent, setNewEvent }: EventModalProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents((prevEvents: Event[]) => [...prevEvents, newEvent]);
    setShow(false);
    setNewEvent({ title: '', start: '', allDay: false, id: 0 });
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShow(false)}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold">Add Event</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Event Title"
                  className="border p-2 w-full"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <button type="submit" className="mt-3 w-full bg-violet-600 text-white py-2 rounded-md">
                  Create
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}