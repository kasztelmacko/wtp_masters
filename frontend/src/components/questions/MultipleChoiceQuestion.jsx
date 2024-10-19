import React, { forwardRef, useImperativeHandle } from 'react';

const MultipleChoiceQuestion = forwardRef(({ id, label, selectedValues, onChange, options, required }, ref) => {
    useImperativeHandle(ref, () => ({
        id: id,
        required: required,
        options: options,
    }));

    const handleChange = (value) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value) 
            : [...selectedValues, value];
        onChange(newSelectedValues);
    };

    return (
        <div className="multiple-choice-question">
            <label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-8 text-center'>{label}</label>
            <div className="grid grid-cols-2 gap-4 gap-x-28">
                {options.map(option => (
                    <label key={option.value} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedValues.includes(option.value)}
                            onChange={() => handleChange(option.value)}
                            className="w-6 h-6 checkbox checkbox-success"
                        />
                        <span className="ml-2">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
});

export default MultipleChoiceQuestion;