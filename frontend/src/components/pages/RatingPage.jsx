import React from 'react';
import axios from 'axios';
import OpinionScaleQuestion from '../questions/OpinionScaleQuestion';

const RatingPage = ({ inputRefs, taste, atmosphere, prices, setTaste, setAtmosphere, setPrices, api, onSubmit }) => {
    const min_value = 0
    const max_value = 4
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit();

        const RatingQuestions = {
            taste: {
                question_name: inputRefs.taste.current.id,
                question_text: parseFloat(taste),
                required: inputRefs.taste.current.required,
                min_value: min_value,
                max_value: max_value,
            },
            atmosphere: {
                question_name: inputRefs.atmosphere.current.id,
                question_text: parseFloat(atmosphere),
                required: inputRefs.atmosphere.current.required,
                min_value: min_value,
                max_value: max_value,
            },
            prices: {
                question_name: inputRefs.prices.current.id,
                question_text: parseFloat(prices),
                required: inputRefs.prices.current.required,
                min_value: min_value,
                max_value: max_value,
            },
        };

        try {
            console.log('Payload being sent:', RatingQuestions);
            const response = await axios.post('http://127.0.0.1:8000' + api, RatingQuestions);
            console.log(response.data);
        } catch (error) {
            console.error("Error posting consumer behavior questions:", error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <OpinionScaleQuestion
                    ref={inputRefs.taste}
                    id="taste"
                    value={taste}
                    onChange={(e) => setTaste(e.target.value)}
                    required
                    min_value={min_value}
                    max_value={max_value}
                />
                <OpinionScaleQuestion
                    ref={inputRefs.atmosphere}
                    id="atmosphere"
                    value={atmosphere}
                    onChange={(e) => setAtmosphere(e.target.value)}
                    required
                    min_value={min_value}
                    max_value={max_value}
                />
                <OpinionScaleQuestion
                    ref={inputRefs.prices}
                    id="prices"
                    value={prices}
                    onChange={(e) => setPrices(e.target.value)}
                    required
                    min_value={min_value}
                    max_value={max_value}
                />
                <button type="submit" className="btn btn-primary">Submit Ratings</button>
            </form>
        </div>
    );
};

export default RatingPage;