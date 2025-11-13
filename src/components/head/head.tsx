import React from 'react';

interface HeadProps {
  toggleClose: () => void;
}

const Head: React.FC<HeadProps> = ({ toggleClose }) => {
  return (
    <div className='flex justify-between items-center border-b border-[#BAC7D5] px-4 py-4'>
      <h1 className='text-[#00A58E] text-2xl font-bold'>
        Future HQ
      </h1>
      <button
        onClick={toggleClose}
        className="text-xl font-bold text-gray-600 hover:text-gray-800 lg:hidden"
      >
        X
      </button>
    </div>
  );
};

export default Head;
