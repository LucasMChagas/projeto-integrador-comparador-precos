from fastapi import FastAPI, Query
from typing import List
import json

def buscar_produtos(nome: str):
    with open("/data/produtos.json", "r", encoding="utf-8") as f:
        produtos = json.load(f)

    resultados = [
        produto for produto in produtos
        if nome.lower() in produto["nome"].lower()
    ]
    return resultados