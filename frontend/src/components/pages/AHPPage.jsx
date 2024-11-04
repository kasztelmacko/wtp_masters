import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import AHPQuestion from '../questions/AHPQuestion';
import FormWrapper from '../FormWrapper';

const AHPPage = ({ onSubmit, responderId }) => {
  const initialQuestions = [
    { id: "brand_recognition_vs_brand_recall", criteria: ["Brand Recognition", "Brand Recall"], sentence: ["Recognizing brand logo/slogan", "Recalling the brand without any cues"] },
    { id: "brand_recognition_vs_brand_past_purchase_or_use", criteria: ["Brand Recognition", "Brand Past Purchase or Use"], sentence: ["Recognizing brand logo/slogan", "Previous experience with the brand"] },
    { id: "brand_recognition_vs_emotional_perception_of_the_brand", criteria: ["Brand Recognition", "Emotional Perception of the Brand"], sentence: ["Recognizing brand logo/slogan", "How the brand makes you feel"] },
    { id: "brand_recognition_vs_logo", criteria: ["Brand Recognition", "Logo"], sentence: ["Recognizing brand logo/slogan", "Eye catching logo"] },
    { id: "brand_recognition_vs_utilitarian_benefits", criteria: ["Brand Recognition", "Utilitarian Benefits"], sentence: ["Recognizing brand logo/slogan", "Benefits from this product"] },
    { id: "brand_recall_vs_brand_past_purchase_or_use", criteria: ["Brand Recall", "Brand Past Purchase or Use"], sentence: ["Recalling the brand without any cues", "Previous experience with the brand"] },
    { id: "brand_recall_vs_emotional_perception_of_the_brand", criteria: ["Brand Recall", "Emotional Perception of the Brand"], sentence: ["Recalling the brand without any cues", "How the brand makes you feel"] },
    { id: "brand_recall_vs_logo", criteria: ["Brand Recall", "Logo"], sentence: ["Recalling the brand without any cues", "Eye catching logo"] },
    { id: "brand_recall_vs_utilitarian_benefits", criteria: ["Brand Recall", "Utilitarian Benefits"], sentence: ["Recalling the brand without any cues", "Benefits from this product"] },
    { id: "brand_past_purchase_or_use_vs_emotional_perception_of_the_brand", criteria: ["Brand Past Purchase or Use", "Emotional Perception of the Brand"], sentence: ["Previous experience with the brand", "How the brand makes you feel"] },
    { id: "brand_past_purchase_or_use_vs_logo", criteria: ["Brand Past Purchase or Use", "Logo"], sentence: ["Previous experience with the brand", "Eye catching logo"] },
    { id: "brand_past_purchase_or_use_vs_utilitarian_benefits", criteria: ["Brand Past Purchase or Use", "Utilitarian Benefits"], sentence: ["Previous experience with the brand", "Benefits from this product"] },
    { id: "emotional_perception_of_the_brand_vs_logo", criteria: ["Emotional Perception of the Brand", "Logo"], sentence: ["How the brand makes you feel", "Eye catching logo"] },
    { id: "emotional_perception_of_the_brand_vs_utilitarian_benefits", criteria: ["Emotional Perception of the Brand", "Utilitarian Benefits"], sentence: ["How the brand makes you feel", "Benefits from this product"] },
    { id: "logo_vs_utilitarian_benefits", criteria: ["Logo", "Utilitarian Benefits"], sentence: ["Eye catching logo", "Benefits from this product"] }
  ];

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const [questions, setQuestions] = useState([]);
  const questionRefs = useRef({});

  useEffect(() => {
    const shuffledQuestions = shuffleArray(initialQuestions);
    setQuestions(shuffledQuestions);
    questionRefs.current = shuffledQuestions.reduce((acc, question) => {
      acc[question.id] = React.createRef();
      return acc;
    }, {});
  }, []);

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
      console.log(finalAnswers)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ahp-questions`, { responder_id: responderId, ...finalAnswers });
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
            sentence={question.sentence}
            id={question.id}
            required={true}
          />
        )
      ))}
    </FormWrapper>
  );
};

export default AHPPage;
