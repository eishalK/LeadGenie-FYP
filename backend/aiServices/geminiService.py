import sys
import json
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

def generate_ai_text(description, output_format):
    try:
        # Client automatically reads GEMINI_API_KEY from environment variables
        client = genai.Client()
        
        system_instruction = (
            "You are an expert AI Content Copywriter built into the LeadGenie dashboard. "
            "Your goal is to write high-converting, professional, and engaging copy based on the parameters provided. "
            "Adopt an inspiring, clear, and business-focused tone."
        )
        
        user_prompt = f"""
        Format Requirement: {output_format}
        Business Parameters / Details: {description}
        
        Please generate high-tier copy matching the requested format perfectly. 
        Structure the layout cleanly using markdown rules where relevant.
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
        )
        return {"status": "success", "content": response.text}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    # Receive data packet sent from node server
    if len(sys.argv) > 1:
        try:
            input_data = json.loads(sys.argv[1])
            desc = input_data.get("description", "")
            fmt = input_data.get("format", "")
            
            result = generate_ai_text(desc, fmt)
            print(json.dumps(result))
        except Exception as err:
            print(json.dumps({"status": "error", "message": f"Python runtime error: {str(err)}"}))