import React from 'react';
import axios from 'axios';
import FormWrapper from '../FormWrapper';
import GuessPriceQuestion from '../questions/GuessPriceQuestion'; // Import the GuessPriceQuestion component

const GuessPricesPage = ({ inputRefs, burger, burger_premium, bundle, setBurger, setBurgerPremium, setBundle, onSubmit }) => {
    const handleSubmit = async () => {
        onSubmit();

        const questionsConfig = [
            {
                key: 'burger',
                input_type: inputRefs.burger.current.type,
                question_name: inputRefs.burger.current.id,
                required: inputRefs.burger.current.required,
                question_text: parseFloat(burger),
            },
            {
                key: 'burger_premium',
                input_type: inputRefs.burger_premium.current.type,
                question_name: inputRefs.burger_premium.current.id,
                required: inputRefs.burger_premium.current.required,
                question_text: parseFloat(burger_premium),
            },
            {
                key: 'bundle',
                input_type: inputRefs.bundle.current.type,
                question_name: inputRefs.bundle.current.id,
                required: inputRefs.bundle.current.required,
                question_text: parseFloat(bundle),
            }
        ];

        const GuessPricesQuestions = questionsConfig.reduce((acc, question) => {
            acc[question.key] = {
                input_type: question.input_type,
                question_name: question.question_name,
                required: question.required,
                question_text: question.question_text,
            };
            return acc;
        }, {});

        try {
            console.log('Payload being sent:', GuessPricesQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/guess-prices-questions', GuessPricesQuestions);
        } catch (error) {
            console.error('Error sending question:', error);
        }
    };

    const items = [
        {
            id: 'burger',
            item_name: 'Classic Burger',
            item_description: 'A delicious classic burger with lettuce, tomato, and cheese.',
            img_url: 'https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/bundle_classic.png?t=2024-10-17T17%3A35%3A25.055Z',
        },
        {
            id: 'burger_premium',
            item_name: 'Premium Burger',
            item_description: 'A premium burger with extra toppings and sauces.',
            img_url: 'https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/bundle_classic.png?t=2024-10-17T17%3A35%3A25.055Z',
        },
        {
            id: 'bundle',
            item_name: 'Family Bundle',
            item_description: 'A family bundle with burgers, fries, and drinks.',
            img_url: 'https://kkpcuktyelbwgigadulx.supabase.co/storage/v1/object/public/item_photos/bundle_classic.png?t=2024-10-17T17%3A35%3A25.055Z',
        }
    ];

    return (
        <FormWrapper onSubmit={handleSubmit} isLastPage={true}>
            <div className="flex flex-wrap justify-between">
                {items.map((item, index) => (
                    <GuessPriceQuestion
                        key={item.id}
                        item={item}
                        inputRef={inputRefs[item.id]}
                        value={index === 0 ? burger : index === 1 ? burger_premium : bundle}
                        onChange={(e) => {
                            if (index === 0) setBurger(e.target.value);
                            else if (index === 1) setBurgerPremium(e.target.value);
                            else setBundle(e.target.value);
                        }}
                    />
                ))}
            </div>
        </FormWrapper>
    );
};

export default GuessPricesPage;