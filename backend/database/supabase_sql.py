from supabase import Client, create_client
from dotenv import load_dotenv
import os
from typing import List

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)

def get_data(table_name: str, respondent_id: int, column: str = None):
    response = supabase.table(table_name).select(column if column else "*").eq("respondent_id", respondent_id).execute()
    return response

def save_choices(table_name: str, respondent_id: int, alternative_id: int, question_id: int):
    response = supabase.table(table_name).update({"choice": 1}) \
        .eq("respondent_id", respondent_id) \
        .eq("question_id", question_id) \
        .eq("alternative_id", alternative_id) \
        .execute()
    return response


def get_values_and_columns(response: dict):
    values = [value for value in response.values()]
    columns = [key for key in response.keys()]
    return values, columns

def save_input(table_name: str, respondent_id: int, values: List[str], columns: List[str]):
    if len(values) != len(columns):
        raise ValueError("The number of values must match the number of columns.")
    
    data = {"respondent_id": respondent_id}

    for column, value in zip(columns, values):
        data[column] = value

    response = supabase.table(table_name).upsert(data).execute()
    return response
