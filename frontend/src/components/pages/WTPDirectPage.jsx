import React from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';
import FormWrapper from '../FormWrapper';

const WTPDirectPage = ({ inputRefs, burger_wtp, burger_premium_wtp, bundle_wtp, setBurgerWTP, setBurgerPremiumWTP, setBundleWTP, onSubmit }) => {
    const questions = [
        { id: 'burger_wtp', value: burger_wtp, setValue: setBurgerWTP },
        { id: 'burger_premium_wtp', value: burger_premium_wtp, setValue: setBurgerPremiumWTP },
        { id: 'bundle_wtp', value: bundle_wtp, setValue: setBundleWTP },
    ];

    const handleSubmit = async () => {
        onSubmit();

        const WTPDirectQuestions = questions.reduce((acc, { id, value }) => {
            acc[id] = {
                input_type: inputRefs[id].current.type,
                question_name: inputRefs[id].current.id,
                required: inputRefs[id].current.required,
                question_text: parseFloat(value),
            };
            return acc;
        }, {});

        try {
            console.log('Payload being sent:', WTPDirectQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/direct-wtp-questions', WTPDirectQuestions);
        } catch (error) {
            console.error('Error sending question:', error);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <div>
                {questions.map(({ id, setValue }) => (
                    <div key={id}>
                        What is the maximum amount you would be willing to pay for this
                        <InputQuestion
                            ref={inputRefs[id]}
                            id={id}
                            label={id.replace(/_/g, ' ')}
                            type="number"
                            required={true}
                            value={id === 'burger_wtp' ? burger_wtp : id === 'burger_premium_wtp' ? burger_premium_wtp : bundle_wtp}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

export default WTPDirectPage;