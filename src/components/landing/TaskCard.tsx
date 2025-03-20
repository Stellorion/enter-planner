import React from 'react';

const TaskCard = () => {
  return (
    <div className="hidden w-1/3 rounded-lg bg-white p-5 text-gray-700 md:block">
      <h2 className="mb-4 text-xl font-semibold">Today's tasks</h2>
      <div className="mb-4 flex items-center justify-between">
        <p>New ideas for campaign</p>
        <div className="h-2 w-24 rounded-full bg-gray-200"></div>
      </div>
      <div className="flex items-center justify-between">
        <p>Design PPT #4</p>
        <div className="h-2 w-24 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default TaskCard;
