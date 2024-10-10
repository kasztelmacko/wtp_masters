import { render, screen } from '@testing-library/react';
import App from './App';
import React, { useState, useRef } from 'react';
import axios from 'axios';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [geolocation, setGeolocation] = useState('');
  const [ahpMatrix, setAhpMatrix] = useState({});
  const [criteria] = useState([
    "Brand recognition",
    "Brand recall",
    "Brand past purchase or use",
    "Emotional perception of the brand",
    "Logo",
    "Utilitarian benefits"
  ]);
  const [submittedData, setSubmittedData] = useState(null);
  const [submittedAHPData, setSubmittedAHPData] = useState(null);

  const inputRefs = {
    age: useRef(null),
    gender: useRef(null),
    income: useRef(null),
    geolocation: useRef(null),
    ahp: useRef(null)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const demographicQuestions = {
      age: {
        question_name: inputRefs.age.current.id,
        required: inputRefs.age.current.required,
        question_text: parseFloat(age),
        input_type: inputRefs.age.current.type
      },
      gender: {
        question_name: inputRefs.gender.current.id,
        question_text: gender,
        required: inputRefs.gender.current.required,
        choices: ["male", "female", "other"],
      },
      income: {
        question_name: inputRefs.income.current.id,
        question_text: income,
        required: inputRefs.income.current.required,
        choices: ["under_20k", "20k_50k", "50k_100k", "over_100k"],
      },
      geolocation: {
        question_name: inputRefs.geolocation.current.id,
        question_text: geolocation,
        required: inputRefs.geolocation.current.required,
        choices: ["north_america", "south_america", "europe", "asia", "africa", "oceania"],
      }
    };

    setSubmittedData(demographicQuestions);

    try {
      console.log('Payload being sent:', demographicQuestions);
      const response = await axios.post('http://127.0.0.1:8000/api/demographic-question', demographicQuestions);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  const handleAHPSubmit = async (event) => {
    event.preventDefault();

    const ahpData = {
      question_name: inputRefs.ahp.current.id,
      required: inputRefs.ahp.current.required,
      matrix: ahpMatrix,
      criteria: criteria
    };

    setSubmittedAHPData(ahpData);

    try {
      console.log('AHP Payload being sent:', ahpData);
      const response = await axios.post('http://127.0.0.1:8000/api/ahp-question', ahpData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending AHP data:', error);
    }
  };

  const handleMatrixChange = (i, j, value) => {
    const reciprocal = (1 / value).toFixed(2);

    setAhpMatrix(prevState => ({
      ...prevState,
      [`${i}-${j}`]: value,
      [`${j}-${i}`]: reciprocal
    }));
  };

  return (
    <div>
      <h1>FastAPI + React</h1>
      <form onSubmit={handleSubmit}>
        {/* Age Input */}
        <label htmlFor="age">Age:</label>
        <input 
          ref={inputRefs.age}
          id="age"
          type="number" 
          required
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        
        {/* Gender Input as Select */}
        <div>
          <label htmlFor="gender">Gender:</label>
          <select ref={inputRefs.gender} id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Income Input */}
        <div>
          <label>Income:</label>
          <select ref={inputRefs.income} id="income" value={income} onChange={(e) => setIncome(e.target.value)} required>
            <option value="">Select your income range</option>
            <option value="under_20k">Under $20,000</option>
            <option value="20k_50k">$20,000 - $50,000</option>
            <option value="50k_100k">$50,000 - $100,000</option>
            <option value="over_100k">Over $100,000</option>
          </select>
        </div>

        {/* Geolocation Input */}
        <div>
          <label>Geolocation:</label>
          <select ref={inputRefs.geolocation} id="geolocation" value={geolocation} onChange={(e) => setGeolocation(e.target.value)} required>
            <option value="">Select your location</option>
            <option value="north_america">North America</option>
            <option value="south_america">South America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h2>Submitted Input Questions:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}

      <form onSubmit={handleAHPSubmit}>
        <h2>AHP Matrix</h2>
        <table border="1">
          <thead>
            <tr>
              <th></th>
              {criteria.map((crit, index) => (
                <th key={`col-${index}`}>{crit}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((crit1, i) => (
              <tr key={`row-${i}`}>
                <td>{crit1}</td>
                {criteria.map((crit2, j) => (
                  <td key={`${i}-${j}`}>
                    {i === j ? (
                      "-"
                    ) : (
                      <select
                        id={`ahp-${i}-${j}`}
                        value={ahpMatrix[`${i}-${j}`] || ''}
                        onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        {[...Array(9).keys()].map(k => (
                          <option key={k + 1} value={(k + 1).toFixed(2)}>{(k + 1).toFixed(2)}</option>
                        ))}
                        {[...Array(9).keys()].map(k => (
                          <option key={`1/${k + 1}`} value={(1 / (k + 1)).toFixed(2)}>{(1 / (k + 1)).toFixed(2)}</option>
                        ))}
                      </select>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit AHP</button>
      </form>

      {submittedAHPData && (
        <div>
          <h2>Submitted AHP Data:</h2>
          <pre>{JSON.stringify(submittedAHPData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;