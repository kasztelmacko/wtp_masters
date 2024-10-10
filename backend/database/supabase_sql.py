from supabase import Client, create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)

def get_data(table_name: str, respondent_id: int, column: str = None):
    response = supabase.table(table_name).select(column if column else "*").eq("respondent_id", respondent_id).execute()
    return response
