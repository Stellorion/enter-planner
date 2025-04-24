export interface BaseEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  notes?: string;
  color?: string;
}

export interface Event extends BaseEvent {}

export interface NewEvent extends BaseEvent {}

export interface EventTooltipProps extends Pick<BaseEvent, 'title' | 'start' | 'end' | 'allDay' | 'notes'> {
  children: ReactElement;
}

interface EventFormProps {
  event: Event;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface CalendarComponentProps {
  allEvents: Event[];
  handleDateClick: (arg: { date: Date; allDay: boolean }) => void;
  handleUpdateModal: (clickInfo: EventClickArg) => void;
  handleEventChange: (changeInfo: EventChangeArg) => void;
}

