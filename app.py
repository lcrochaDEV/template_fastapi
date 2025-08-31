from fastapi import FastAPI, Request
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
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
    max_age=3600,
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


@app.get("/home/{textarea}", response_class=HTMLResponse)
async def read_root(request: Request, textarea: str):
      return templates.TemplateResponse(
            name="index.html",
            context={"request": request, "textarea_content": textarea}
      )

class ItensForms(BaseModel):
   textarea: str
   tx: str
   elementoA: str
   intA: str
   elementoB: str
   intB: str

@app.get("/dash", response_class=HTMLResponse)
async def read_form(request: Request):
      return templates.TemplateResponse(
            name="index.html",
            context={"request": request}
      )

@app.post("/submit_data", response_class=HTMLResponse)
async def submit_data(request: Request, data: ItensForms):
    return templates.TemplateResponse(
        name="index.html",
        context={
            "request": request, 
            "textarea_content": data.textarea,
            "tx": data.tx,
            "elementoA": data.elementoA,
            "intA": data.intA,
            "elementoB": data.elementoB,
            "intB": data.intB
        }
    )