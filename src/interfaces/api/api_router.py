from fastapi import APIRouter
from fastapi import Depends
from services.auth_service import get_current_user
from models.account_model import Account
from dotenv import load_dotenv
import os

load_dotenv()

teste = os.getenv("TESTE")


api_router = APIRouter()

@api_router.get("/")
def read_root():
    return {
        "Message": teste        
    }
