from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse 
from pydantic import BaseModel
#Jinja2
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles # Opcional


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


class Itens(BaseModel):
    host: str 
    port: int 
    user: str
    password: str
    commands: list

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
    return templates.TemplateResponse(
        name="index.html",
        context={"request": request}
    )

#PARA TESTES DE REQUISIÇÕES
@app.get("/form", response_class=HTMLResponse)
async def read_form(request: Request):
    return templates.TemplateResponse(name="form.html", context={"request": request})

class ItensForms(BaseModel):
    textarea: str
    tx: str
    elementoA: str
    intA: str
    elementoB: str
    intB: str
#ENVIA DADOS EM FORMATO JSON
@app.post("/submit_data", response_class=HTMLResponse)
def submit_data(request: Request, data: ItensForms):
    print(data)
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

