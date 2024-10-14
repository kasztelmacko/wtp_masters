import React, { useState, forwardRef, useImperativeHandle } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';

const AHPQuestion = forwardRef(({ criteria, id }, ref) => {
  const [selectedOption, setSelectedOption] = useState('');

  useImperativeHandle(ref, () => ({
    id,
    value: selectedOption,
    criteria
  }));

  return (
    <div className='flex items-end justify-between '>
      <h2 className='text-gray-700 text-sm font-bold mb-2 flex-1 text-center'>{criteria[0]} is</h2>
      <div className='flex-1 content-center'>
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
          required={true}
        />
      </div>
      <h2 className='text-gray-700 text-sm font-bold mb-2 flex-1 text-center'>{criteria[1]}</h2>
    </div>
  );
});

export default AHPQuestion;
