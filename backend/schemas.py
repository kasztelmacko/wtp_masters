from pydantic import BaseModel
from question_types import (SingleChoiceQuestion, 
                            MultipleChoiceQuestion, 
                            OpinionScaleQuestion, 
                            InputQuestion,
                            AHPChoiceQuestion, 
                            CBCQuestion)

class DemographicQuestions(BaseModel):
    age: InputQuestion
    gender: SingleChoiceQuestion
    income: SingleChoiceQuestion
    geolocation: SingleChoiceQuestion
    frequency_of_fast_food_dining: SingleChoiceQuestion
    monthly_spenditure_on_fast_food: SingleChoiceQuestion

class AHPQuestions(BaseModel):
    brand_recognition_vs_brand_recall: AHPChoiceQuestion
    brand_recognition_vs_brand_past_purchase_or_use: AHPChoiceQuestion
    brand_recognition_vs_emotional_perception_of_the_brand: AHPChoiceQuestion
    brand_recognition_vs_logo: AHPChoiceQuestion
    brand_recognition_vs_utilitarian_benefits: AHPChoiceQuestion

    brand_recall_vs_brand_past_purchase_or_use: AHPChoiceQuestion
    brand_recall_vs_emotional_perception_of_the_brand: AHPChoiceQuestion
    brand_recall_vs_logo: AHPChoiceQuestion
    brand_recall_vs_utilitarian_benefits: AHPChoiceQuestion

    brand_past_purchase_or_use_vs_emotional_perception_of_the_brand: AHPChoiceQuestion
    brand_past_purchase_or_use_vs_logo: AHPChoiceQuestion
    brand_past_purchase_or_use_vs_utilitarian_benefits: AHPChoiceQuestion

    emotional_perception_of_the_brand_vs_logo: AHPChoiceQuestion
    emotional_perception_of_the_brand_vs_utilitarian_benefits: AHPChoiceQuestion

    logo_vs_utilitarian_benefits: AHPChoiceQuestion

class CompetitorRatingQuestions(BaseModel):
    taste: OpinionScaleQuestion
    atmosphere: OpinionScaleQuestion
    prices: OpinionScaleQuestion

class NewBrandExpectationQuestions(BaseModel):
    taste: OpinionScaleQuestion
    atmosphere: OpinionScaleQuestion
    prices: OpinionScaleQuestion

class MarketAwarenessQuestions(BaseModel):
    recognized_competitors: MultipleChoiceQuestion

class GuessPricesQuestion(BaseModel):
    burger: InputQuestion
    burger_premium: InputQuestion
    bundle: InputQuestion

class DirectWTPQuestions(BaseModel):
    item: str
    wtp_UpperT: InputQuestion
    wtp_LowerT: InputQuestion
    wtp_upperB: InputQuestion
    wtp_lowerB: InputQuestion
    wtp_guess: InputQuestion

class CBCWTPQuestions(BaseModel):
    question_1: CBCQuestion
    question_2: CBCQuestion
    question_3: CBCQuestion
    question_4: CBCQuestion
    question_5: CBCQuestion
    question_6: CBCQuestion