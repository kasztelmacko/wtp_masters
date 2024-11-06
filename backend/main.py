from fastapi import FastAPI, Request, Depends, Response, Cookie
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

import ahpy

from schemas import (DemographicQuestions, 
                     AHPQuestions,  
                     CompetitorRatingQuestions, 
                     NewBrandExpectationQuestions, 
                     MarketAwarenessQuestions,
                     GuessPricesQuestion,
                     DirectWTPQuestions,
                     CBCWTPQuestions)

from database.supabase_sql import (get_data, 
                                   save_choices, 
                                   save_input, 
                                   get_values_and_columns,
                                   assign_free_respondent_id,
                                   change_respondent_status)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.56.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/assign-responder-id")
async def assign_responder_id(response: Response):
    responder_id = assign_free_respondent_id()
    return {"responder_id": responder_id} 

@app.post("/api/demographic-questions")
async def demographic_questions(demographic_questions: DemographicQuestions):

    responder_id = demographic_questions.responder_id
    
    response_data = {
        "age": demographic_questions.age.validate_serialize_response(demographic_questions.age.question_text), 
        "gender": demographic_questions.gender.validate_serialize_response(demographic_questions.gender.question_text),
        "income": demographic_questions.income.validate_serialize_response(demographic_questions.income.question_text),
        "geolocation": demographic_questions.geolocation.validate_serialize_response(demographic_questions.geolocation.question_text),
        "frequency_of_fast_food_dining": demographic_questions.frequency_of_fast_food_dining.validate_serialize_response(demographic_questions.frequency_of_fast_food_dining.question_text),
        "monthly_spenditure_on_fast_food": demographic_questions.monthly_spenditure_on_fast_food.validate_serialize_response(demographic_questions.monthly_spenditure_on_fast_food.question_text)
    }

    values, columns = get_values_and_columns(response_data)
    save_input("SurveyResponses", responder_id, values, columns)
    return JSONResponse(content=response_data)


@app.post("/api/ahp-questions")
async def ahp_questions(ahp_questions: AHPQuestions):

    responder_id = ahp_questions.responder_id
    
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
    
    return JSONResponse(content={"message": "AHP questions processed."})


@app.post("/api/competitor-rating-questions")
async def competitor_rating(competitor_rating: CompetitorRatingQuestions):

    responder_id = competitor_rating.responder_id
    
    response = {
        "competitor_taste": competitor_rating.taste.validate_serialize_response(competitor_rating.taste.question_text),
        "competitor_prices": competitor_rating.prices.validate_serialize_response(competitor_rating.prices.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)

@app.post("/api/newbrand-rating-questions")
async def newbrand_rating(newbrand_rating: NewBrandExpectationQuestions):
    
    responder_id = newbrand_rating.responder_id
    
    response = {
        "new_brand_taste": newbrand_rating.taste.validate_serialize_response(newbrand_rating.taste.question_text),
        "new_brand_prices": newbrand_rating.prices.validate_serialize_response(newbrand_rating.prices.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    change_respondent_status(int(responder_id), "finished")

    return JSONResponse(content=response)

@app.post("/api/market-awareness-questions")
async def market_awareness(market_awareness: MarketAwarenessQuestions):
    print(market_awareness)
    responder_id = market_awareness.responder_id
    
    response = {
        "recognized_competitors": market_awareness.recognized_competitors.validate_serialize_response(market_awareness.recognized_competitors.question_text)
    }

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)

    return JSONResponse(content=response)

@app.post("/api/guess-prices-questions")
async def guess_prices(guessed_prices: GuessPricesQuestion):

    responder_id = guessed_prices.responder_id
    
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

    responder_id = direct_wtp.responder_id
    
    item = direct_wtp.item
    response = {
        f"{item}_wtp_UpperT": direct_wtp.wtp_UpperT.validate_serialize_response(direct_wtp.wtp_UpperT.question_text),
        f"{item}_wtp_LowerT": direct_wtp.wtp_LowerT.validate_serialize_response(direct_wtp.wtp_LowerT.question_text),
        f"{item}_wtp_upperB": direct_wtp.wtp_upperB.validate_serialize_response(direct_wtp.wtp_upperB.question_text),
        f"{item}_wtp_lowerB": direct_wtp.wtp_lowerB.validate_serialize_response(direct_wtp.wtp_lowerB.question_text),
        f"{item}_wtp_guess": direct_wtp.wtp_guess.validate_serialize_response(direct_wtp.wtp_guess.question_text),
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
    responder_id = cbc_wtp.responder_id
    
    response = {}
    
    for question_key, question in cbc_wtp.WTPCBCQuestions.items():
        alternative_id = question.alternative
        question_id = question.question_id
        
        save_choices(table_name="CBCSurvey", respondent_id=responder_id, alternative_id=alternative_id, question_id=question_id)
        response[question_key] = alternative_id

    values, columns = get_values_and_columns(response)
    save_input("SurveyResponses", responder_id, values, columns)
    
    return JSONResponse(content=response)





