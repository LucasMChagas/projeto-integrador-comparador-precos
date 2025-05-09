from typing import List
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR,"..", "data", "produtos.json")

def buscar_produtos(nome: str):
    with open(file_path, "r", encoding="utf-8") as f:
        produtos = json.load(f)

    resultados = [
        produto for produto in produtos
        if nome.lower() in produto["nome"].lower()
    ]
    return resultados