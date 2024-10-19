import React, { useState, forwardRef, useImperativeHandle } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';

const AHPQuestion = forwardRef(({ criteria, id, required }, ref) => {
  const [selectedOption, setSelectedOption] = useState('');

  useImperativeHandle(ref, () => ({
    id,
    value: selectedOption,
    criteria
  }));

  return (
    <div className='flex flex-col items-start text-3xl w-full max-w-md mx-auto'>
      <h2 className='text-gray-700 font-bold mb-4 text-start'>{criteria[0]} is</h2>
      <div className='w-full mb-4'>
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
            { value: '7', label: 'much more important than' },
          ]}
          required={required}
        />
      </div>
      <h2 className='text-gray-700 font-bold mb-4 text-start'>{criteria[1]}</h2>
    </div>
  );
});

export default AHPQuestion;
