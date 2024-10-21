import React from 'react';

export const GUESS_PRICE_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow text-gray-700 mb-4 text-start" key="2">
            <div>
            To the right there are three products available to buy in McDonald's.
            </div>
            <br />
            <div className='font-bold text-3xl'>
            How much do each of those items costs in the restaurant?
            </div>
            <br />
            <div>
            type your guesses in the input fields below the items.
            </div>
            <div>
            provide your answers in zł (PLN).
            </div>
            <br />
        </div>
        <div id="steps-container" className="mt-auto py-10">
            <ul className="steps">
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
            </ul>
        </div>
    </div>,
];
