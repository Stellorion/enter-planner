export interface BaseEvent {
  id: string;
  title: string;
  allDay: boolean;
  notes?: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface Event extends BaseEvent {
  start: Date | string;
  end?: Date | string;
}

export interface EventChangeInfo {
  event: BaseEvent & {
    start: Date | null;
    end: Date | null;
  };
}

export interface EventFormData {
  title: string;
  notes?: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  start?: Date | string;
  end?: Date | string;
  allDay: boolean;
}

export interface NewEvent {
  id: string;
  title: string;
  start: string;
  allDay: boolean;
  notes: string;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
}