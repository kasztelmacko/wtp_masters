import React, { useState, useRef } from 'react';
import AHPPage from './components/pages/AHPPage';
import DemographicPage from './components/pages/DemographicPage';
import ConsumerBehaviorPage from './components/pages/ConsumerBehaviorPage';
import RatingPage from './components/pages/RatingPage';
import MarketAwarenessPage from './components/pages/MarketAwarenessPage';
import GuessPricesPage from './components/pages/GuessPricesPage';
import WTPDirectPage from './components/pages/WTPDirectPage';
import WTPCBCPage from './components/pages/WTPCBCPage';

function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [geolocation, setGeolocation] = useState('');
  
  // New state for ConsumerBehaviorPage
  const [frequency_of_fast_food_dining, setFrequencyOfFastFoodDining] = useState('');
  const [monthly_spenditure_on_fast_food, setMonthlySpenditureOnFastFood] = useState('');

  // New state for CompetitorRatingPage
  const [competitor_taste, setCTaste] = useState(0);
  const [competitor_atmosphere, setCAtmosphere] = useState(0);
  const [competitor_prices, setCPrices] = useState(0);

  // New state for NewBrandRatingPage
  const [nb_taste, setNTaste] = useState(0);
  const [nb_atmosphere, setNAtmosphere] = useState(0);
  const [nb_prices, setNPrices] = useState(0);

  // New state for MarketAwarenessPage
  const [recognizedCompetitors, setRecognizedCompetitors] = useState([]);

  // New state for GuessPricesPage
  const [burger, setBurger] = useState(0);
  const [burger_premium, setBurgerPremium] = useState(0);
  const [bundle, setBundle] = useState(0);

  // New state for WTPDirectPage
  const [burger_wtp, setBurgerWTP] = useState(0);
  const [burger_premium_wtp, setBurgerPremiumWTP] = useState(0);
  const [bundle_wtp, setBundleWTP] = useState(0);


  const inputRefs = {
    age: useRef(null),
    gender: useRef(null),
    income: useRef(null),
    geolocation: useRef(null),
    frequency_of_fast_food_dining: useRef(null),
    monthly_spenditure_on_fast_food: useRef(null),

    taste: useRef(null),
    atmosphere: useRef(null),
    prices: useRef(null),

    recognized_competitors: useRef(null),

    burger: useRef(null),
    burger_premium: useRef(null),
    bundle: useRef(null),

    burger_wtp: useRef(null),
    burger_premium_wtp: useRef(null),
    bundle_wtp: useRef(null),

  };

  return (
    <div>
      <h1>FastAPI + React</h1>
      <DemographicPage 
        inputRefs={inputRefs} 
        age={age} 
        gender={gender} 
        income={income} 
        geolocation={geolocation} 
        setAge={setAge} 
        setGender={setGender} 
        setIncome={setIncome} 
        setGeolocation={setGeolocation} 
      />

      {/* AHP Page with Questions */}
      <AHPPage criteriaList={[
        // ... existing criteria ...
      ]} />

      {/* Add ConsumerBehaviorPage component here */}
      <ConsumerBehaviorPage 
        inputRefs={inputRefs} 
        frequency_of_fast_food_dining={frequency_of_fast_food_dining}
        monthly_spenditure_on_fast_food={monthly_spenditure_on_fast_food}
        setFrequencyOfFastFoodDining={setFrequencyOfFastFoodDining}
        setMonthlySpenditureOnFastFood={setMonthlySpenditureOnFastFood}
      />

      {/* Competitor Rating Page */}
      <RatingPage 
        inputRefs={inputRefs}
        taste={competitor_taste}
        atmosphere={competitor_atmosphere}
        prices={competitor_prices}
        setTaste={setCTaste}
        setAtmosphere={setCAtmosphere}
        setPrices={setCPrices}
        api={"/api/competitor-rating-questions"}
      />

      {/* New Brand Rating Page */}
      <RatingPage 
        inputRefs={inputRefs}
        taste={nb_taste}
        atmosphere={nb_atmosphere}
        prices={nb_prices}
        setTaste={setNTaste}
        setAtmosphere={setNAtmosphere}
        setPrices={setNPrices}
        api={"/api/newbrand-rating-questions"}
      />

      {/* Market Awareness Page */}
      <MarketAwarenessPage 
        inputRefs={inputRefs}
        recognizedCompetitors={recognizedCompetitors}
        setRecognizedCompetitors={setRecognizedCompetitors}
      />

      <GuessPricesPage
        inputRefs={inputRefs}
        burger={burger}
        burger_premium={burger_premium}
        bundle={bundle}
        setBurger={setBurger}
        setBurgerPremium={setBurgerPremium}
        setBundle={setBundle}
      />

      <WTPDirectPage 
        inputRefs={inputRefs}
        burger_wtp={burger_wtp}
        burger_premium_wtp={burger_premium_wtp}
        bundle_wtp={bundle_wtp}
        setBurgerWTP={setBurgerWTP}
        setBurgerPremiumWTP={setBurgerPremiumWTP}
        setBundleWTP={setBundleWTP}
      />

      <WTPCBCPage 
        inputRefs={inputRefs}
      />
    </div>
  );
}

export default App;