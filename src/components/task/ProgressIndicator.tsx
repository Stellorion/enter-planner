export function ProgressIndicator({ progress }: { progress: number }) {
    let color = "bg-gray-200"
    let textColor = "text-gray-700"
  
    if (progress === 100) {
      color = "bg-green-100"
      textColor = "text-green-700"
    } else if (progress >= 75) {
      color = "bg-blue-100"
      textColor = "text-blue-700"
    } else if (progress >= 50) {
      color = "bg-yellow-100"
      textColor = "text-yellow-700"
    } else if (progress > 0) {
      color = "bg-orange-100"
      textColor = "text-orange-700"
    }
  
    return (
      <div className={`px-2 py-0.5 rounded-full text-xs ${color} ${textColor}`}>
        {progress}%
      </div>
    );
  }