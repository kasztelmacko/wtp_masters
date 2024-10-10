from fastapi import FastAPI, Request
from fastapi.responses import  JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from schemas import (DemographicQuestions, 
                     AHPQuestions, 
                     ConsumerBehaviorQuestions, 
                     CompetitorRatingQuestions, 
                     NewBrandExpectationQuestions, 
                     MarketAwarenessQuestions,
                     GuessPricesQuestion,
                     DirectWTPQuestions,
                     CBCWTPQuestions)

from database.supabase_sql import get_data


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.56.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/demographic-questions")
async def demographic_questions(demographic_questions: DemographicQuestions):
    response = {
        "age": demographic_questions.age.return_response(demographic_questions.age.question_text), 
        "gender": demographic_questions.gender.return_response(demographic_questions.gender.question_text),
        "income": demographic_questions.income.return_response(demographic_questions.income.question_text),
        "geolocation": demographic_questions.geolocation.return_response(demographic_questions.geolocation.question_text)
    }
    return JSONResponse(content=response)


@app.post("/api/ahp-questions")
async def ahp_questions(ahp_questions: AHPQuestions):
    response = {
        "brand_recognition_vs_brand_recall": ahp_questions.brand_recognition_vs_brand_recall.return_response(ahp_questions.brand_recognition_vs_brand_recall.question_text),
        "brand_recognition_vs_brand_past_purchase_or_use": ahp_questions.brand_recognition_vs_brand_past_purchase_or_use.return_response(ahp_questions.brand_recognition_vs_brand_past_purchase_or_use.question_text),
        "brand_recognition_vs_emotional_perception_of_the_brand": ahp_questions.brand_recognition_vs_emotional_perception_of_the_brand.return_response(ahp_questions.brand_recognition_vs_emotional_perception_of_the_brand.question_text),
        "brand_recognition_vs_logo": ahp_questions.brand_recognition_vs_logo.return_response(ahp_questions.brand_recognition_vs_logo.question_text),
        "brand_recognition_vs_utilitarian_benefits": ahp_questions.brand_recognition_vs_utilitarian_benefits.return_response(ahp_questions.brand_recognition_vs_utilitarian_benefits.question_text),

        "brand_recall_vs_brand_past_purchase_or_use": ahp_questions.brand_recall_vs_brand_past_purchase_or_use.return_response(ahp_questions.brand_recall_vs_brand_past_purchase_or_use.question_text),
        "brand_recall_vs_emotional_perception_of_the_brand": ahp_questions.brand_recall_vs_emotional_perception_of_the_brand.return_response(ahp_questions.brand_recall_vs_emotional_perception_of_the_brand.question_text),
        "brand_recall_vs_logo": ahp_questions.brand_recall_vs_logo.return_response(ahp_questions.brand_recall_vs_logo.question_text),
        "brand_recall_vs_utilitarian_benefits": ahp_questions.brand_recall_vs_utilitarian_benefits.return_response(ahp_questions.brand_recall_vs_utilitarian_benefits.question_text),

        "brand_past_purchase_or_use_vs_emotional_perception_of_the_brand": ahp_questions.brand_past_purchase_or_use_vs_emotional_perception_of_the_brand.return_response(ahp_questions.brand_past_purchase_or_use_vs_emotional_perception_of_the_brand.question_text),
        "brand_past_purchase_or_use_vs_logo": ahp_questions.brand_past_purchase_or_use_vs_logo.return_response(ahp_questions.brand_past_purchase_or_use_vs_logo.question_text),
        "brand_past_purchase_or_use_vs_utilitarian_benefits": ahp_questions.brand_past_purchase_or_use_vs_utilitarian_benefits.return_response(ahp_questions.brand_past_purchase_or_use_vs_utilitarian_benefits.question_text),

        "emotional_perception_of_the_brand_vs_logo": ahp_questions.emotional_perception_of_the_brand_vs_logo.return_response(ahp_questions.emotional_perception_of_the_brand_vs_logo.question_text),
        "emotional_perception_of_the_brand_vs_utilitarian_benefits": ahp_questions.emotional_perception_of_the_brand_vs_utilitarian_benefits.return_response(ahp_questions.emotional_perception_of_the_brand_vs_utilitarian_benefits.question_text),
    }
    return JSONResponse(content=response)


