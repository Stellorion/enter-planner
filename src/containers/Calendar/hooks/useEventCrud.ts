// import { useCalendarStore } from '../store/useCalendarStore';
// import { localToUTC, toDateString } from '@/utils/dateUtils';
// import { EventClickArg, EventChangeArg } from '@fullcalendar/core';
// import { Event } from '@/src/types/event';

// export function useEventCrud() {
//   const {
//     updateEvent,
//     deleteEvent,
//     setShowUpdateModal,
//     setSelectedEvent,
//     selectedEvent,
//   } = useCalendarStore();

//   function handleUpdate(updatedEvent: Event) {
//     const eventToUpdate = { ...updatedEvent };

//     if (!eventToUpdate.allDay) {
//       eventToUpdate.start = localToUTC(eventToUpdate.start);
//       if (eventToUpdate.end) eventToUpdate.end = localToUTC(eventToUpdate.end);
//     } else {
//       eventToUpdate.start = toDateString(eventToUpdate.start);
//       if (eventToUpdate.end)
//         eventToUpdate.end = toDateString(eventToUpdate.end);
//     }

//     updateEvent(eventToUpdate);
//     setShowUpdateModal(false);
//     setSelectedEvent(null);
//   }

//     function handleEventChange(changeInfo: EventChangeArg) {
//     const updatedEvent = {
//       id: changeInfo.event.id,
//       title: changeInfo.event.title,
//       start: changeInfo.event.startStr,
//       end: changeInfo.event.endStr || null,
//       allDay: changeInfo.event.allDay,
//       notes: changeInfo.event.extendedProps?.notes || '',
//       color:
//         changeInfo.event.backgroundColor ||
//         changeInfo.event.extendedProps?.color,
//     };

//     updateEvent(updatedEvent);
//   }

//   function handleDelete() {
//     if (selectedEvent) {
//       deleteEvent(selectedEvent.id);
//       setShowUpdateModal(false);
//       setSelectedEvent(null);
//     }
//   }

//   return { handleUpdate, handleDelete };
// }
