import React, { forwardRef } from 'react';


const InputQuestion = forwardRef(({ id, label, value, onChange, type = 'text', required = false }, ref) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default InputQuestion;
