import React, { useState, useEffect } from 'react';

interface Success {
  success: string;
}

const Success: React.FC<Success> = ({ success }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide after 5 seconds
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 animate-slide-up w-auto">
      <div className="bg-green-600 border border-white text-white text-sm px-8 py-3 rounded-xl flex justify-between items-center shadow-lg">
        <h4 className="text-sm">{success}</h4>
      </div>
    </div>
  );
};

export default Success;
