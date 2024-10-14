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

  const [currentPage, setCurrentPage] = useState(0);


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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex h-screen">
      <div className="w-5/12 border-r-4 border-black">
        <h2>Navigation</h2>
      </div>
      <div className="grid w-7/12 content-center justify-items-center"> 
        {currentPage === 1 && (
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
          onSubmit={handleNextPage}
        />
        )}

        {/* AHP Page with Questions */}
        {currentPage === 0 && (
        <AHPPage criteriaList={[
          // ... existing criteria ...
        ]} 
        onSubmit={handleNextPage}
        />
        )}

        {/* Add ConsumerBehaviorPage component here */}
        {currentPage === 2 && (
        <ConsumerBehaviorPage 
          inputRefs={inputRefs} 
          frequency_of_fast_food_dining={frequency_of_fast_food_dining}
          monthly_spenditure_on_fast_food={monthly_spenditure_on_fast_food}
          setFrequencyOfFastFoodDining={setFrequencyOfFastFoodDining}
          setMonthlySpenditureOnFastFood={setMonthlySpenditureOnFastFood}
          onSubmit={handleNextPage}
        />
        )}

        {/* Competitor Rating Page */}
        {currentPage === 3 && (
        <RatingPage 
          inputRefs={inputRefs}
          taste={competitor_taste}
          atmosphere={competitor_atmosphere}
          prices={competitor_prices}
          setTaste={setCTaste}
          setAtmosphere={setCAtmosphere}
          setPrices={setCPrices}
          api={"/api/competitor-rating-questions"}
          onSubmit={handleNextPage}
        />
        )}

        {/* New Brand Rating Page */}
        {currentPage === 4 && (
        <RatingPage 
          inputRefs={inputRefs}
          taste={nb_taste}
          atmosphere={nb_atmosphere}
          prices={nb_prices}
          setTaste={setNTaste}
          setAtmosphere={setNAtmosphere}
          setPrices={setNPrices}
          api={"/api/newbrand-rating-questions"}
          onSubmit={handleNextPage}
        />
        )}

        {/* Market Awareness Page */}
        {currentPage === 5 && (
        <MarketAwarenessPage 
          inputRefs={inputRefs}
          recognizedCompetitors={recognizedCompetitors}
          setRecognizedCompetitors={setRecognizedCompetitors}
          onSubmit={handleNextPage}
        />
        )}

        {currentPage === 6 && (
        <GuessPricesPage
          inputRefs={inputRefs}
          burger={burger}
          burger_premium={burger_premium}
          bundle={bundle}
          setBurger={setBurger}
          setBurgerPremium={setBurgerPremium}
          setBundle={setBundle}
          onSubmit={handleNextPage}
        />
        )}

        {currentPage === 7 && (
        <WTPDirectPage 
          inputRefs={inputRefs}
          burger_wtp={burger_wtp}
          burger_premium_wtp={burger_premium_wtp}
          bundle_wtp={bundle_wtp}
          setBurgerWTP={setBurgerWTP}
          setBurgerPremiumWTP={setBurgerPremiumWTP}
          setBundleWTP={setBundleWTP}
          onSubmit={handleNextPage}
        />
        )}

        {/* <WTPCBCPage 
          inputRefs={inputRefs}
        /> */}
      </div>
    </div>
  );
}

export default App;