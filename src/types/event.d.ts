export interface BaseEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  notes?: string;
}

export interface Event extends BaseEvent {}

export interface EventChangeInfo {
  event: {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay: boolean;
    extendedProps?: {
      notes?: string;
    };
  };
}

export interface NewEvent extends BaseEvent {}