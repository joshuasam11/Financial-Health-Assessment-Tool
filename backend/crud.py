from models import FinancialReport

def save_report(db, metrics, insights):
    report = FinancialReport(
        profit=metrics["profit"],
        cash_flow=metrics["cash_flow"],
        debt_ratio=metrics["debt_ratio"],
        credit_score=metrics["credit_score"],
        ai_insights=insights
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report
