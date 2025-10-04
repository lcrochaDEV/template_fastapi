from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse 
from pydantic import BaseModel
#Jinja2
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles # Opcional

import httpx

from dotenv import load_dotenv
import os

load_dotenv()

APICACHE_SERVERS = os.getenv("APICACHE_SERVERS")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "*"
]
# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite requisições de qualquer origem
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)
# Configuração para o Jinja2
templates = Jinja2Templates(directory="templates") # O FastAPI precisa ser informado do local dos templates

# Configuração para ficheiros estáticos (opcional)
app.mount("/static", StaticFiles(directory="static"), name="static")

class ItensForms(BaseModel):
    textarea: str
    tx: str
    elementoA: str
    intA: str
    elementoB: str
    intB: str
    
@app.get("/")
def read_root():
    return {"Hello": "World"}

#ENVIA DADOS POR URL
@app.get("/home/{textarea}", response_class=HTMLResponse)
async def read_root(request: Request, textarea: str):
    return templates.TemplateResponse(
        name="index.html",
        context={"request": request, "textarea_content": textarea}
    )

#DASHBOAR PARA VISUALIZAÇÃO
@app.get("/dash", response_class=HTMLResponse)
async def read_form(request: Request):
    # 2. Consumo da API com httpx
    # O uso do bloco 'async with' garante que a conexão seja fechada corretamente
    async with httpx.AsyncClient() as client:
        try:
            # Faz a requisição GET
            response = await client.get(APICACHE_SERVERS)
            # Levanta uma exceção para erros HTTP (4xx ou 5xx)
            response.raise_for_status() 

            # Converte a resposta JSON em um objeto Python (lista de dicionários)
            api_data_wrapper = response.json()
            dados_api = api_data_wrapper.get('valor', {})

        except httpx.HTTPStatusError as e:
            # Lidar com erros de status HTTP
            print(f"Erro HTTP ao buscar dados: {e}")
            dados_api = {}
            #dados_api = [{"error": f"Não foi possível buscar dados: {e.response.status_code}"}]
        except httpx.RequestError as e:
            # Lidar com erros de requisição (conexão, DNS, etc.)
            print(f"Erro de requisição: {e}")
            dados_api = [{"error": "Erro de conexão com a API externa."}]
            
    # 3. Passando os dados da API para o template no 'context'
    return templates.TemplateResponse(
        name="index.html",
        context={
            "request": request, 
            "textarea": dados_api.get('textarea', ''),
            "tx": dados_api.get('tx', 'Dados não encontrados'),
            "elementoA": dados_api.get('elementoA', ''),
            "intA": dados_api.get('intA', ''),
            "elementoB": dados_api.get('elementoB', ''),
            "intB": dados_api.get('intB', '')
        }
    )


#PARA TESTES DE REQUISIÇÕES
@app.get("/form", response_class=HTMLResponse)
async def read_form(request: Request):
    return templates.TemplateResponse(name="form.html", context={"request": request})

#ENVIA DADOS EM FORMATO JSON
@app.post("/submit_data", response_class=HTMLResponse)
def submit_data(request: Request, data: ItensForms):
    context = {
        "request": request, 
        "textarea":  data.textarea,
        "tx": data.tx,
        "elementoA": data.elementoA,
        "intA": data.intA,
        "elementoB": data.elementoB,
        "intB": data.intB
    }
    return templates.TemplateResponse("index.html", context)

#ENVIA OS DADOS PARA O PRÓXIMO FORM
@app.post("/submit_form", response_class=HTMLResponse)
async def submit_data(request: Request, 
        textarea: str = Form(...), 
        tx: str = Form(...), 
        elementoA: str = Form(...), 
        intA: str = Form(...), 
        elementoB: str = Form(...), 
        intB: str = Form(...)
):
    print(tx)
    context = {
        "request": request, 
        "textarea": textarea,
        "tx": tx,
        "elementoA": elementoA,
        "intA": intA,
        "elementoB": elementoB,
        "intB": intB
    }
    return templates.TemplateResponse("index.html", context)

