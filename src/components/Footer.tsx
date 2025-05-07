const Footer = () => {
    return (
      <footer className="py-3 shadow-xl shadow-blue-500/90 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
                Enter Planner
            </h3>
            <p className="text-gray-400 mb-4 text-center">
                Stay organized, stay focused — making every day count.
            </p>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Enter Planner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;