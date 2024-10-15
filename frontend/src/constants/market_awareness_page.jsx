import React from 'react';

export const MARKET_AWARENESS_PAGE = [
    <div class="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="p-10 flex-grow" key="0">
            <div>
            This part of the study is trying to measure how well you know the fast food market.
            </div>
            <br />
            <div className="text-base">
            It consists of <span className="font-bold">2 parts</span>:
            </div>
            <div>1. Choosing the fast food brands you know,</div>
            <div>2. Guessing prices of real products from known brands,</div>
        </div>
        <div id="steps-container" class="mt-auto py-10">
            <ul class="steps">
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step"></li>
                <li class="step"></li>
                <li class="step"></li>
            </ul>
        </div>
    </div>,
];