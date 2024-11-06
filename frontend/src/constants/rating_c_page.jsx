import React from 'react';

export const RATING_C_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow" key="6">
        <div className='text-3xl font-bold'>
                How would you rate McDonald's?
            </div>
            <br />
            <div className='text-l'>
                Rate McDonald's restaurant on a 1-5 scale:
            </div>
            <div>
                (1 - very bad, 5 - very good)
            </div>
            <div className='text-l'>
                1. Taste
            </div>
            <div className='text-l'>
                3. Price Levels
            </div>
        </div>
        <div id="steps-container" className="mt-auto py-10">
            <ul className="steps">
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step"></li>
            </ul>
        </div>
    </div>,
];
