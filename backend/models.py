from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    # Encrypted JSON blob
    encrypted_data = Column(LargeBinary, nullable=False)

    # Non-sensitive metadata (for listing)
    credit_score = Column(Integer)
    loan_readiness = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")