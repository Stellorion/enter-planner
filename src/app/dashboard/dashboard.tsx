// src/app/dashboard/dashboard.tsx
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/src/containers/Dashboard/components/Card';
import { TaskCard } from '@/src/containers/Tasks/components/TaskCard';
import { EventCard } from '@/src/containers/Dashboard/components/EventCard';
import {
  FaPen,
  FaRegCalendar,
  FaRegClock,
  FaExchangeAlt,
} from 'react-icons/fa';
import { useState } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default function Dashboard() {
  const [view, setView] = useState<'calendar' | 'tasks'>('calendar');
  const notificationsEnabled = true;
  const enabledAlerts = ['Email Notifications', 'In-app Notifications'];
  // Get the user's local time zone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const todayDate = new Date();

  // Get the current date in the user's local time zone
  const today = format(
    toZonedTime(new Date(), userTimeZone),
    'eeee, MMMM dd, yyyy'
  );

  const todayRange = {
    start: todayDate,
    end: todayDate,
  };

  const sampleTasks = [
    {
      id: 1,
      title: 'Finish UI Dashboard',
      description: 'Complete the UI part of the dashboard.',
      dueDate: new Date(),
      progress: 80,
      status: 'PLANNED',
      order: 1,
    },
    {
      id: 2,
      title: 'Review PR #42',
      description: 'Review the code changes in the PR #42.',
      dueDate: new Date(),
      progress: 50,
      status: 'IN_PROGRESS',
      order: 2,
    },
    {
      id: 3,
      title: 'Plan Sprint Retro',
      description: 'Plan the agenda for the upcoming sprint retro.',
      dueDate: new Date(),
      progress: 30,
      status: 'ON_HOLD',
      order: 3,
    },
  ];

  const sampleEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM',
      location: 'Zoom',
      description: 'Monthly sync-up meeting',
    },
    {
      id: 2,
      title: 'Lunch with Alex',
      time: '12:30 PM',
      location: 'Cafe',
      description: 'Discuss project updates',
    },
    {
      id: 3,
      title: 'Client Call',
      time: '4:00 PM',
      location: 'Google Meet',
      description: 'Discuss upcoming project milestones',
    },
  ];

  return (
      <div className="flex min-h-screen flex-col">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Today's Date</h3>
              <p className="text-lg">{today}</p> {/* Dynamic date */}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Account Status</h3>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                Account: Active
              </p>
              <p className="text-sm">Last Login: 10:30 AM</p>
              <p className="text-sm">2FA: Enabled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Connected Services</h3>
              <ul>
                <li>Google Calendar</li>
                <li>Google Tasks</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Notifications</h3>
              {/* Displaying if notifications are enabled or disabled */}
              <p
                className={`text-sm font-semibold ${notificationsEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                {notificationsEnabled ? 'Alerts: Enabled' : 'Alerts: Disabled'}
              </p>

              {/* Displaying types of alerts enabled */}
              {notificationsEnabled && (
                <ul className="mt-2">
                  {enabledAlerts.length > 0 ? (
                    enabledAlerts.map((alert) => (
                      <li key={alert} className="text-sm text-gray-300">
                        - {alert}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500">
                      No alerts enabled.
                    </li>
                  )}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="flex flex-grow flex-col">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>
              {view === 'calendar' ? "Today's Events" : "Today's Tasks"}
            </CardTitle>
            <button
              onClick={() =>
                setView(view === 'calendar' ? 'tasks' : 'calendar')
              }
              className="rounded-full p-2 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              <FaExchangeAlt className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent className="max-h-screen flex-grow overflow-y-auto pr-2">
            <div className="space-y-3">
              {view === 'calendar'
                ? sampleEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                : sampleTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={(task) => alert('Edit task: ' + task.title)}
                    />
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
