import React from 'react';

export const MAIN_PAGE = [
    <div class="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="p-10 flex-grow" key="0">
            <div>
            You will take part in a study on the impact of different pricing strategies used by fast food chains to increase your willingness to pay.
            </div>
            <br />
            <div>
            The research is conducted for scientific purposes and is anonymous. Your answers will help my master's thesis.
            </div>
            <div className="text-base">
            The survey should take up to <span className="font-bold">15 minutes</span>.
            </div>
            <br />
            <div className="text-base">
            The survey consists of <span className="font-bold">5 parts</span>:
            </div>
            <div>1. Questionnaire about your demographics and characteristics,</div>
            <div>2. Questionnaire about your knowledge of fast food market,</div>
            <div>3. Questionnaire about your priorities and preferences for decision-making,</div>
            <div>4. Questionnaire about your willingness to pay</div>
            <div>5. Questionnaire of your rating for restaurant attributes.</div>
        </div>
        <div id="steps-container" class="mt-auto py-10">
            <ul class="steps">
                <li class="step step-success"></li>
                <li class="step"></li>
                <li class="step"></li>
                <li class="step"></li>
                <li class="step"></li>
            </ul>
        </div>
    </div>,
];