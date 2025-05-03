import sys
import json
import google.generativeai as genai

# Read the message from command-line argument
if len(sys.argv) > 1:
    message = sys.argv[1]
else:
    message = "A/c X0801 debited by Rs. 20.00 for UPI payment to PATIL VIJAY JAI on 25-Feb-25 RRN: 505678531774 if not you  call 18002334526 -MAHABANK"

# Configure API Key
genai.configure(api_key="AIzaSyDGpRZXdpIgVC5rEMqssvqT4DoP7AzWPT8")

def extract_transaction_details(message):
    prompt = f"""
    Extract the Amount, To, From (From for credit type transaction and To for debit type transaction, else empty string), Type (debit/credit), and isSelfCredit (true/false) from the following bank message:

    "{message}"

    Return ONLY a JSON string with keys: Amount, To, From, Type, isSelfCredit. No explanation, no markdown, only pure JSON.
    """

    model = genai.GenerativeModel("models/gemini-2.0-flash-lite")
    response = model.generate_content(prompt)

    # Sometimes response includes extra text, handle that
    text = response.text.strip()

    # If Gemini returns a code block (```json ... ```), remove it
    if text.startswith("```"):
        text = text.split('```')[1]  # get content inside code block
        if text.startswith("json"):
            text = text[len("json"):].strip()  # remove 'json' if exists

    return text

details = extract_transaction_details(message)

try:
    # Parse the cleaned text
    parsed_details = json.loads(details)
    print(json.dumps(parsed_details))  # Final JSON output
except Exception as e:
    print(json.dumps({"error": "Failed to parse Gemini output", "details": str(e)}))