@app.post("/api/consumer-behavior-questions")
async def consumer_behavior_questions(consumer_behavior_questions: ConsumerBehaviorQuestions):
    response = {
        "frequency_of_fast_food_dining": consumer_behavior_questions.frequency_of_fast_food_dining.return_response(consumer_behavior_questions.frequency_of_fast_food_dining.question_text),
        "monthly_spenditure_on_fast_food": consumer_behavior_questions.monthly_spenditure_on_fast_food.return_response(consumer_behavior_questions.monthly_spenditure_on_fast_food.question_text)
    }
    return JSONResponse(content=response)


@app.post("/api/competitor-rating-questions")
async def competitor_rating(competitor_rating: CompetitorRatingQuestions):
    response = {
        "taste": competitor_rating.taste.return_response(competitor_rating.taste.question_text),
        "atmosphere": competitor_rating.atmosphere.return_response(competitor_rating.atmosphere.question_text),
        "prices": competitor_rating.prices.return_response(competitor_rating.prices.question_text)
    }
    return JSONResponse(content=response)

@app.post("/api/newbrand-rating-questions")
async def newbrand_rating(newbrand_rating: NewBrandExpectationQuestions):
    response = {
        "taste": newbrand_rating.taste.return_response(newbrand_rating.taste.question_text),
        "atmosphere": newbrand_rating.atmosphere.return_response(newbrand_rating.atmosphere.question_text),
        "prices": newbrand_rating.prices.return_response(newbrand_rating.prices.question_text)
    }
    return JSONResponse(content=response)

@app.post("/api/market-awareness-questions")
async def market_awareness(market_awareness: MarketAwarenessQuestions):
    response = {
        "recognized_competitors": market_awareness.recognized_competitors.return_response(market_awareness.recognized_competitors.question_text)
    }
    return JSONResponse(content=response)

@app.post("/api/guess-prices-questions")
async def guess_prices(guessed_prices: GuessPricesQuestion):
    response = {
        "burger": guessed_prices.burger.return_response(guessed_prices.burger.question_text),
        "burger_premium": guessed_prices.burger_premium.return_response(guessed_prices.burger_premium.question_text),
        "bundle": guessed_prices.bundle.return_response(guessed_prices.bundle.question_text)
    }
    return JSONResponse(content=response)

@app.post("/api/direct-wtp-questions")
async def direct_wtp(direct_wtp: DirectWTPQuestions):
    response = {
        "burger_wtp": direct_wtp.burger_wtp.return_response(direct_wtp.burger_wtp.question_text),
        "burger_premium_wtp": direct_wtp.burger_premium_wtp.return_response(direct_wtp.burger_premium_wtp.question_text),
        "bundle_wtp": direct_wtp.bundle_wtp.return_response(direct_wtp.bundle_wtp.question_text)
    }
    return JSONResponse(content=response)

@app.get("/api/cbc-wtp-questions")
async def cbc_wtp_get(respondent_id: int):
    questions = get_data(table_name="CBCSurvey", respondent_id=respondent_id)
    return questions

@app.post("/api/cbc-wtp-questions")
async def cbc_wtp_post(cbc_wtp : CBCWTPQuestions):
    response = {
        "question_1": cbc_wtp.question_1.alternative,
        "question_2": cbc_wtp.question_2.alternative,
        "question_3": cbc_wtp.question_3.alternative,
        "question_4": cbc_wtp.question_4.alternative,
        "question_5": cbc_wtp.question_5.alternative,
        "question_6": cbc_wtp.question_6.alternative
    }
    return JSONResponse(content=response)

