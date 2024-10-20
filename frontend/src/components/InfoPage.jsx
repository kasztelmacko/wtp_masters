import React from 'react';
import { MAIN_PAGE } from '../constants/main_page';
import { MARKET_AWARENESS_PAGE } from '../constants/market_awareness_page';
import { AHP_PAGE } from '../constants/ahp_page';
import { OE_PAGE } from '../constants/oe_page';
import { CBC_PAGE } from '../constants/cbc_page';
import { RATING_C_PAGE } from '../constants/rating_c_page';
import { RATING_NB_PAGE } from '../constants/rating_nb_page';
import { GUESS_PRICE_PAGE } from '../constants/guess_price_page';
import { END_PAGE } from '../constants/end_page';

const InfoPage = ({ currentPage }) => {
    const INFO_TEXT = [
        MAIN_PAGE,
        MARKET_AWARENESS_PAGE,
        GUESS_PRICE_PAGE,
        AHP_PAGE,
        OE_PAGE,
        OE_PAGE,
        OE_PAGE,
        CBC_PAGE,
        RATING_C_PAGE,
        RATING_NB_PAGE,
        END_PAGE
    ]

    return (
      <div className="info-page h-screen p-10 text-md 2xl:text-xl">
        {INFO_TEXT[currentPage]}
      </div>
    );
  };

export default InfoPage;