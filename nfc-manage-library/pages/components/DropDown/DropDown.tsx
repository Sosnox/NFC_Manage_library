import React, { ReactNode } from 'react';

const DropDown: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='dropdown'>
      {children }
    </div>
  );
};

export default DropDown;
