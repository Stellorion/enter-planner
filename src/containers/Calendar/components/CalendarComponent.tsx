'use client';

import { useMediaQuery } from 'react-responsive';
import MobileCalendarComponent from './MobileCalendarComponent';
import DesktopCalendarComponent from './DesktopCalendarComponent';
import { CalendarComponentProps } from '@/src/types/event';

const CalendarComponent = (props: CalendarComponentProps) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return isMobile
    ? <MobileCalendarComponent {...props} />
    : <DesktopCalendarComponent {...props} />;
};

export default CalendarComponent;