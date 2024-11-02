import React, { useState, useRef } from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';
import FormWrapper from '../FormWrapper';

const MarketAwarenessPage = ({ recognizedCompetitors = [], setRecognizedCompetitors, responderId, onSubmit }) => {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addCompetitor = () => {
        if (inputValue.trim() !== '') {
            setRecognizedCompetitors([...recognizedCompetitors, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleSubmit = async () => {
        onSubmit();

        // Preparing the payload
        const MarketAwarenessQuestions = {
            input_type: inputRef.current.type,
            question_name: inputRef.current.id,
            question_text: recognizedCompetitors.join(','),
            required: inputRef.current.required,
            choices: [],
        };

        const payload = {
            responder_id: responderId,
            recognized_competitors: MarketAwarenessQuestions,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/market-awareness-questions', payload, {
                withCredentials: true
            });

        } catch (error) {
            console.error("Error posting market awareness questions:", error);
            console.error("Response data:", error.response?.data);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit} isLastPage={true}>
            <div className="flex flex-col h-full">
                {recognizedCompetitors.length > 0 && (
                    <ul className="list-disc pl-5 my-4 space-y-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                        {recognizedCompetitors.map((competitor, index) => (
                            <li key={index} className="badge badge-outline text-gray-700 w-4/5">{competitor}</li>
                        ))}
                    </ul>
                )}
                <div className="mt-8 grid grid-cols-5 gap-4 content-end">
                    <div className="col-span-4">
                        <InputQuestion
                            ref={inputRef}
                            id="recognized_competitors"
                            label="Which fast food brands do you recognize?"
                            value={inputValue}
                            onChange={handleInputChange}
                            type="text"
                            required={false}
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-1 self-end">
                        <button type="button" onClick={addCompetitor} className='btn btn-success w-full'>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </FormWrapper>
    );
};

export default MarketAwarenessPage;