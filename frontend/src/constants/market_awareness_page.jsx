import React from 'react';

export const MARKET_AWARENESS_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow text-gray-700 mb-4 text-start" key="1">
            <div>
            This is a list of existing fast food brands.
            </div>
            <div>
            Not all operate in Poland.
            </div>
            <br />
            <div className="font-bold text-3xl">Which fast food brands do you recognize?</div>
            <br />
            <div>
            Check the boxes of those you do.
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
