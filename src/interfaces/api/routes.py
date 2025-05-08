from fastapi import APIRouter
from .api_router import api_router 
from .account_router import account_router
from .search_router import search_router

routes = APIRouter()
routes.include_router(account_router)
routes.include_router(api_router)
routes.include_router(search_router)