import React from 'react';

export const MAIN_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow" key="0">
            <div>
            You will be asked questions concerning fast food brands.
            </div>
            <br />
            <div>
            The research is conducted for scientific purposes and is anonymous. Your answers will help my master's thesis.
            </div>
            <div>
            The survey should take up to <span className="font-bold">15 minutes</span>.
            </div>
            <br />
            <div>
            The survey consists of <span className="font-bold">7 parts</span> and asks about your preferences, choices and factors influencing your decisions.
            </div>
            <br />
            <div>
            Each section presents a task and corresponding questions to answer.
            </div>
        </div>
        <div id="steps-container" className="mt-auto py-10">
            <ul className="steps">
                <li className="step step-success"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
                <li className="step"></li>
            </ul>
        </div>
    </div>,
];