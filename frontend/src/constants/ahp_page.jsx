import React from 'react';

export const AHP_PAGE = [
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow" key="3">
            <div>
                This part of the study is trying to find your priorities and preferences for decision-making when you deal with a new unknown product/brand.
            </div>
            <br />
            <div>
                You will see <span className="font-bold">15 sentences</span> in which you need to fill the gap so the sentence is true according to your belief.
            </div>
            <br />
            <div className='font-bold text-3xl'>
                What is more important to you when you make a decision?
            </div>
            <br />
            <div>
                Please understand the following phrases as described below when completing the sentences:
            </div>
            <div>
                <ul className="list-disc pl-5">
                    <li><span className="font-bold">Brand recognition:</span> Rembering the brand without any ads, logo, slogan.</li>
                    <li><span className="font-bold">Brand recall:</span> Recognizing brand based on its ads, logo, slogan.</li>
                    <li><span className="font-bold">Brand past purchase or use:</span> Whether you have bought or used the brand before.</li>
                    <li><span className="font-bold">Emotional perception of the brand:</span> How the brand makes you feel.</li>
                    <li><span className="font-bold">Logo:</span> Your liking of the brand's visual symbol.</li>
                    <li><span className="font-bold">Utilitarian benefits:</span> Benefits that brands profits provide.</li>
                </ul>
            </div>
            <br />
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
