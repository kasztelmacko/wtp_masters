import React from 'react';
import axios from 'axios';
import InputQuestion from '../questions/InputQuestion';
import SingleChoiceQuestion from '../questions/SingleChoiceQuestion';

const DemographicPage = ({ inputRefs, age, gender, income, geolocation, setAge, setGender, setIncome, setGeolocation }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputQuestions = {
      age: {
        input_type: inputRefs.age.current.type,
        question_name: inputRefs.age.current.id,
        required: inputRefs.age.current.required,
        question_text: parseFloat(age),
      },
      gender: {
        question_name: inputRefs.gender.current.id,
        question_text: gender,
        required: inputRefs.gender.current.required,
        choices: Array.from(inputRefs.gender.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      },
      income: {
        question_name: inputRefs.income.current.id,
        question_text: income,
        required: inputRefs.income.current.required,
        choices: Array.from(inputRefs.income.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      },
      geolocation: {
        question_name: inputRefs.geolocation.current.id,
        question_text: geolocation,
        required: inputRefs.geolocation.current.required,
        choices: Array.from(inputRefs.geolocation.current.options)
          .map(option => option.value)
          .filter(value => value !== ''),
      }
    };

    try {
      console.log('Payload being sent:', inputQuestions);
      const response = await axios.post('http://127.0.0.1:8000/api/demographic-questions', inputQuestions);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Age Input */}
        <InputQuestion
          ref={inputRefs.age}
          id="age"
          label="Age"
          type="number"
          required={true}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Gender Input as Select */}
        <SingleChoiceQuestion
          ref={inputRefs.gender}
          id="gender"
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          required={true}
        />

        {/* Income Input */}
        <SingleChoiceQuestion
          ref={inputRefs.income}
          id="income"
          label="Income"
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

        {/* Geolocation Input */}
        <SingleChoiceQuestion
          ref={inputRefs.geolocation}
          id="geolocation"
          label="Geolocation"
          value={geolocation}
          onChange={(e) => setGeolocation(e.target.value)}
          options={[
            { value: 'north_america', label: 'North America' },
            { value: 'south_america', label: 'South America' },
            { value: 'europe', label: 'Europe' },
            { value: 'asia', label: 'Asia' },
            { value: 'africa', label: 'Africa' },
            { value: 'oceania', label: 'Oceania' },
          ]}
          required={true}
        />
      </div>
      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default DemographicPage;