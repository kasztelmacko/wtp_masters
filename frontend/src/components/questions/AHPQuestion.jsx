import React, { useState, forwardRef, useImperativeHandle } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';

const AHPQuestion = forwardRef(({ criteria, id }, ref) => {
  const [selectedOption, setSelectedOption] = useState('');

  // Use imperative handle to expose the necessary data
  useImperativeHandle(ref, () => ({
    id,
    value: selectedOption,
    criteria
  }));

  return (
    <div>
      <h2>{criteria[0]} is
        <SingleChoiceQuestion
          id={id}
          label=""
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
          options={[
            { value: '1/7', label: 'much less important than' },
            { value: '1/5', label: 'significantly less important than' },
            { value: '1/3', label: 'slightly less important than' },
            { value: '1', label: 'equally important as' },
            { value: '3', label: 'slightly more important than' },
            { value: '5', label: 'significantly more important than' },
            { value: '7', label: 'much more important than' }
          ]}
          required={true}
        />
        {criteria[1]}
      </h2>
    </div>
  );
});

export default AHPQuestion;
