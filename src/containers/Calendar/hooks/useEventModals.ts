// import { useCalendarStore } from '../store/useCalendarStore';
// import { Event } from '@/src/types/event';

// export function useEventModals() {
//   const { setShowModal, setShowUpdateModal, setSelectedEvent, resetNewEvent } =
//     useCalendarStore();

//   function handleUpdateModal(clickInfo: EventClickArg) {
//     const event: Event = {
//       id: clickInfo.event.id,
//       title: clickInfo.event.title,
//       start: clickInfo.event.startStr,
//       end: clickInfo.event.endStr || undefined,
//       allDay: clickInfo.event.allDay,
//       notes: clickInfo.event.extendedProps?.notes || '',
//       color:
//         clickInfo.event.backgroundColor ||
//         clickInfo.event.extendedProps?.color ||
//         '#3788d8',
//     };
//     setSelectedEvent(event);
//     setShowUpdateModal(true);
//   }

//   function handleCloseModal() {
//     setShowModal(false);
//     setShowUpdateModal(false);
//     setSelectedEvent(null);
//     resetNewEvent();
//   }

//   // ...other modal logic...

//   return { handleCloseModal };
// }
