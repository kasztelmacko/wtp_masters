import React from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';
import SingleChoiceQuestion from '../questions/SingleChoiceQuestion';
import FormWrapper from '../FormWrapper';

const DemographicPage = ({ inputRefs, age, gender, income, geolocation, frequency_of_fast_food_dining, monthly_spenditure_on_fast_food, setAge, setGender, setIncome, setGeolocation, setFrequencyOfFastFoodDining, setMonthlySpenditureOnFastFood, onSubmit }) => {
  const handleSubmit = async () => {
    onSubmit(); 

    const questionsConfig = [
      {
        key: 'age',
        input_type: inputRefs.age.current.type,
        question_name: inputRefs.age.current.id,
        required: inputRefs.age.current.required,
        question_text: parseFloat(age),
      },
      {
        key: 'gender',
        question_name: inputRefs.gender.current.id,
        question_text: gender,
        required: inputRefs.gender.current.required,
        choices: Array.from(inputRefs.gender.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      },
      {
        key: 'income',
        question_name: inputRefs.income.current.id,
        question_text: income,
        required: inputRefs.income.current.required,
        choices: Array.from(inputRefs.income.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      },
      {
        key: 'geolocation',
        question_name: inputRefs.geolocation.current.id,
        question_text: geolocation,
        required: inputRefs.geolocation.current.required,
        choices: Array.from(inputRefs.geolocation.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      },
      {
        key: 'frequency_of_fast_food_dining',
        question_name: inputRefs.frequency_of_fast_food_dining.current.id,
        question_text: frequency_of_fast_food_dining,
        required: inputRefs.frequency_of_fast_food_dining.current.required,
        choices: Array.from(inputRefs.frequency_of_fast_food_dining.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      },
      {
        key: 'monthly_spenditure_on_fast_food',
        question_name: inputRefs.monthly_spenditure_on_fast_food.current.id,
        question_text: monthly_spenditure_on_fast_food,
        required: inputRefs.monthly_spenditure_on_fast_food.current.required,
        choices: Array.from(inputRefs.monthly_spenditure_on_fast_food.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      }
    ];

    const inputQuestions = questionsConfig.reduce((acc, question) => {
      acc[question.key] = {
        input_type: question.input_type,
        question_name: question.question_name,
        required: question.required,
        question_text: question.question_text,
        choices: question.choices,
      };
      return acc;
    }, {});

    try {
      console.log('Payload being sent:', inputQuestions);
      const response = await axios.post('http://127.0.0.1:8000/api/demographic-questions', inputQuestions);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} isLastPage={true}>
      <div className="grid grid-cols-2 gap-4">
        {/* Age Input */}
        <div className="w-full p-2">
          <InputQuestion
            ref={inputRefs.age}
            id="age"
            label="How old are you?"
            type="number"
            required={true}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="age"
          />
        </div>
        {/* Gender Input as Select */}
        <div className="w-full p-2">
          <SingleChoiceQuestion
            ref={inputRefs.gender}
            id="gender"
            label="What's your gender?"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            required={true}
          />
        </div>
        {/* Income Input */}
        <div className="w-full p-2">
          <SingleChoiceQuestion
            ref={inputRefs.income}
            id="income"
            label="What' s your income?"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            options={[
              { value: 'under_20k', label: 'Under $20,000' },
              { value: '20k_50k', label: '$20,000 - $50,000' },
              { value: '50k_100k', label: '$50,000 - $100,000' },
              { value: 'over_100k', label: 'Over $100,000' },
            ]}
            required={true}
          />
        </div>
        {/* Geolocation Input */}
        <div className="w-full p-2">
          <SingleChoiceQuestion
            ref={inputRefs.geolocation}
            id="geolocation"
            label="Where do you live?"
            value={geolocation}
            onChange={(e) => setGeolocation(e.target.value)}
            options={[
              { value: 'village', label: 'Village' },
              { value: 'small_town', label: 'Small Town' },
              { value: 'big_town', label: 'Big Town' }
            ]}
            required={true}
          />
        </div>
        <div className="w-full p-2">
          <SingleChoiceQuestion
            ref={inputRefs.frequency_of_fast_food_dining}
            id="frequency_of_fast_food_dining"
            label="How often do you eat fast food?"
            value={frequency_of_fast_food_dining}
            onChange={(e) => setFrequencyOfFastFoodDining(e.target.value)}
            options={[
              { value: "Never", label: "Never" },
              { value: "Once a month", label: "Once a month" },
              { value: "Once a week", label: "Once a week" },
              { value: "Multiple times a week", label: "Multiple times a week" },
              { value: "Daily", label: "Daily" }
            ]}
            required={true}
          />
        </div>
        {/* Monthly Spenditure on Fast Food Input */}
        <div className="w-full p-2">
          <SingleChoiceQuestion
            ref={inputRefs.monthly_spenditure_on_fast_food}
            id="monthly_spenditure_on_fast_food"
            label="How much do you spend on fast food monthly?"
            value={monthly_spenditure_on_fast_food}
            onChange={(e) => setMonthlySpenditureOnFastFood(e.target.value)}
            options={[
              { value: "$0 - $50", label: "$0 - $50" },
              { value: "$51 - $100", label: "$51 - $100" },
              { value: "$101 - $200", label: "$101 - $200" },
              { value: "$201 - $300", label: "$201 - $300" },
              { value: "$301+", label: "$301+" }
            ]}
            required={true}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default DemographicPage;