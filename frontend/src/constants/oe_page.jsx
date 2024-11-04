import React from 'react';

export const OE_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow" key="4">
            <div>
                You will see <span className="font-bold">3 products</span> for which you need to answer the questions below:
            </div>
            <br />
            <div>
            type your guesses in the input fields below the items.
            </div>
            <div>
            provide your answers in zł (PLN).
            </div>
        </div>
        <div id="steps-container" className="mt-auto py-10">
            <ul className="steps">
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step step-success"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
            </ul>
        </div>
    </div>,
];
