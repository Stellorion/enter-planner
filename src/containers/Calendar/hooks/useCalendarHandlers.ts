// import { useCalendarStore } from '../store/useCalendarStore';
// import { localToUTC, toDateString, formatDate } from '@/utils/dateUtils';
// import { EventClickArg, EventChangeArg } from '@fullcalendar/core';
// import { Event } from '@/src/types/event';
// import { useCallback } from 'react';

// export function useCalendarHandlers() {
//   const {
//     allEvents,
//     showModal,
//     showUpdateModal,
//     selectedEvent,
//     newEvent,
//     setNewEvent,
//     addEvent,
//     deleteEvent,
//     setShowModal,
//     setShowUpdateModal,
//     setSelectedEvent,
//     resetNewEvent,
//     updateEvent,
//     fetchEvents,
//     currentDate,
//     setCurrentDate,
//     viewType,
//     setViewType,
//     visibleRange,
//     setVisibleRange,
//   } = useCalendarStore();



//   function handleDateClick(arg: { date: Date; allDay: boolean }) {
//     const clickedDate = new Date(arg.date);

//     clickedDate.setHours(0, 0, 0, 0);

//     const endDate = new Date(clickedDate);
//     endDate.setDate(clickedDate.getDate() + 1);
//     endDate.setHours(0, 0, 0, 0);

//     const startDateFormatted = formatDate(clickedDate);
//     const endDateFormatted = formatDate(endDate);

//     setNewEvent({
//       ...newEvent,
//       start: startDateFormatted,
//       end: endDateFormatted,
//       allDay: arg.allDay,
//       id: new Date().getTime().toString(),
//     });

//     setShowModal(true);
//   }



//   function handleUpdateChange(
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) {
//     if (!selectedEvent) return;
//     const { name, value, type } = event.target;
//     const isCheckbox = type === 'checkbox';
//     const newValue = isCheckbox
//       ? (event.target as HTMLInputElement).checked
//       : value;
//     setSelectedEvent({ ...selectedEvent, [name]: newValue });
//   }



//   function handleChange(
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) {
//     const { name, value, type } = event.target;
//     const isCheckbox = type === 'checkbox';
//     const newValue = isCheckbox
//       ? (event.target as HTMLInputElement).checked
//       : value;

//     if (name === 'allDay') {
//       const newStart = newEvent.start;
//       const newEnd = newEvent.end;

//       setNewEvent({
//         ...newEvent,
//         allDay: newValue as boolean,
//         start: newValue
//           ? newStart.split('T')[0]
//           : `${newStart.split('T')[0]}T${new Date().getHours().toString().padStart(2, '0')}:00`,
//         end: newEnd
//           ? newValue
//             ? newEnd.split('T')[0]
//             : `${newEnd.split('T')[0]}T${(new Date().getHours() + 1).toString().padStart(2, '0')}:00`
//           : undefined,
//       });
//     } else {
//       setNewEvent({ ...newEvent, [name]: newValue });
//     }
//   }

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     let eventToAdd = { ...newEvent };

//     if (!eventToAdd.allDay) {
//       // Convert local input to UTC ISO string before saving
//       eventToAdd.start = localToUTC(eventToAdd.start);
//       if (eventToAdd.end) eventToAdd.end = localToUTC(eventToAdd.end);
//     } else {
//       eventToAdd.start = toDateString(eventToAdd.start);
//       if (eventToAdd.end) eventToAdd.end = toDateString(eventToAdd.end);
//     }

//     addEvent(eventToAdd);
//     setShowModal(false);
//     resetNewEvent();
//   }

//   function handleDatesSet(arg: { start: Date; end: Date; view: any }) {
//     setCurrentDate(new Date(arg.view.currentStart));
//     setViewType(arg.view.type);
//     setVisibleRange({ start: arg.start, end: arg.end });
//   }

//   function handleEventClick(event: Event) {
//     setSelectedEvent(event);
//     setShowUpdateModal(true);
//   }

//   return {

//   };
// }
