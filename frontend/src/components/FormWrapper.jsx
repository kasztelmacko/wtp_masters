import React from 'react';

const FormWrapper = ({ onSubmit, onNext, isLastPage, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center h-screen w-full p-10">
      <form onSubmit={handleSubmit} className='w-full h-2/5 flex flex-col justify-between p-4'>
        <div className='flex flex-col items-center'>
          {children}
        </div>
        <div className='flex justify-center p-10'>
            {isLastPage ? (
                <button type="submit" className='btn btn-success'>Submit</button>
            ) : (
                <button type="button" onClick={onNext} className='btn btn-success'>Next</button>
            )}
        </div>
      </form>
    </div>
  );
};

export default FormWrapper;
