from fastapi import APIRouter,FastAPI, Query
from typing import List
from services.search_service import buscar_produtos


search_router = APIRouter(prefix="/products", tags=["Products"])

@search_router.get("/produtos", response_model=List[dict])
def search(nome: str = Query(..., description="Nome do produto para buscar")):
    list = buscar_produtos(nome)
    return list