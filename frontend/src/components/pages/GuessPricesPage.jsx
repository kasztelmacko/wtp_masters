import React from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';

const GuessPricesPage = ({ inputRefs, burger, burger_premium, bundle, setBurger, setBurgerPremium, setBundle, onSubmit }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit();

        const GuessPricesQuestions = {
            burger: {
                input_type: inputRefs.burger.current.type,
                question_name: inputRefs.burger.current.id,
                required: inputRefs.burger.current.required,
                question_text: parseFloat(burger),
            },
            burger_premium: {
                input_type: inputRefs.burger_premium.current.type,
                question_name: inputRefs.burger_premium.current.id,
                required: inputRefs.burger_premium.current.required,
                question_text: parseFloat(burger_premium),
            },
            bundle: {
                input_type: inputRefs.bundle.current.type,
                question_name: inputRefs.bundle.current.id,
                required: inputRefs.bundle.current.required,
                question_text: parseFloat(bundle),
            }
        };

        try {
            console.log('Payload being sent:', GuessPricesQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/guess-prices-questions', GuessPricesQuestions);
          } catch (error) {
            console.error('Error sending question:', error);
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputQuestion
                    ref={inputRefs.burger}
                    id="burger"
                    label="Burger"
                    type="number"
                    required={true}
                    value={burger}
                    onChange={(e) => setBurger(e.target.value)}
                />  
                <InputQuestion
                    ref={inputRefs.burger_premium}
                    id="burger_premium"
                    label="Burger_premium"
                    type="number"
                    required={true}
                    value={burger_premium}
                    onChange={(e) => setBurgerPremium(e.target.value)}
                />  
                <InputQuestion
                    ref={inputRefs.bundle}
                    id="bundle"
                    label="Bundle"
                    type="number"
                    required={true}
                    value={bundle}
                    onChange={(e) => setBundle(e.target.value)}
                />  
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default GuessPricesPage;