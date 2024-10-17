import React, { forwardRef } from 'react';


const InputQuestion = forwardRef(({ id, label, value, onChange, type = 'text', required = false, placeholder }, ref) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>
      <input
        className="input input-bordered w-full max-w-xs"
        ref={ref}
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
});

export default InputQuestion;
