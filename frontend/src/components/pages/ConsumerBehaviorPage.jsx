import React from 'react';
import axios from 'axios';
import SingleChoiceQuestion from '../questions/SingleChoiceQuestion';
import FormWrapper from '../FormWrapper';

const ConsumerBehaviorPage = ({ inputRefs, frequency_of_fast_food_dining, monthly_spenditure_on_fast_food, setFrequencyOfFastFoodDining, setMonthlySpenditureOnFastFood, onSubmit }) => {
    const questions = [
        {
            id: 'frequency_of_fast_food_dining',
            value: frequency_of_fast_food_dining,
            setValue: setFrequencyOfFastFoodDining,
        },
        {
            id: 'monthly_spenditure_on_fast_food',
            value: monthly_spenditure_on_fast_food,
            setValue: setMonthlySpenditureOnFastFood,
        },
    ];
    
    const handleSubmit = async () => {
        onSubmit();


        const ConsumerBehaviorQuestions = questions.reduce((acc, { id, value }) => {
            acc[id] = {
                question_name: inputRefs[id].current.id,
                question_text: value,
                required: inputRefs[id].current.required,
                choices: Array.from(inputRefs[id].current.options)
                    .map(option => option.value)
                    .filter(value => value !== ''),
            };
            return acc;
        }, {});

        try {
            console.log('Payload being sent:', ConsumerBehaviorQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/consumer-behavior-questions', ConsumerBehaviorQuestions);
            console.log(response.data);
        } catch (error) {
            console.error("Error posting consumer behavior questions:", error);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            {questions.map(({ id, value, setValue }) => (
                <SingleChoiceQuestion 
                    key={id}
                    ref={inputRefs[id]}
                    id={id}
                    label={id.replace(/_/g, ' ')}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    options={id === 'frequency_of_fast_food_dining' ? [
                        { value: "Never", label: "Never" },
                        { value: "Once a month", label: "Once a month" },
                        { value: "Once a week", label: "Once a week" },
                        { value: "Multiple times a week", label: "Multiple times a week" },
                        { value: "Daily", label: "Daily" }
                    ] : [
                        { value: "$0 - $50", label: "$0 - $50" },
                        { value: "$51 - $100", label: "$51 - $100" },
                        { value: "$101 - $200", label: "$101 - $200" },
                        { value: "$201 - $300", label: "$201 - $300" },
                        { value: "$301+", label: "$301+" }
                    ]}
                    required={true}
                />
            ))}
        </FormWrapper>
    );
};

export default ConsumerBehaviorPage;