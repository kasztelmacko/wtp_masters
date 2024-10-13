import React from 'react';
import axios from 'axios';
import SingleChoiceQuestion from '../questions/SingleChoiceQuestion';

const ConsumerBehaviorPage = ({ inputRefs, frequency_of_fast_food_dining, monthly_spenditure_on_fast_food, setFrequencyOfFastFoodDining, setMonthlySpenditureOnFastFood, onSubmit }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit();

        const ConsumerBehaviorQuestions = {
            frequency_of_fast_food_dining: {
                question_name: inputRefs.frequency_of_fast_food_dining.current.id,
                question_text: frequency_of_fast_food_dining,
                required: inputRefs.frequency_of_fast_food_dining.current.required,
                choices: Array.from(inputRefs.frequency_of_fast_food_dining.current.options)
                    .map(option => option.value)
                    .filter(value => value !== ''),
            },
            monthly_spenditure_on_fast_food: {
                question_name: inputRefs.monthly_spenditure_on_fast_food.current.id,
                question_text: monthly_spenditure_on_fast_food,
                required: inputRefs.monthly_spenditure_on_fast_food.current.required,
                choices: Array.from(inputRefs.monthly_spenditure_on_fast_food.current.options)
                    .map(option => option.value)
                    .filter(value => value !== ''),
            }
        };

        try {
            console.log('Payload being sent:', ConsumerBehaviorQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/consumer-behavior-questions', ConsumerBehaviorQuestions);
            console.log(response.data);
        } catch (error) {
            console.error("Error posting consumer behavior questions:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <SingleChoiceQuestion 
                ref={inputRefs.frequency_of_fast_food_dining}
                id="frequency_of_fast_food_dining"
                label="Frequency of Fast Food Dining"
                value={frequency_of_fast_food_dining}
                onChange={(e) => setFrequencyOfFastFoodDining(e.target.value)}
                options={[
                    { value: "Never", label: "Never" },
                    { value: "Once a month", label: "Once a month" },
                    { value: "Once a week", label: "Once a week" },
                    { value: "Multiple times a week", label: "Multiple times a week" },
                    { value: "Daily", label: "Daily" }
                ]}
                required={true}
            />
            <SingleChoiceQuestion 
                ref={inputRefs.monthly_spenditure_on_fast_food}
                id="monthly_spenditure_on_fast_food"
                label="Monthly Spenditure on Fast Food"
                value={monthly_spenditure_on_fast_food}
                onChange={(e) => setMonthlySpenditureOnFastFood(e.target.value)}
                options={[
                    { value: "$0 - $50", label: "$0 - $50" },
                    { value: "$51 - $100", label: "$51 - $100" },
                    { value: "$101 - $200", label: "$101 - $200" },
                    { value: "$201 - $300", label: "$201 - $300" },
                    { value: "$301+", label: "$301+" }
                ]}
                required={true}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ConsumerBehaviorPage;