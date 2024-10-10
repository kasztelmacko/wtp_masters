import React, { forwardRef } from 'react';

const SingleChoiceQuestion = forwardRef(({ id, label, value, onChange, options, required = false }, ref) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select your option</option>
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
