import React from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';

const WTPDirectPage = ({ inputRefs, burger_wtp, burger_premium_wtp, bundle_wtp, setBurgerWTP, setBurgerPremiumWTP, setBundleWTP, onSubmit }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit();

        const WTPDirectQuestions = {
            burger_wtp: {
                input_type: inputRefs.burger_wtp.current.type,
                question_name: inputRefs.burger_wtp.current.id,
                required: inputRefs.burger_wtp.current.required,
                question_text: parseFloat(burger_wtp),
            },
            burger_premium_wtp: {
                input_type: inputRefs.burger_premium_wtp.current.type,
                question_name: inputRefs.burger_premium_wtp.current.id,
                required: inputRefs.burger_premium_wtp.current.required,
                question_text: parseFloat(burger_premium_wtp),
            },
            bundle_wtp: {
                input_type: inputRefs.bundle_wtp.current.type,
                question_name: inputRefs.bundle_wtp.current.id,
                required: inputRefs.bundle_wtp.current.required,
                question_text: parseFloat(bundle_wtp),
            }
        };

        try {
            console.log('Payload being sent:', WTPDirectQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/direct-wtp-questions', WTPDirectQuestions);
          } catch (error) {
            console.error('Error sending question:', error);
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                What is the maximum amount you would be willing to pay for this
                <InputQuestion
                    ref={inputRefs.burger_wtp}
                    id="burger_wtp"
                    label="Burger_wtp"
                    type="number"
                    required={true}
                    value={burger_wtp}
                    onChange={(e) => setBurgerWTP(e.target.value)}
                />  
                </div>
                <div>
                What is the maximum amount you would be willing to pay for this
                <InputQuestion
                    ref={inputRefs.burger_premium_wtp}
                    id="burger_premium_wtp"
                    label="Burger_premium_wtp"
                    type="number"
                    required={true}
                    value={burger_premium_wtp}
                    onChange={(e) => setBurgerPremiumWTP(e.target.value)}
                />  
                </div>
                <div>
                What is the maximum amount you would be willing to pay for this
                <InputQuestion
                    ref={inputRefs.bundle_wtp}
                    id="bundle_wtp"
                    label="Bundle_wtp"
                    type="number"
                    required={true}
                    value={bundle_wtp}
                    onChange={(e) => setBundleWTP(e.target.value)}
                />  
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default WTPDirectPage;