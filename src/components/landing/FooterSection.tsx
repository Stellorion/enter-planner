import React from 'react';
import TaskCard from '@/src/components/landing/TaskCard';
import IntegrationCard from '@/src/components/landing/IntegrationCard';

const FooterSection = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <div className="flex w-full flex-wrap justify-center gap-10">
        <TaskCard />
        <IntegrationCard />
      </div>
    </div>
  );
};

export default FooterSection;
