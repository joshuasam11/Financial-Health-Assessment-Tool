from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_ai_insights(metrics):
    prompt = f"""
You are a financial advisor for SMEs.

Profit: ₹{metrics['profit']}
Cash Flow: ₹{metrics['cash_flow']}
Debt Ratio: {metrics['debt_ratio']}
Credit Score: {metrics['credit_score']}

Give:
1. Financial health summary
2. Risks
3. Cost-saving tips
4. Loan advice
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
