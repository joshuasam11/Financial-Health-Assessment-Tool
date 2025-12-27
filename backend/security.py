from cryptography.fernet import Fernet
import os

fernet = Fernet(os.getenv("ENCRYPTION_KEY"))

def encrypt_data(data: str) -> bytes:
    return fernet.encrypt(data.encode())

def decrypt_data(token: bytes) -> str:
    return fernet.decrypt(token).decode()
