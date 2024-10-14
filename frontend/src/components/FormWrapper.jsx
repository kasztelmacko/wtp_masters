import React from 'react';

const FormWrapper = ({ onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form onSubmit={handleSubmit} className='w-full h-2/5 flex flex-col justify-between p-4'>
        <div className='flex flex-col items-center'>
          {children}
        </div>
        <div className='flex justify-end'>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormWrapper;