from fastapi import FastAPI, Request
from fastapi.responses import  JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import ahpy

from schemas import (DemographicQuestions, 
                     AHPQuestions, 
                     ConsumerBehaviorQuestions, 
                     CompetitorRatingQuestions, 
                     NewBrandExpectationQuestions, 
                     MarketAwarenessQuestions,
                     GuessPricesQuestion,
                     DirectWTPQuestions,
                     CBCWTPQuestions)

from database.supabase_sql import get_data, save_choices, save_input, get_values_and_columns


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.56.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

responder_id = 2

@app.post("/api/demographic-questions")
async def demographic_questions(demographic_questions: DemographicQuestions):
    response = {
        "age": demographic_questions.age.validate_serialize_response(demographic_questions.age.question_text), 
        "gender": demographic_questions.gender.validate_serialize_response(demographic_questions.gender.question_text),
        "income": demographic_questions.income.validate_serialize_response(demographic_questions.income.question_text),
        "geolocation": demographic_questions.geolocation.validate_serialize_response(demographic_questions.geolocation.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)
    return JSONResponse(content=response)


@app.post("/api/ahp-questions")
async def ahp_questions(ahp_questions: AHPQuestions):
    response = {
        "brand_recognition_vs_brand_recall": {tuple(ahp_questions.brand_recognition_vs_brand_recall.criteria): ahp_questions.brand_recognition_vs_brand_recall.validate_serialize_response(ahp_questions.brand_recognition_vs_brand_recall.question_text)},
        "brand_recognition_vs_brand_past_purchase_or_use": {tuple(ahp_questions.brand_recognition_vs_brand_past_purchase_or_use.criteria): ahp_questions.brand_recognition_vs_brand_past_purchase_or_use.validate_serialize_response(ahp_questions.brand_recognition_vs_brand_past_purchase_or_use.question_text)},
        "brand_recognition_vs_emotional_perception_of_the_brand": {tuple(ahp_questions.brand_recognition_vs_emotional_perception_of_the_brand.criteria): ahp_questions.brand_recognition_vs_emotional_perception_of_the_brand.validate_serialize_response(ahp_questions.brand_recognition_vs_emotional_perception_of_the_brand.question_text)},
        "brand_recognition_vs_logo": {tuple(ahp_questions.brand_recognition_vs_logo.criteria): ahp_questions.brand_recognition_vs_logo.validate_serialize_response(ahp_questions.brand_recognition_vs_logo.question_text)},
        "brand_recognition_vs_utilitarian_benefits": {tuple(ahp_questions.brand_recognition_vs_utilitarian_benefits.criteria): ahp_questions.brand_recognition_vs_utilitarian_benefits.validate_serialize_response(ahp_questions.brand_recognition_vs_utilitarian_benefits.question_text)},

        "brand_recall_vs_brand_past_purchase_or_use": {tuple(ahp_questions.brand_recall_vs_brand_past_purchase_or_use.criteria): ahp_questions.brand_recall_vs_brand_past_purchase_or_use.validate_serialize_response(ahp_questions.brand_recall_vs_brand_past_purchase_or_use.question_text)},
        "brand_recall_vs_emotional_perception_of_the_brand": {tuple(ahp_questions.brand_recall_vs_emotional_perception_of_the_brand.criteria): ahp_questions.brand_recall_vs_emotional_perception_of_the_brand.validate_serialize_response(ahp_questions.brand_recall_vs_emotional_perception_of_the_brand.question_text)},
        "brand_recall_vs_logo": {tuple(ahp_questions.brand_recall_vs_logo.criteria): ahp_questions.brand_recall_vs_logo.validate_serialize_response(ahp_questions.brand_recall_vs_logo.question_text)},
        "brand_recall_vs_utilitarian_benefits": {tuple(ahp_questions.brand_recall_vs_utilitarian_benefits.criteria): ahp_questions.brand_recall_vs_utilitarian_benefits.validate_serialize_response(ahp_questions.brand_recall_vs_utilitarian_benefits.question_text)},

        "brand_past_purchase_or_use_vs_emotional_perception_of_the_brand": {tuple(ahp_questions.brand_past_purchase_or_use_vs_emotional_perception_of_the_brand.criteria): ahp_questions.brand_past_purchase_or_use_vs_emotional_perception_of_the_brand.validate_serialize_response(ahp_questions.brand_past_purchase_or_use_vs_emotional_perception_of_the_brand.question_text)},
        "brand_past_purchase_or_use_vs_logo": {tuple(ahp_questions.brand_past_purchase_or_use_vs_logo.criteria): ahp_questions.brand_past_purchase_or_use_vs_logo.validate_serialize_response(ahp_questions.brand_past_purchase_or_use_vs_logo.question_text)},
        "brand_past_purchase_or_use_vs_utilitarian_benefits": {tuple(ahp_questions.brand_past_purchase_or_use_vs_utilitarian_benefits.criteria): ahp_questions.brand_past_purchase_or_use_vs_utilitarian_benefits.validate_serialize_response(ahp_questions.brand_past_purchase_or_use_vs_utilitarian_benefits.question_text)},

        "emotional_perception_of_the_brand_vs_logo": {tuple(ahp_questions.emotional_perception_of_the_brand_vs_logo.criteria): ahp_questions.emotional_perception_of_the_brand_vs_logo.validate_serialize_response(ahp_questions.emotional_perception_of_the_brand_vs_logo.question_text)},
        "emotional_perception_of_the_brand_vs_utilitarian_benefits": {tuple(ahp_questions.emotional_perception_of_the_brand_vs_utilitarian_benefits.criteria): ahp_questions.emotional_perception_of_the_brand_vs_utilitarian_benefits.validate_serialize_response(ahp_questions.emotional_perception_of_the_brand_vs_utilitarian_benefits.question_text)},

        "logo_vs_utilitarian_benefits": {tuple(ahp_questions.logo_vs_utilitarian_benefits.criteria): ahp_questions.logo_vs_utilitarian_benefits.validate_serialize_response(ahp_questions.logo_vs_utilitarian_benefits.question_text)}
    }
    
    mapping = {
        'Logo': 'logo',
        'Brand Recall': 'brand_recall',
        'Brand Past Purchase or Use': 'brand_past_purchase_or_use',
        'Brand Recognition': 'brand_recognition',
        'Emotional Perception of the Brand': 'emotional_perception_of_the_brand',
        'Utilitarian Benefits': 'utilitarian_benefits'
    }


    brand_comparisons = {}
    for key, value in response.items():
        for comparison, score in value.items():
            brand_comparisons[comparison] = score

    model = ahpy.Compare(name="Brand Attributes", comparisons=brand_comparisons, precision=3, random_index='saaty')
    mapped_weights = {mapping[key]: value for key, value in model.target_weights.items() if key in mapping}

    values, columns = get_values_and_columns(mapped_weights)
    save_input("SurveyResponses", responder_id, values, columns)
    
    return 


@app.post("/api/consumer-behavior-questions")
async def consumer_behavior_questions(consumer_behavior_questions: ConsumerBehaviorQuestions):
    response = {
        "frequency_of_fast_food_dining": consumer_behavior_questions.frequency_of_fast_food_dining.validate_serialize_response(consumer_behavior_questions.frequency_of_fast_food_dining.question_text),
        "monthly_spenditure_on_fast_food": consumer_behavior_questions.monthly_spenditure_on_fast_food.validate_serialize_response(consumer_behavior_questions.monthly_spenditure_on_fast_food.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)


@app.post("/api/competitor-rating-questions")
async def competitor_rating(competitor_rating: CompetitorRatingQuestions):
    response = {
        "competitor_taste": competitor_rating.taste.validate_serialize_response(competitor_rating.taste.question_text),
        "competitor_atmosphere": competitor_rating.atmosphere.validate_serialize_response(competitor_rating.atmosphere.question_text),
        "competitor_prices": competitor_rating.prices.validate_serialize_response(competitor_rating.prices.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)

@app.post("/api/newbrand-rating-questions")
async def newbrand_rating(newbrand_rating: NewBrandExpectationQuestions):
    response = {
        "new_brand_taste": newbrand_rating.taste.validate_serialize_response(newbrand_rating.taste.question_text),
        "new_brand_atmosphere": newbrand_rating.atmosphere.validate_serialize_response(newbrand_rating.atmosphere.question_text),
        "new_brand_prices": newbrand_rating.prices.validate_serialize_response(newbrand_rating.prices.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)

@app.post("/api/market-awareness-questions")
async def market_awareness(market_awareness: MarketAwarenessQuestions):
    response = {
        "recognized_competitors": len(market_awareness.recognized_competitors.validate_serialize_response(market_awareness.recognized_competitors.question_text))/14
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)

@app.post("/api/guess-prices-questions")
async def guess_prices(guessed_prices: GuessPricesQuestion):
    response = {
        "guessed_burger": guessed_prices.burger.validate_serialize_response(guessed_prices.burger.question_text),
        "guessed_burger_premium": guessed_prices.burger_premium.validate_serialize_response(guessed_prices.burger_premium.question_text),
        "guessed_bundle": guessed_prices.bundle.validate_serialize_response(guessed_prices.bundle.question_text)
    }
    
    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)
    
    return JSONResponse(content=response)

@app.post("/api/direct-wtp-questions")
async def direct_wtp(direct_wtp: DirectWTPQuestions):
    response = {
        "direct_wtp_burger": direct_wtp.burger_wtp.validate_serialize_response(direct_wtp.burger_wtp.question_text),
        "direct_wtp_burger_premium": direct_wtp.burger_premium_wtp.validate_serialize_response(direct_wtp.burger_premium_wtp.question_text),
        "direct_wtp_bundle": direct_wtp.bundle_wtp.validate_serialize_response(direct_wtp.bundle_wtp.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)

@app.get("/api/cbc-wtp-questions")
async def cbc_wtp_get(respondent_id: int):
    questions = get_data(table_name="CBCSurvey", respondent_id=respondent_id)
    return questions

@app.post("/api/cbc-wtp-questions")
async def cbc_wtp_post(cbc_wtp: CBCWTPQuestions):
    response = {}
    
    for i in range(1, 7):
        question_key = f"question_{i}"
        question = getattr(cbc_wtp, question_key)

        alternative_id = question.alternative
        question_id = question.question_id
        save_choices(table_name="CBCSurvey", respondent_id=question.respondent_id, alternative_id=alternative_id, question_id=question_id)
        response[question_key] = alternative_id

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)
    
    return JSONResponse(content=response)

