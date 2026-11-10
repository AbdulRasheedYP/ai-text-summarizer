import os
from dotenv import load_dotenv

from google import genai
from google.genai import types
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")


client = genai.Client(
    api_key=api_key,
    http_options=types.HttpOptions(timeout=30000)
                      
                      )

def generate_summary(text):
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=f"Summarize this text in simple and clear points:\n\n{text}"
    )

    return response.text