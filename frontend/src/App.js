import React, { useState, useRef, useEffect } from 'react';
import AHPPage from './components/pages/AHPPage';
import DemographicPage from './components/pages/DemographicPage';
import RatingPage from './components/pages/RatingPage';
import MarketAwarenessPage from './components/pages/MarketAwarenessPage';
import GuessPricesPage from './components/pages/GuessPricesPage';
import WTPDirectPage from './components/pages/WTPDirectPage';
import WTPCBCPage from './components/pages/WTPCBCPage';
import InfoPage from './components/InfoPage';
import axios from 'axios';

function App() {
  // New state for DemographicPage
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [geolocation, setGeolocation] = useState('');
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
  const [burger, setBurger] = useState("");
  const [burger_premium, setBurgerPremium] = useState("");
  const [bundle, setBundle] = useState("");

  // New state for WTPDirectPage
  const [burger_wtp, setBurgerWTP] = useState({ upperT: '', lowerT: '', upperB: '', lowerb: '', guess: '' });
  const [burger_premium_wtp, setBurgerPremiumWTP] = useState({ upperT: '', lowerT: '', upperB: '', lowerb: '', guess: '' });
  const [bundle_wtp, setBundleWTP] = useState({ upperT: '', lowerT: '', upperB: '', lowerb: '', guess: '' });

  const [currentPage, setCurrentPage] = useState(0);

  const [responderId, setResponderId] = useState(null);

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

    burger_wtp_UpperT: useRef(null),
    burger_wtp_LowerT: useRef(null),
    burger_wtp_upperB: useRef(null),
    burger_wtp_lowerb: useRef(null),
    burger_wtp_guess: useRef(null),

    burger_premium_wtp_UpperT: useRef(null),
    burger_premium_wtp_LowerT: useRef(null),
    burger_premium_wtp_upperB: useRef(null),
    burger_premium_wtp_lowerb: useRef(null),
    burger_premium_wtp_guess: useRef(null),

    bundle_wtp_UpperT: useRef(null),
    bundle_wtp_LowerT: useRef(null),
    bundle_wtp_upperB: useRef(null),
    bundle_wtp_lowerb: useRef(null),
    bundle_wtp_guess: useRef(null),

  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    if (currentPage === 10) {
      setCurrentPage(10);
    }
  };

  useEffect(() => {
    const fetchResponderId = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/assign-responder-id', { withCredentials: true });
            setResponderId(response.data.responder_id);
        } catch (error) {
            console.error("Error fetching responder ID:", error);
        }
    };

    fetchResponderId();
}, []);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-5/12 border-gray-700 border-b-2 lg:border-r-2 text-gray-700">
        <InfoPage currentPage={currentPage} />
      </div>
      <div className="w-full lg:w-7/12">
        {currentPage === 0 && (
        <DemographicPage 
          inputRefs={inputRefs} 
          age={age} 
          gender={gender} 
          income={income} 
          geolocation={geolocation} 
          frequency_of_fast_food_dining={frequency_of_fast_food_dining}
          monthly_spenditure_on_fast_food={monthly_spenditure_on_fast_food}
          setAge={setAge} 
          setGender={setGender} 
          setIncome={setIncome} 
          setGeolocation={setGeolocation} 
          setFrequencyOfFastFoodDining={setFrequencyOfFastFoodDining}
          setMonthlySpenditureOnFastFood={setMonthlySpenditureOnFastFood}
          responderId={responderId}
          onSubmit={handleNextPage}
        />
        )}

        {/* AHP Page with Questions */}
        {currentPage === 3 && (
        <AHPPage criteriaList={[
        ]} 
        onSubmit={handleNextPage}
        responderId={responderId}
        />
        )}

        {/* Competitor Rating Page */}
        {currentPage === 8 && (
        <RatingPage 
          inputRefs={inputRefs}
          taste={competitor_taste}
          atmosphere={competitor_atmosphere}
          prices={competitor_prices}
          setTaste={setCTaste}
          setAtmosphere={setCAtmosphere}
          setPrices={setCPrices}
          api={"/api/competitor-rating-questions"}
          responderId={responderId}
          onSubmit={handleNextPage}
        />
        )}

        {/* New Brand Rating Page */}
        {currentPage === 9 && (
        <RatingPage 
          inputRefs={inputRefs}
          taste={nb_taste}
          atmosphere={nb_atmosphere}
          prices={nb_prices}
          setTaste={setNTaste}
          setAtmosphere={setNAtmosphere}
          setPrices={setNPrices}
          api={"/api/newbrand-rating-questions"}
          responderId={responderId}
          onSubmit={handleNextPage}
        />
        )}

        {/* Market Awareness Page */}
        {currentPage === 1 && (
        <MarketAwarenessPage 
          inputRefs={inputRefs}
          recognizedCompetitors={recognizedCompetitors}
          setRecognizedCompetitors={setRecognizedCompetitors}
          responderId={responderId}
          onSubmit={handleNextPage}
        />
        )}

        {currentPage === 2 && (
        <GuessPricesPage
          inputRefs={inputRefs}
          burger={burger}
          burger_premium={burger_premium}
          bundle={bundle}
          setBurger={setBurger}
          setBurgerPremium={setBurgerPremium}
          setBundle={setBundle}
          responderId={responderId}
          onSubmit={handleNextPage}
        />
        )}

        {currentPage === 4 && (
            <WTPDirectPage 
              inputRefs={inputRefs} // Pass the entire inputRefs object
              upperT={burger_wtp.upperT}
              setUpperT={(value) => setBurgerWTP({ ...burger_wtp, upperT: value })}
              lowerT={burger_wtp.lowerT}
              setLowerT={(value) => setBurgerWTP({ ...burger_wtp, lowerT: value })}
              upperB={burger_wtp.upperB}
              setUpperB={(value) => setBurgerWTP({ ...burger_wtp, upperB: value })}
              lowerb={burger_wtp.lowerb}
              setLowerb={(value) => setBurgerWTP({ ...burger_wtp, lowerb: value })}
              guess={burger_wtp.guess}
              setGuess={(value) => setBurgerWTP({ ...burger_wtp, guess: value })}
              responderId={responderId}
              onSubmit={handleNextPage}
              item="burger"
            />
        )}

        {currentPage === 5 && (
        <WTPDirectPage 
            inputRefs={inputRefs} // Pass the entire inputRefs object
            upperT={burger_premium_wtp.upperT}
            setUpperT={(value) => setBurgerPremiumWTP({ ...burger_premium_wtp, upperT: value })}
            lowerT={burger_premium_wtp.lowerT}
            setLowerT={(value) => setBurgerPremiumWTP({ ...burger_premium_wtp, lowerT: value })}
            upperB={burger_premium_wtp.upperB}
            setUpperB={(value) => setBurgerPremiumWTP({ ...burger_premium_wtp, upperB: value })}
            lowerb={burger_premium_wtp.lowerb}
            setLowerb={(value) => setBurgerPremiumWTP({ ...burger_premium_wtp, lowerb: value })}
            guess={burger_premium_wtp.guess}
            setGuess={(value) => setBurgerPremiumWTP({ ...burger_premium_wtp, guess: value })}
            responderId={responderId}
            onSubmit={handleNextPage}
            item="burger_premium"
        />
        )}

        {currentPage === 6 && (
            <WTPDirectPage 
            inputRefs={inputRefs} // Pass the entire inputRefs object
            upperT={bundle_wtp.upperT}
            setUpperT={(value) => setBundleWTP({ ...bundle_wtp, upperT: value })}
            lowerT={bundle_wtp.lowerT}
            setLowerT={(value) => setBundleWTP({ ...bundle_wtp, lowerT: value })}
            upperB={bundle_wtp.upperB}
            setUpperB={(value) => setBundleWTP({ ...bundle_wtp, upperB: value })}
            lowerb={bundle_wtp.lowerb}
            setLowerb={(value) => setBundleWTP({ ...bundle_wtp, lowerb: value })}
            guess={bundle_wtp.guess}
            setGuess={(value) => setBundleWTP({ ...bundle_wtp, guess: value })}
            responderId={responderId}
            onSubmit={handleNextPage}
            item="bundle"
        />
        )}

        {currentPage === 7 && (
        <WTPCBCPage 
          inputRefs={inputRefs}
          responderId={responderId}
          onSubmit={handleNextPage}
        />
        )}

        {currentPage === 10 && (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
