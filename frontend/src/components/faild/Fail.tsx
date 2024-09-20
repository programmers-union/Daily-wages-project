import React from 'react';

interface Error {
  error: string;
}

const Fail: React.FC<Error> = ({ error }) => {
  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 animate-slide-up w-auto">
      <div className="bg-red-600 border border-white text-white text-sm px-8 py-3 rounded-xl flex justify-between items-center shadow-lg">
        <h4 className="text-sm">{error}</h4>
      </div>
    </div>
  );
};

export default Fail;
