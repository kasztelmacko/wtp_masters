import React from 'react';

export const MARKET_AWARENESS_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow text-gray-700 mb-4 text-start" key="1">
            <div className="font-bold text-3xl">What fast food brands do you know?</div>
            <br />
            <div>
            Type fast food brand name and press <span className="font-bold">Add</span> button.
            </div>
            <div>
            If you dont know any more click <span className="font-bold">Next</span>
            </div>
        </div>
        <div id="steps-container" className="mt-auto py-10">
            <ul className="steps">
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
            </ul>
        </div>
    </div>,
];
