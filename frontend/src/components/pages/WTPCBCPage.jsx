import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CBCQuestion from '../questions/CBCQuestion';

const WTPCBCPage = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const inputRefs = useRef({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const respondentId = 2;
                const response = await axios.get(`http://127.0.0.1:8000/api/cbc-wtp-questions?respondent_id=${respondentId}`);
                console.log('Fetched questions:', response.data);
                
                if (Array.isArray(response.data.data)) {
                    setQuestions(response.data.data);
                } else {
                    console.error("Fetched data is not an array:", response.data.data);
                }
            } catch (error) {
                console.error("Error fetching CBC questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const WTPCBCQuestions = questions
            .filter(question => responses[question.question_id] === question.profile_id)
            .reduce((acc, question) => {
                acc[`question_${question.question_id}`] = {
                    question_name: `question_${question.question_id}`,
                    question_text: 1,
                    required: true,
                    alternative: question.alternative_id,
                    profile: question.profile_id
                };
                return acc;
            }, {});

        try {
            console.log('Payload being sent:', WTPCBCQuestions);
            const response = await axios.post('http://127.0.0.1:8000/api/cbc-wtp-questions', WTPCBCQuestions);
            console.log(response.data);
        } catch (error) {
            console.error("Error posting consumer behavior questions:", error);
        }
    };

    const groupedQuestions = Array.isArray(questions) ? questions.reduce((acc, question) => {
        const { question_id, profile_id } = question;
        if (!acc[question_id]) {
            acc[question_id] = { ...question, options: [] };
        }
        acc[question_id].options.push({ value: profile_id, label: profile_id });
        return acc;
    }, {}) : {};

    const handleChange = (questionId, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.values(groupedQuestions).map(question => (
                <CBCQuestion 
                    key={question.question_id}
                    ref={inputRefs.current[`question_${question.question_id}`]}
                    id={`question_${question.question_id}`}
                    label={`Question ${question.question_id}`}
                    selectedValue={responses[question.question_id]}
                    onChange={(value) => handleChange(question.question_id, value)}
                    options={question.options}
                    required={true}
                />
            ))}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default WTPCBCPage;
