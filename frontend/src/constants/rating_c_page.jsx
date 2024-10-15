import React from 'react';

export const RATING_C_PAGE = [
    <div class="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="p-10 flex-grow" key="0">
            <div>
                This part of the study is asking to rate restaurant attributes in an established fast food brand.
            </div>
            <br />
            <div className="text-base">
                You will see <span className="font-bold">3 rating questions</span> concerning:
            </div>
            <div className="text-base">
                <ol className="list-decimal pl-5">
                    <li>taste</li>
                    <li>atmosphere</li>
                    <li>prices</li>
                </ol>
            </div>
        </div>
        <div id="steps-container" class="mt-auto py-10">
            <ul class="steps">
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step step-success"></li>
            </ul>
        </div>
    </div>,
];
