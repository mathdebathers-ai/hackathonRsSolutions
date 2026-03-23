import os
import json
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração da IA
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

class ItemCardapio(BaseModel):
    id: int  
    nome: str
    valor: float 
    desc: str   

class DadosRecomendacao(BaseModel):
    texto: str
    cardapio: List[ItemCardapio]

@app.post("/recomendar")
async def recomendar(dados: DadosRecomendacao):
    # Prepara a lista total para a IA analisar
    cardapio_str = "\n".join([f"ID: {i.id} | {i.nome} | {i.desc}" for i in dados.cardapio])
    
    prompt = f"""
    Você é um sistema de filtragem de cardápio.
    ITENS DISPONÍVEIS:
    {cardapio_str}

    PREFERÊNCIAS: "{dados.texto}"

    MISSÃO:
    1. Liste TODOS os IDs que combinam com o que o cliente "quer".
    2. Remova QUALQUER item que contenha ingredientes que o cliente deseja "evitar".
    3. Itens neutros que não conflitam com as restrições também podem ser mantidos.
    
    Retorne APENAS o JSON no formato:
    {{"recomendados": [ {{"id": 1, "justificativa": "Pq este item passou no filtro"}} ]}}
    """
    
    try:
        response = model.generate_content(prompt)
        res_text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(res_text)
    except Exception as e:
        print(f"Erro: {e}")
        return {"recomendados": []}