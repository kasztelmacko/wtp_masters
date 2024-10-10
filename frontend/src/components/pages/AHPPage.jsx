import React, { useRef } from 'react';
import axios from 'axios';
import AHPQuestion from '../questions/AHPQuestion';

const AHPPage = () => {
  const questionRefs = useRef({
    "brand_recognition_vs_brand_recall": React.createRef(),
    "brand_recognition_vs_brand_past_purchase_or_use": React.createRef(),
    "brand_recognition_vs_emotional_perception_of_the_brand": React.createRef(),
    "brand_recognition_vs_logo": React.createRef(),
    "brand_recognition_vs_utilitarian_benefits": React.createRef(),
    "brand_recall_vs_brand_past_purchase_or_use": React.createRef(),
    "brand_recall_vs_emotional_perception_of_the_brand": React.createRef(),
    "brand_recall_vs_logo": React.createRef(),
    "brand_recall_vs_utilitarian_benefits": React.createRef(),
    "brand_past_purchase_or_use_vs_emotional_perception_of_the_brand": React.createRef(),
    "brand_past_purchase_or_use_vs_logo": React.createRef(),
    "brand_past_purchase_or_use_vs_utilitarian_benefits": React.createRef(),
    "emotional_perception_of_the_brand_vs_logo": React.createRef(),
    "emotional_perception_of_the_brand_vs_utilitarian_benefits": React.createRef(),
  });

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
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionData = questions.reduce((acc, { id, criteria }) => {
      acc[id] = {
        choices: ['1/7', '1/5', '1/3', '1', '3', '5', '7'],
        criteria,
        question_name: id,
        question_text: questionRefs.current[id].current.value,
        required: true,
      };
      return acc;
    }, {});

    try {
      console.log('Payload being sent:', questionData);
      const response = await axios.post('http://127.0.0.1:8000/api/ahp-questions', questionData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending questions:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map(({ id, criteria }) => (
        <AHPQuestion key={id} ref={questionRefs.current[id]} criteria={criteria} id={id} />
      ))}
      <button type="submit" className="btn btn-primary">Submit All</button>
    </form>
  );
};

export default AHPPage;