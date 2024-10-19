import React from 'react';

export const OE_PAGE = [
    <div class="flex flex-col items-center justify-center h-full bg-bg-primary col-span-3">
        <div className="flex-grow text-xl" key="0">
            <div>
                This part of the study is asking directly about how much would you be willing to pay for a certain fast food product.
            </div>
            <br />
            <div>
                You will see <span className="font-bold">3 products</span> for which you need to answer the following questions:
            </div>
            <br />
            <div>
                <ol className="list-decimal pl-5 font-bold">
                    <li>At what price would you consider this burger so expensive that you would not consider buying it?</li><br />
                    <li>At what price would you consider this burger so inexpensive that you would feel the quality could not be very good and you would not consider buying it?</li><br />
                    <li>At what price would you consider the burger was becoming expensive and although not out of question?</li><br />
                    <li>At what price would you consider the burger a bargain - a great buy for the money?</li><br />
                    <li>What would the market price without any discounts be?</li>
                </ol>
            </div>
            <br />
            <div>
            type your guesses in the input fields below the items.
            </div>
            <div>
            provide your answers in zł (PLN).
            </div>
        </div>
        <div id="steps-container" class="mt-auto py-10">
            <ul class="steps">
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step step-success"></li>
                <li class="step"></li>
                <li class="step"></li>
                <li class="step"></li>
            </ul>
        </div>
    </div>,
];
