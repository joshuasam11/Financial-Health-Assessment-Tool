import pandas as pd

PREDICT_COLUMNS = [
    "revenue",
    "expenses",
    "cash_in",
    "cash_out",
    "liabilities",
    "assets",
]

def forecast_next_month(df: pd.DataFrame):
    forecast = {}

    for col in PREDICT_COLUMNS:
        if col not in df.columns:
            continue

        values = df[col].astype(float).values

        # If only 1 month, just repeat last value
        if len(values) < 2:
            forecast[col] = round(values[-1], 2)
            continue

        # Simple trend projection
        deltas = [values[i] - values[i - 1] for i in range(1, len(values))]
        avg_change = sum(deltas) / len(deltas)

        forecast[col] = round(values[-1] + avg_change, 2)

    return forecast
