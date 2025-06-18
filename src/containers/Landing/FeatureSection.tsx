import {
  MdOutlinePeopleAlt,
  MdCloudQueue,
  MdSmartphone,
  MdCalendarToday,
  MdOutlineCheckBox,
  MdAccessTime,
} from 'react-icons/md';

const FeatureSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl dark:text-blue-600">
            Everything you need to stay organized
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-500">
            Powerful features designed to boost your productivity and simplify
            your day-to-day planning.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <MdCalendarToday className="h-8 w-8 text-blue-600" />,
              title: 'Smart Calendar',
              description:
                'Visualize your schedule with our intuitive calendar interface. Drag and drop events to reschedule.',
            },
            {
              icon: <MdOutlineCheckBox className="h-8 w-8 text-blue-600" />,
              title: 'Task Management',
              description:
                'Create, organize, and prioritize tasks with ease. Set deadlines and never miss important to-dos.',
            },
            {
              icon: <MdAccessTime className="h-8 w-8 text-blue-600" />,
              title: 'Reminders',
              description:
                'Get timely notifications for upcoming events and tasks across all your devices.',
            },
            {
              icon: <MdOutlinePeopleAlt className="h-8 w-8 text-blue-600" />,
              title: 'Collaboration',
              description:
                'Share calendars and task lists with family, friends, or colleagues for seamless teamwork.',
            },
            {
              icon: <MdSmartphone className="h-8 w-8 text-blue-600" />,
              title: 'Mobile Access',
              description:
                'Access your schedule and tasks from anywhere with our mobile-friendly design.',
            },
            {
              icon: <MdCloudQueue className="h-8 w-8 text-blue-600" />,
              title: 'Cloud Sync',
              description:
                'Your data is automatically synced across all your devices in real-time.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="hover:transform- rounded-lg bg-gray-100 p-6 transition-shadow hover:shadow-md dark:bg-gray-800"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-blue-600">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
