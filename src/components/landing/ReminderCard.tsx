import React from 'react';

const ReminderCard = () => {
  return (
    <div className="hidden w-64 rounded-lg bg-gray-100 p-5 text-gray-700 md:block">
      <p>Reminders</p>
      <div className="mt-2 rounded-md bg-white p-2 text-gray-700">
        <p>Today's Meeting</p>
        <p className="text-sm text-gray-500">Call with marketing</p>
        <p className="text-sm text-gray-500">13:00 - 13:45</p>
        <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
          31
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
