import React, { forwardRef, useImperativeHandle } from 'react';

const CBCQuestion = forwardRef(({ id, label, selectedValue, onChange, options, required }, ref) => {
    useImperativeHandle(ref, () => ({
        id: id,
        required: required,
        options: options,
    }));

    return (
        <div>
            <label>{label}</label>
            <div>
                {options.map(option => (
                    <div key={option.value}>
                        <label>
                            <input
                                type="radio"
                                value={option.value}
                                checked={selectedValue === option.value}
                                onChange={() => onChange(option.value)}
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

export default CBCQuestion;