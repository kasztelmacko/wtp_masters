import React from 'react';
import axios from 'axios';
import OpinionScaleQuestion from '../questions/OpinionScaleQuestion';
import FormWrapper from '../FormWrapper';

const RatingPage = ({ inputRefs, taste, atmosphere, prices, setTaste, setAtmosphere, setPrices, api, onSubmit }) => {
    const min_value = 0;
    const max_value = 4;

    const handleSubmit = async () => {
        onSubmit();

        const questionsConfig = [
            {
                key: 'taste',
                question_name: inputRefs.taste.current.id,
                question_text: parseFloat(taste),
                required: inputRefs.taste.current.required,
                min_value: min_value,
                max_value: max_value,
            },
            {
                key: 'atmosphere',
                question_name: inputRefs.atmosphere.current.id,
                question_text: parseFloat(atmosphere),
                required: inputRefs.atmosphere.current.required,
                min_value: min_value,
                max_value: max_value,
            },
            {
                key: 'prices',
                question_name: inputRefs.prices.current.id,
                question_text: parseFloat(prices),
                required: inputRefs.prices.current.required,
                min_value: min_value,
                max_value: max_value,
            }
        ];

        const RatingQuestions = questionsConfig.reduce((acc, question) => {
            acc[question.key] = {
                question_name: question.question_name,
                question_text: question.question_text,
                required: question.required,
                min_value: question.min_value,
                max_value: question.max_value,
            };
            return acc;
        }, {});

        try {
            console.log('Payload being sent:', RatingQuestions);
            const response = await axios.post('http://127.0.0.1:8000' + api, RatingQuestions);
            console.log(response.data);
        } catch (error) {
            console.error("Error posting consumer behavior questions:", error);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit} isLastPage={true}>
            <div className="w-full flex flex-col items-center space-y-4">
                <div className="w-3/4">
                    <OpinionScaleQuestion
                        ref={inputRefs.taste}
                        id="taste"
                        label="How would you rate the food taste?"
                        value={taste}
                        onChange={(e) => setTaste(e.target.value)}
                        required
                        min_value={min_value}
                        max_value={max_value}
                    />
                </div>
                <div className="w-3/4">
                    <OpinionScaleQuestion
                        ref={inputRefs.atmosphere}
                        id="atmosphere"
                        label="How do you fell about the restaurant?"
                        value={atmosphere}
                        onChange={(e) => setAtmosphere(e.target.value)}
                        required
                        min_value={min_value}
                        max_value={max_value}
                    />
                </div>
                <div className="w-3/4">
                    <OpinionScaleQuestion
                        ref={inputRefs.prices}
                        id="prices"
                        label="What do you think about the price levels?"
                        value={prices}
                        onChange={(e) => setPrices(e.target.value)}
                        required
                        min_value={min_value}
                        max_value={max_value}
                    />
                </div>
            </div>
        </FormWrapper>
    );
};

export default RatingPage;
