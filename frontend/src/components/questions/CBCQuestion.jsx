import React, { forwardRef, useImperativeHandle } from 'react';

const CBCQuestion = forwardRef(({ id, label, selectedValue, onChange, options, required }, ref) => {
    useImperativeHandle(ref, () => ({
        id: id,
        required: required,
        options: options,
    }));

    const sortedOptions = [...options].sort((a, b) => a.no_choice - b.no_choice);

    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            {sortedOptions.map(option => (
                <div 
                    key={option.value} 
                    className={`col-span-1 flex flex-col justify-between w-full cursor-pointer ${selectedValue === option.value ? 'rounded-lg shadow-xl' : 'bg-white'}`} 
                    onClick={() => onChange(option.value)}
                >
                    <div className="h-full w-full relative group flex flex-col">
                        <div className={`transition duration-300 ease-in-out transform hover:translate-y-[-4px] hover:shadow-lg flex flex-col h-full ${option.no_choice ? 'bg-red-500' : 'bg-white'}`}>
                            {!option.no_choice ? (
                                <>
                                    <div className='h-48 content-center'>
                                        <img 
                                            className="rounded-t-lg w-full h-full object-cover" 
                                            src={option.img_url} 
                                            alt="" 
                                            draggable="false"
                                        />
                                    </div>
                                    <div className="p-5 w-full flex flex-col flex-grow overflow-hidden">
                                        <a className="block w-full" draggable="false">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{option.item_name}</h5>
                                        </a>
                                        <p className="mb-3 text-xs text-gray-700 dark:text-gray-400 overflow-hidden leading-4 flex-grow">
                                            {option.item_description}
                                        </p>
                                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-3">
                                            {option.portion_size} g, {option.calories} kcal
                                        </div>
                                        <div className="mt-auto flex items-center gap-x-1">
                                            <div className="text-5xl font-bold tracking-tight text-gray-900">
                                                {option.price} <span className="text-xl">zł</span>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name={id}
                                            value={option.value}
                                            checked={selectedValue === option.value}
                                            onChange={() => onChange(option.value)}
                                            required={required}
                                            className="hidden"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="flex-grow flex items-center justify-center text-white text-2xl font-bold">
                                    No Choice
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default CBCQuestion;
