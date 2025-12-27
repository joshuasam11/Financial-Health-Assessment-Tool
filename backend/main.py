from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User
from schemas import UserCreate, Token
from analysis import analyze_financials, generate_ai_insights
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Header


import pandas as pd
import os
from dotenv import load_dotenv
from security import encrypt_data
from models import AnalysisHistory
import json
from fastapi import Depends
from auth import get_current_user  # your JWT dependency
from security import decrypt_data
import models  # 👈 THIS IS CRITICAL
from forecast import forecast_next_month
load_dotenv()
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# -------------------- UTILS --------------------

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# -------------------- AUTH --------------------

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        print("Signup attempt:", user.username)

        existing = db.query(User).filter(User.username == user.username).first()
        print("Existing user:", existing)

        if existing:
            raise HTTPException(status_code=400, detail="User already exists")

        new_user = User(
            username=user.username,
            hashed_password=hash_password(user.password)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print("User inserted with ID:", new_user.id)
        return {"message": "Signup successful"}

    except Exception as e:
        print("SIGNUP ERROR:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    return {"access_token": token}

@app.post("/logout")
def logout(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # In JWT-based systems, logout is handled client-side
    return {
        "status": "success",
        "message": "Logged out successfully"
    }


# -------------------- FINANCIAL ANALYSIS --------------------

@app.post("/full-analysis")
async def full_analysis(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    df = pd.read_csv(file.file)

    metrics = analyze_financials(df)
    forecast = forecast_next_month(df)

    try:
        ai_insights = generate_ai_insights(metrics, forecast)
    except Exception as e:
        print("AI ERROR:", e)
        ai_insights = (
            "AI unavailable. Rule-based analysis shown.\n\n"
            "Forecast Summary:\n"
            f"Predicted revenue: ₹{forecast.get('revenue')}\n"
            f"Predicted expenses: ₹{forecast.get('expenses')}\n"
            f"Predicted cash flow: ₹{forecast.get('cash_in', 0) - forecast.get('cash_out', 0)}"
        )

    # 🔐 Encrypt full report (metrics + forecast + AI)
    payload = json.dumps({
        "metrics": metrics,
        "forecast": forecast,
        "ai_insights": ai_insights,
    })

    encrypted_blob = encrypt_data(payload)

    history = AnalysisHistory(
        user_id=current_user.id,
        encrypted_data=encrypted_blob,
        credit_score=metrics["credit_score"],
        loan_readiness=metrics["loan_readiness"],
    )

    db.add(history)
    db.commit()

    return {
        "metrics": metrics,
        "forecast": forecast,
        "ai_insights": ai_insights,
    }


@app.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    records = (
        db.query(AnalysisHistory)
        .filter(AnalysisHistory.user_id == current_user.id)
        .order_by(AnalysisHistory.created_at.desc())
        .all()
    )

    return [
        {
            "id": r.id,
            "credit_score": r.credit_score,
            "loan_readiness": r.loan_readiness,
            "created_at": r.created_at,
        }
        for r in records
    ]



@app.get("/history/{history_id}")
def get_history_detail(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    record = (
        db.query(AnalysisHistory)
        .filter(
            AnalysisHistory.id == history_id,
            AnalysisHistory.user_id == current_user.id
        )
        .first()
    )

    if not record:
        raise HTTPException(status_code=404, detail="Not found")

    decrypted = decrypt_data(record.encrypted_data)
    return json.loads(decrypted)

