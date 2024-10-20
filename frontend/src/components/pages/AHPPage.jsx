import React, { useRef, useState } from 'react';
import axios from 'axios';
import AHPQuestion from '../questions/AHPQuestion';
import FormWrapper from '../FormWrapper';

const AHPPage = ({ onSubmit, responderId }) => {
  const questions = [
    { id: "brand_recognition_vs_brand_recall", criteria: ["Brand Recognition", "Brand Recall"] },
    { id: "brand_recognition_vs_brand_past_purchase_or_use", criteria: ["Brand Recognition", "Brand Past Purchase or Use"] },
    { id: "brand_recognition_vs_emotional_perception_of_the_brand", criteria: ["Brand Recognition", "Emotional Perception of the Brand"] },
    { id: "brand_recognition_vs_logo", criteria: ["Brand Recognition", "Logo"] },
    { id: "brand_recognition_vs_utilitarian_benefits", criteria: ["Brand Recognition", "Utilitarian Benefits"] },
    { id: "brand_recall_vs_brand_past_purchase_or_use", criteria: ["Brand Recall", "Brand Past Purchase or Use"] },
    { id: "brand_recall_vs_emotional_perception_of_the_brand", criteria: ["Brand Recall", "Emotional Perception of the Brand"] },
    { id: "brand_recall_vs_logo", criteria: ["Brand Recall", "Logo"] },
    { id: "brand_recall_vs_utilitarian_benefits", criteria: ["Brand Recall", "Utilitarian Benefits"] },
    { id: "brand_past_purchase_or_use_vs_emotional_perception_of_the_brand", criteria: ["Brand Past Purchase or Use", "Emotional Perception of the Brand"] },
    { id: "brand_past_purchase_or_use_vs_logo", criteria: ["Brand Past Purchase or Use", "Logo"] },
    { id: "brand_past_purchase_or_use_vs_utilitarian_benefits", criteria: ["Brand Past Purchase or Use", "Utilitarian Benefits"] },
    { id: "emotional_perception_of_the_brand_vs_logo", criteria: ["Emotional Perception of the Brand", "Logo"] },
    { id: "emotional_perception_of_the_brand_vs_utilitarian_benefits", criteria: ["Emotional Perception of the Brand", "Utilitarian Benefits"] },
    { id: "logo_vs_utilitarian_benefits", criteria: ["Logo", "Utilitarian Benefits"] }
  ];

  const questionRefs = useRef(questions.reduce((acc, question) => {
    acc[question.id] = React.createRef(); 
    return acc;
  }, {}));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const saveCurrentAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const inputRef = questionRefs.current[currentQuestion.id];

    if (inputRef && inputRef.current) {
      const updatedAnswer = {
        choices: ['1/7', '1/5', '1/3', '1', '3', '5', '7'],
        criteria: currentQuestion.criteria,
        question_name: currentQuestion.id,
        question_text: inputRef.current.value,
        required: true,
      };

      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.id]: updatedAnswer,
      }));

      return { ...answers, [currentQuestion.id]: updatedAnswer };
    }
    return answers;
  };

  const nextPage = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const inputRef = questionRefs.current[currentQuestion.id];

    if (inputRef && inputRef.current && !inputRef.current.value) {
      alert('Please select an answer before proceeding.');
      return;
    }

    saveCurrentAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const finalAnswers = saveCurrentAnswer();

    try {
      console.log('Payload being sent:', { responder_id: responderId, ...finalAnswers }); // Include responderId
      const response = await axios.post('http://127.0.0.1:8000/api/ahp-questions', { responder_id: responderId, ...finalAnswers });
      console.log('Response from server:', response.data);
      onSubmit();
    } catch (error) {
      console.error('Error sending questions:', error);
    }
  };

  const isLastPage = currentQuestionIndex === questions.length - 1;

  return (
    <FormWrapper onSubmit={handleSubmit} onNext={nextPage} isLastPage={isLastPage}>
      {questions.map((question, index) => (
        currentQuestionIndex === index && (
          <AHPQuestion
            key={question.id}
            ref={questionRefs.current[question.id]}
            criteria={question.criteria}
            id={question.id}
            required={true}
          />
        )
      ))}
    </FormWrapper>
  );
};

export default AHPPage;
