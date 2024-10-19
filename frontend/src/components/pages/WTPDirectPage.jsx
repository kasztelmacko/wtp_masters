import React from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';
import FormWrapper from '../FormWrapper';

const WTPDirectPage = ({ 
    inputRefs, 
    upperT, 
    setUpperT, 
    lowerT, 
    setLowerT, 
    upperB, 
    setUpperB, 
    lowerb, 
    setLowerb, 
    guess, 
    setGuess, 
    onSubmit, 
    item // New prop for item type
}) => {

    const itemOptions = {
        burger: {
            item_id: 'burger',
            item_name: 'Classic Burger',
            item_description: 'A delicious classic burger with lettuce, tomato, and cheese.',
            img_url: 'https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/bundle_classic.png?t=2024-10-17T17%3A35%3A25.055Z',
            portion_size: 500,
            calories: 500
        },
        burger_premium: {
            item_id: 'burger_premium',
            item_name: 'Premium Burger',
            item_description: 'A premium burger with extra toppings and sauces.',
            img_url: 'https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/bundle_classic.png?t=2024-10-17T17%3A35%3A25.055Z',
            portion_size: 600,
            calories: 600
        },
        bundle: {
            item_id: 'bundle',
            item_name: 'Family Bundle',
            item_description: 'A family bundle with burgers, fries, and drinks.',
            img_url: 'https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/bundle_classic.png?t=2024-10-17T17%3A35%3A25.055Z',
            portion_size: 1000,
            calories: 1200
        }
    };

    const option = itemOptions[item];

    const handleSubmit = async () => {
        onSubmit();

        const WTPDirectQuestions = {
            item: option.item_id,
            [`wtp_UpperT`]: {
                input_type: inputRefs[`${item}_wtp_UpperT`].current.type,
                question_name: inputRefs[`${item}_wtp_UpperT`].current.id,
                required: inputRefs[`${item}_wtp_UpperT`].current.required,
                question_text: parseFloat(upperT),
            },
            [`wtp_LowerT`]: {
                input_type: inputRefs[`${item}_wtp_LowerT`].current.type,
                question_name: inputRefs[`${item}_wtp_LowerT`].current.id,
                required: inputRefs[`${item}_wtp_LowerT`].current.required,
                question_text: parseFloat(lowerT),
            },
            [`wtp_upperB`]: {
                input_type: inputRefs[`${item}_wtp_upperB`].current.type,
                question_name: inputRefs[`${item}_wtp_upperB`].current.id,
                required: inputRefs[`${item}_wtp_upperB`].current.required,
                question_text: parseFloat(upperB),
            },
            [`wtp_lowerB`]: {
                input_type: inputRefs[`${item}_wtp_lowerb`].current.type,
                question_name: inputRefs[`${item}_wtp_lowerb`].current.id,
                required: inputRefs[`${item}_wtp_lowerb`].current.required,
                question_text: parseFloat(lowerb),
            },
            [`wtp_guess`]: {
                input_type: inputRefs[`${item}_wtp_guess`].current.type,
                question_name: inputRefs[`${item}_wtp_guess`].current.id,
                required: inputRefs[`${item}_wtp_guess`].current.required,
                question_text: parseFloat(guess),
            },
        };

        try {
            console.log('Payload being sent:', WTPDirectQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/direct-wtp-questions', WTPDirectQuestions);
        } catch (error) {
            console.error('Error sending question:', error);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit} isLastPage={true}>
            <div className="flex flex-col">
                {/* Item Card */}
                <div className="mb-4">
                    <div className="h-full relative group flex flex-col border rounded-lg shadow-md p-4 w-full max-w-xs">
                        <div className='h-48 content-center'>
                            <img 
                                className="rounded-t-lg w-full h-full object-cover" 
                                src={option.img_url} 
                                alt="" 
                                draggable="false"
                            />
                        </div>
                        <div className="p-5 w-full flex flex-col flex-grow overflow-hidden">
                            <a className="block w-full" draggable="false">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{option.item_name}</h5>
                            </a>
                            <p className="mb-3 text-xs text-gray-700 dark:text-gray-400 overflow-hidden leading-4 flex-grow">
                                {option.item_description}
                            </p>
                            <div className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-3">
                                {option.portion_size} g, {option.calories} kcal
                            </div>
                            <div className="mt-auto flex items-center gap-x-1">
                                <div className="text-5xl font-bold tracking-tight text-gray-900">
                                    ??? <span className="text-xl">zł</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Questions */}
                <div>
                    <p>At what price would you consider this burger so expensive that you would not consider buying it?</p>
                    <InputQuestion
                        ref={inputRefs[`${item}_wtp_UpperT`]}
                        id={`${item}_wtp_UpperT`}
                        label=''
                        type="number"
                        required={true}
                        value={upperT} // Bind the value to the prop
                        onChange={(e) => setUpperT(e.target.value)} // Update state
                    />
                    
                    <p>At what price would you consider this burger so inexpensive that you would feel the quality could not be very good and you would not consider buying it?</p>
                    <InputQuestion
                        ref={inputRefs[`${item}_wtp_LowerT`]}
                        id={`${item}_wtp_LowerT`}
                        label=''
                        type="number"
                        required={true}
                        value={lowerT} // Bind the value to the prop
                        onChange={(e) => setLowerT(e.target.value)} // Update state
                    />
                    
                    <p>At what price would you consider the burger was becoming expensive and although not out of question?</p>
                    <InputQuestion
                        ref={inputRefs[`${item}_wtp_upperB`]}
                        id={`${item}_wtp_upperB`}
                        label=''
                        type="number"
                        required={true}
                        value={upperB} // Bind the value to the prop
                        onChange={(e) => setUpperB(e.target.value)} // Update state
                    />
                    
                    <p>At what price would you consider the burger a bargain - a great buy for the money?</p>
                    <InputQuestion
                        ref={inputRefs[`${item}_wtp_lowerb`]}
                        id={`${item}_wtp_lowerb`}
                        label=''
                        type="number"
                        required={true}
                        value={lowerb} // Bind the value to the prop
                        onChange={(e) => setLowerb(e.target.value)} // Update state
                    />
                    
                    <p>What would the market price without any discounts be?</p>
                    <InputQuestion
                        ref={inputRefs[`${item}_wtp_guess`]}
                        id={`${item}_wtp_guess`}
                        label=''
                        type="number"
                        required={true}
                        value={guess} // Bind the value to the prop
                        onChange={(e) => setGuess(e.target.value)} // Update state
                    />
                </div>
            </div>
        </FormWrapper>
    );
};

export default WTPDirectPage;