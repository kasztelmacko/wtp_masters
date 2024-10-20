from pydantic import BaseModel
from typing import List, Optional, Union
from fractions import Fraction
import json
import re

class Question(BaseModel):
    question_name: str
    question_text: Union[str, int, float, list]
    required: bool

    def serialize_response(self, response: Union[dict, list]) -> str:
        return json.dumps(response)

    def deserialize_response(self, response: str):
        return json.loads(response)

    def validate_response(self, response) -> bool:
        raise NotImplementedError

    def validate_serialize_response(self, response):
        if self.validate_response(response):
            serialized_response = self.serialize_response(response)
            return serialized_response
        else:
            raise ValueError("Invalid response")

class SingleChoiceQuestion(Question):
    choices: List[str]
    
    def validate_response(self, response) -> bool:
        if self.required and response not in self.choices:
            return False
        return True

class MultipleChoiceQuestion(Question):
    choices: List[str]

    def validate_response(self, response: List[str]) -> bool:
        if self.required and not all(choice in self.choices for choice in response):
            return False
        return True

class InputQuestion(Question):
    input_type: str

    def validate_response(self, response: Union[str, int, float]) -> bool:
        if self.required and not response:
            return False

        if self.input_type == "number":
            return isinstance(response, (int, float))
        elif self.input_type == "text":
            return isinstance(response, str)
        return True

class AHPChoiceQuestion(SingleChoiceQuestion):
    criteria: List[str]

    def validate_response(self, response: str) -> bool:
        response = re.sub('"', "", response)
        if self.required and response not in self.choices:
            return False
        return True
    
    def validate_serialize_response(self, response):
        response = re.sub('"', "", response)
        if not self.validate_response(response):
            raise ValueError("Invalid response")

        response_value = Fraction(response)
        
        return response_value


class OpinionScaleQuestion(Question):
    min_value: int
    max_value: int

    def validate_response(self, response: int) -> bool:
        if self.required and not (self.min_value <= response <= self.max_value):
            return False
        return True
    
class CBCQuestion(Question):
    alternative: int
    profile: int
    responder_id: int
    question_id: int

