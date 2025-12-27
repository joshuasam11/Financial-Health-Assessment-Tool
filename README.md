# 📊 Financial Health Assessment Tool (AI-Powered)

A secure, AI-powered financial analysis platform designed for **Small and Medium Enterprises (SMEs)**.  
The system analyzes uploaded financial data, identifies risks, forecasts next-month performance, and provides actionable insights and loan recommendations in simple, business-friendly language.

---

## 🚀 Problem Statement

SMEs often struggle to:
- Understand financial statements
- Detect risks early
- Prepare for loans or investor scrutiny
- Anticipate short-term cash flow issues

Most existing tools are either **too technical** or **purely backward-looking**.

👉 This project solves that by combining **rule-based financial analysis**, **AI insights**, and **short-term forecasting** in a **secure, easy-to-use dashboard**.

---

## 🧠 Key Features

### 🔐 Secure Authentication
- User signup & login
- Passwords hashed using **bcrypt**
- JWT-based authentication
- Protected routes for sensitive data

---

### 📂 Financial Data Upload
- Upload monthly financial data as a **CSV file**
- Supports:
  - Revenue
  - Expenses
  - Cash inflow & outflow
  - Liabilities
  - Assets
- Automatic validation before analysis

---

### 📈 Financial Health Analysis (Rule-Based)
Automatically computes:
- Profit
- Cash Flow
- Debt Ratio
- Leverage Ratio
- Credit Score (rule-based)
- Loan Readiness (Low / Moderate / High)

Works even if AI services are unavailable.

---

### 🔮 Next-Month Financial Forecasting
- Uses **trend-based linear projection**
- Predicts next month’s:
  - Revenue
  - Expenses
  - Cash flow
- Requires only **3+ months of data**
- Fully explainable (no black-box ML)

> Forecasts help businesses anticipate risks **before** they occur.

---

### 🤖 AI-Powered Financial Advisor
- Uses **OpenRouter LLMs**
- Generates:
  - Plain-English financial explanation
  - Risk analysis
  - Preventive recommendations
  - Loan & NBFC product suggestions
- AI receives:
  - Current metrics
  - Next-month forecast
- Graceful fallback if AI quota is exceeded

---

### 📊 Interactive Dashboard
- KPI cards for quick insights
- Charts using **Chart.js**
- Color-coded loan readiness
- Expandable AI report
- One-click **PDF download**

---

### 🕓 Historical Analysis Tracking
- Every analysis is:
  - Encrypted
  - Stored per user
  - Timestamped
- Users can:
  - View past analyses
  - Reopen full AI reports
  - Track financial health over time

---

## 🔒 Security Mechanisms

### Password Security
- Passwords hashed using **bcrypt**
- No plain-text password storage

### JWT Authentication
- Secure access tokens
- Protected API routes
- Automatic logout & token cleanup

### Encrypted Financial Data Storage
- Financial analysis results encrypted using **Fernet**
- Encryption key stored in environment variables
- Decryption happens only server-side

### User Data Isolation
- Each analysis linked to a specific user
- Users can access only their own history
- Backend enforces ownership checks

---

## 🔮 Forecasting Method (How It Works)

The system uses **trend-based forecasting**:

1. Extract monthly values from CSV  
2. Compute average month-to-month change  
3. Predict next value using:


This approach is:
- Fast
- Explainable
- Suitable for short-term planning
- Ideal for SMEs

A disclaimer is shown:
> *Forecasts are indicative and based on historical trends.*

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Chart.js
- React Markdown

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pandas
- JWT Authentication
- Fernet Encryption

### AI
- OpenRouter LLM APIs
- Reasoning-enabled responses
- Fallback logic for quota limits

---

## 📁 Project Structure

frontend/

├── pages/

├── components/

└── utils/

backend/

├── main.py

├── analysis.py

├── forecast.py

├── models.py

├── schemas.py

├── database.py

├── security.py

└── auth.py
