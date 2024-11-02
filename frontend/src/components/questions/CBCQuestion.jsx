import React, { forwardRef, useImperativeHandle } from 'react';

const CBCQuestion = forwardRef(({ id, label, selectedValue, onChange, options, required }, ref) => {
    useImperativeHandle(ref, () => ({
        id: id,
        required: required,
        options: options,
    }));

    const sortedOptions = [...options].sort((a, b) => a.no_choice - b.no_choice);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-16 w-full">
            {sortedOptions.map(option => (
                <div 
                    className={`h-full w-full relative group flex flex-col border rounded-lg border-gray-300 min-w-[180px] max-w-[360px] lg:max-w-[240px] xl:max-w-[360px]`}
                    onClick={() => onChange(option.value)}
                    key={option.value} 
                >
                    <div className={`transition duration-300 ease-in-out transform hover:translate-y-[-4px] hover:shadow-lg flex flex-col h-full ${selectedValue === option.value ? 'bg-zinc-200 shadow-xl' : 'bg-white'} ${option.no_choice ? 'bg-red-500' : ''}`}>
                        {!option.no_choice ? (
                            <div className="h-full w-full flex flex-col">
                                <div className="h-48 w-full flex justify-center items-center">
                                    <figure>
                                        <img src={option.img_url}  
                                        className="max-w-full max-h-full object-contain" 
                                        />
                                    </figure>
                                </div>
                                <div className="p-5 flex-grow overflow-hidden">
                                    <a className="block w-full" draggable="false">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{option.item_name}</h5>
                                    </a>
                                    <p className="mb-3 text-xs text-gray-700 dark:text-gray-400 overflow-hidden leading-4 flex-grow">
                                        {option.item_description}
                                    </p>
                                </div>
                                <div className="mt-auto w-full">
                                    <div className="bg-red-500 text-white text-xs font-semibold p-2 rounded-md grid grid-cols-3 gap-4 items-center justify-items-center">
                                        <div className="text-center">
                                            <div>{option.portion_size} g</div>
                                            <div>{option.calories} kcal</div>
                                        </div>
                                        <div className="text-center ">
                                            <div className="w-8 rounded">
                                                <img
                                                src="https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/wendys-logo-6.png?t=2024-11-02T12%3A17%3A11.521Z"
                                                alt="wendy's logo" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold tracking-tight text-white">
                                                {option.price} <span className="text-xl">zł</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    name={id}
                                    value={option.value}
                                    checked={selectedValue === option.value}
                                    onChange={() => onChange(option.value)}
                                    required={required}
                                    className="absolute opacity-0 cursor-pointer"
                                />
                            </div>
                        ) : (
                            <div className="flex-grow flex items-center justify-center text-white text-2xl font-bold bg-red-500">
                                No Choice
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
});

export default CBCQuestion;