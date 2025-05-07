const OnboardSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl dark:text-blue-600">
            How Enter Planner works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-500">
            Getting started is simple. Follow these steps to transform your
            productivity.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Create an account',
              description:
                'Sign up for free in seconds and set up your profile.',
            },
            {
              step: '02',
              title: 'Add your tasks & events',
              description:
                'Input your schedule and to-dos or import from Google.',
            },
            {
              step: '03',
              title: 'Stay organized',
              description:
                'Get reminders, track progress, and accomplish more every day.',
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white">
                {item.step}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-900 dark:text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="rounded-lg bg-blue-600 px-6 py-4 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
            Get started now
          </button>
        </div>
      </div>
    </section>
  );
};

export default OnboardSection;
