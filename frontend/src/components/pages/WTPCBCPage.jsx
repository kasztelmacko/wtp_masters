import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CBCQuestion from '../questions/CBCQuestion';
import FormWrapper from '../FormWrapper';

const WTPCBCPage = ({ onSubmit, responderId }) => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const inputRefs = useRef({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cbc-wtp-questions?respondent_id=${responderId}`);

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
    }, [responderId]);

    const handleSubmit = async () => {
        const WTPCBCQuestions = questions
            .filter(question => responses[question.question_id] === question.profile_id)
            .reduce((acc, question) => {
                acc[`question_${question.question_id}`] = {
                    question_name: `question_${question.question_id}`,
                    question_id: question.question_id,
                    question_text: 1,
                    required: true,
                    alternative: question.alternative_id,
                    profile: question.profile_id,
                    responder_id: responderId
                };
                return acc;
            }, {});

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cbc-wtp-questions`, {WTPCBCQuestions, responder_id: responderId});
            onSubmit();
        } catch (error) {
            console.error("Error posting consumer behavior questions:", error);
        }
    };

    const handleChange = (questionId, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: value,
        }));
    };

    const nextPage = () => {
        const currentQuestion = Object.values(groupedQuestions)[currentPage];
        if (currentQuestion) {
            const selectedValue = responses[currentQuestion[0].question_id];
            if (selectedValue === undefined) {
                alert('Please select an answer before proceeding.');
                return;
            }
        }

        if (currentPage < Object.keys(groupedQuestions).length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.question_id]) {
            acc[question.question_id] = [];
        }
        acc[question.question_id].push(question);
        return acc;
    }, {});

    const currentQuestion = Object.values(groupedQuestions)[currentPage];

    const currentQuestionOptions = currentQuestion?.map(q => ({
        value: q.profile_id,
        img_url: q.img_url,
        item_name: q.item_name,
        item_description: q.item_description,
        price: q.price,
        calories: q.calories,
        portion_size: q.portion_size,
        no_choice: q.no_choice
    }));

    const isLastPage = currentPage === Object.keys(groupedQuestions).length - 1;

    return (
        <FormWrapper onSubmit={handleSubmit} onNext={nextPage} isLastPage={isLastPage}>
            {currentQuestion && (
                <CBCQuestion
                    ref={el => inputRefs.current[`question_${currentQuestion[0].question_id}`] = el}
                    id={`question_${currentQuestion[0].question_id}`}
                    label={`Question ${currentQuestion[0].question_id}`}
                    selectedValue={responses[currentQuestion[0].question_id]}
                    onChange={(value) => handleChange(currentQuestion[0].question_id, value)}
                    options={currentQuestionOptions}
                    required={true}
                />
            )}
        </FormWrapper>
    );
};

export default WTPCBCPage;
