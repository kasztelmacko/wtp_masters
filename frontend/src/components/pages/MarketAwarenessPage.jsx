import React from 'react';
import axios from 'axios';
import MultipleChoiceQuestion from '../questions/MultipleChoiceQuestion';
import FormWrapper from '../FormWrapper';

const MarketAwarenessPage = ({ inputRefs, recognizedCompetitors = [], setRecognizedCompetitors, onSubmit }) => {
    const handleSubmit = async () => {
        onSubmit();

        const MarketAwarenessQuestions = {
            recognized_competitors: {
                question_name: inputRefs.recognized_competitors.current.id,
                question_text: recognizedCompetitors,
                required: inputRefs.recognized_competitors.current.required,
                choices: Array.from(inputRefs.recognized_competitors.current.options)
                    .map(option => option.value)
                    .filter(value => value !== ''),
            }
        };

        try {
            console.log('Payload being sent:', MarketAwarenessQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/market-awareness-questions', MarketAwarenessQuestions);
            console.log(response.data);
        } catch (error) {
            console.error("Error posting market awareness questions:", error);
        }
    }

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <MultipleChoiceQuestion 
                ref={inputRefs.recognized_competitors}
                id="recognized_competitors"
                label="Recognized Competitors"
                selectedValues={recognizedCompetitors}
                onChange={setRecognizedCompetitors}
                options={[
                    { value: "McDonald's", label: "McDonald's" },
                    { value: "Burger King", label: "Burger King" },
                    { value: "Subway", label: "Subway" },
                    { value: "Taco Bell", label: "Taco Bell" },
                    { value: "KFC", label: "KFC" },
                    { value: "Wendy's", label: "Wendy's" },
                    { value: "Dunkin'", label: "Dunkin'" },
                    { value: "Shake Shack", label: "Shake Shack" },
                    { value: "Chick-fil-A", label: "Chick-fil-A" },
                    { value: "Five Guys", label: "Five Guys" },
                    { value: "In-N-Out Burger", label: "In-N-Out Burger" },
                    { value: "Popeyes", label: "Popeyes" },
                    { value: "Carl's Jr.", label: "Carl's Jr." },
                    { value: "Arby's", label: "Arby's" }
                ]}
                required={false}
            />
        </FormWrapper>
    );
}

export default MarketAwarenessPage;