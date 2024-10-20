import React, { forwardRef } from 'react';

const SingleChoiceQuestion = forwardRef(({ id, label, value, onChange, options, required = true }, ref) => {
  return (
    <div>
      <label htmlFor={id} className='block text-gray-700 text-xs font-bold mb-2'>{label}</label>
      <select 
        className="select select-bordered w-full max-w-xs"
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled hidden>Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SingleChoiceQuestion;
