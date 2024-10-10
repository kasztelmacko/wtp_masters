import React, { forwardRef } from 'react';

const OpinionScaleQuestion = forwardRef(({ id, value, onChange, required = false, min_value = 0, max_value = 5 }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </label>
        <input
          ref={ref}
          id={id}
          type="range"
          required={required}
          min={min_value}
          max={max_value}
          value={value}
          onChange={onChange}
          className="range"
          step="1"
        />
        <div className="flex justify-between px-2 text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    );
});

export default OpinionScaleQuestion;