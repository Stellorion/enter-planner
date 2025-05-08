export function ProgressIndicator({ progress }: { progress: number }) {
    let textColor = "text-gray-700"
  
    if (progress === 100) {
      textColor = "text-green-700 dark:text-green-500"
    } else if (progress >= 75) {
      textColor = "text-blue-700 dark:text-blue-500"
    } else if (progress >= 50) {
      textColor = "text-yellow-700 dark:text-yellow-500"
    } else if (progress > 0) {
      textColor = "text-orange-700 dark:text-orange-500"
    } else {
      textColor = "text-gray-700 dark:text-gray-500"
    }
  
    return (
      <div className={`text-xs ${textColor}`}>
        {progress}%
      </div>
    );
  }