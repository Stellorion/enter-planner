export interface BaseEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  notes?: string;
}

export interface Event extends BaseEvent {}

export interface NewEvent extends BaseEvent {}

export interface EventTooltipProps extends Pick<BaseEvent, 'title' | 'start' | 'end' | 'allDay' | 'notes'> {
  children: ReactElement;
}

export interface AddEventModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  newEvent: Event;
  handleCloseModal: () => void;
}

export interface CalendarComponentProps {
  allEvents: Event[];
  handleDateClick: (arg: { date: Date; allDay: boolean }) => void;
  handleUpdateModal: (clickInfo: EventClickArg) => void;
  handleEventChange: (changeInfo: EventChangeArg) => void;
}