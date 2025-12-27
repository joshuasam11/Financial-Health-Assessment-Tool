import pandas as pd
import os
from openai import OpenAI
import requests
import json



OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")



OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = "openai/gpt-oss-120b:free"
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

import pandas as pd

REQUIRED_COLUMNS = ["revenue", "expenses", "cash_in", "cash_out"]


def analyze_financials(df: pd.DataFrame):
    # 1️⃣ Validate required columns
    missing = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    total_revenue = df["revenue"].sum()
    total_expenses = df["expenses"].sum()
    profit = total_revenue - total_expenses
    cash_flow = df["cash_in"].sum() - df["cash_out"].sum()

    # 2️⃣ Debt / liabilities
    if "liabilities" in df.columns:
        debt_value = df["liabilities"].iloc[-1]
    elif "debt" in df.columns:
        debt_value = df["debt"].iloc[-1]
    else:
        debt_value = 0

    debt_ratio = debt_value / max(total_revenue, 1)

    # 3️⃣ Assets
    if "assets" in df.columns:
        asset_value = df["assets"].iloc[-1]
        leverage_ratio = debt_value / max(asset_value, 1)
    else:
        leverage_ratio = None

    # 4️⃣ Credit score
    credit_score = max(300, min(850, 650 + profit / 10000))

    # ===============================
    # 🧠 RULE-BASED INSIGHTS
    # ===============================
    insights = []
    risks = []
    recommendations = []

    # Profitability
    if profit <= 0:
        risks.append("Business is currently loss-making.")
        recommendations.append("Reduce operating expenses or improve pricing strategy.")
    else:
        insights.append("Business is profitable.")

    # Cash flow
    if cash_flow <= 0:
        risks.append("Negative cash flow indicates liquidity stress.")
        recommendations.append("Improve receivables collection or reduce cash outflows.")
    else:
        insights.append("Healthy operational cash flow.")

    # Debt risk
    if debt_ratio > 0.6:
        risks.append("High debt compared to revenue.")
        recommendations.append("Consider restructuring liabilities or reducing debt exposure.")
    else:
        insights.append("Debt levels are manageable.")

    # Leverage risk
    if leverage_ratio is not None and leverage_ratio > 0.5:
        risks.append("High leverage relative to assets.")
        recommendations.append("Avoid additional borrowing until leverage improves.")

    # Loan readiness
    if credit_score >= 750:
        loan_readiness = "High"
        recommendations.append("Eligible for working capital or term loans.")
    elif credit_score >= 650:
        loan_readiness = "Moderate"
        recommendations.append("May qualify for secured loans or NBFC products.")
    else:
        loan_readiness = "Low"
        recommendations.append("Improve profitability and cash flow before seeking credit.")

    return {
        # Metrics
        "credit_score": int(credit_score),
        "profit": float(profit),
        "cash_flow": float(cash_flow),
        "debt_ratio": float(debt_ratio),
        "leverage_ratio": float(leverage_ratio) if leverage_ratio is not None else None,

        # Manual insights
        "health_summary": insights,
        "risk_flags": risks,
        "recommendations": recommendations,
        "loan_readiness": loan_readiness,
    }

def generate_ai_insights(metrics: dict, forecast: dict):
    prompt = f"""
You are a financial advisor for small and medium businesses.

Current financial metrics:
{json.dumps(metrics, indent=2)}

Next-month forecast based on recent trends:
{json.dumps(forecast, indent=2)}

Tasks:
1. Explain the current financial health in simple terms
2. Identify existing financial risks
3. Identify any new risks visible from the forecast
4. Suggest 3 actionable improvements the business should take now
5. Comment on loan readiness for the next month
6. Recommend suitable financial products (bank / NBFC / working capital)
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        # 🔥 REQUIRED FOR THIS MODEL
        "reasoning": { "enabled": True }
    }

    response = requests.post(
        OPENROUTER_URL,
        headers=headers,
        data=json.dumps(payload),
        timeout=60
    )

    if response.status_code != 200:
        raise Exception(f"OpenRouter error: {response.text}")

    data = response.json()

    # Return ONLY final assistant content (safe for frontend)
    return data["choices"][0]["message"]["content"]
