import React from 'react';
import InputQuestion from './InputQuestion';

const GuessPriceQuestion = ({ item, inputRef, value, onChange }) => {
    return (
        <div className="flex flex-col items-center mb-4 mx-2">
            <div className="h-full relative group flex flex-col border rounded-lg shadow-md p-4">
                <div className="h-48 w-full">
                    <img 
                        className="rounded-t-lg w-full h-full object-cover" 
                        src={item.img_url} 
                        alt={item.item_name} 
                        draggable="false"
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{item.item_name}</h5>
                    <p className="mb-3 text-sm text-gray-700 overflow-hidden leading-4 flex-grow">
                        {item.item_description}
                    </p>
                </div>
            </div>
            <div className='w-full'>
            <InputQuestion
                ref={inputRef}
                id={item.id}
                type="number"
                required={true}
                value={value}
                onChange={onChange}
                className="w-full"
            />
            </div>
        </div>
    );
};

export default GuessPriceQuestion;