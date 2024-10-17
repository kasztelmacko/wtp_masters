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
            label: "How often do you eat fast food?",
        },
        {
            id: 'monthly_spenditure_on_fast_food',
            value: monthly_spenditure_on_fast_food,
            setValue: setMonthlySpenditureOnFastFood,
            label: "How much do you spend on fast food monthly?",
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
        <FormWrapper onSubmit={handleSubmit} isLastPage={true}>
            <div className="flex justify-between">
                {questions.map(({ id, value, setValue, label }) => (
                    <div key={id} className="flex-1 mx-2">
                        <label htmlFor={id} className="block mb-2 min-h-12">{label}</label>
                        <SingleChoiceQuestion 
                            ref={inputRefs[id]}
                            id={id}
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
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

export default ConsumerBehaviorPage;