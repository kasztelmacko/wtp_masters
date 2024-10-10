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
        <div>
            <label>{label}</label>
            <div>
                {options.map(option => (
                    <div key={option.value}>
                        <label>
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedValues.includes(option.value)}
                                onChange={() => handleChange(option.value)}
                                required={required}
                            />
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default MultipleChoiceQuestion;