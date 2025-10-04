### Para Instalação no Windows 10 foi criado um Ambiente Virtual

### Instalação do ambiente Virtual

```shell
python -m venv .venv
```

### Ativação do ambiente virtual no Windows

```shell
.venv/Scripts/activate
```

### Para Instalação no Debia 12 foi criado um Ambiente Virtual
 #### Crie um ambiente virtual usando venv ou virtual env Certifique-se venv de que esteja instalado executando:
```shell
sudo apt install python3-venv
```
#### Para criar um novo ambiente virtual em um **diretório chamado env**, execute:
```shell
python3 -m venv env
```
#### Para ativar este ambiente virtual (que modifica a PATH variável de ambiente), execute:
```shell
source env/bin/activate
```
#### Agora você pode instalar uma biblioteca neste ambiente virtual:
```shell
pip install XYZ
```
Os arquivos serão instalados no env/diretório.

Se quiser sair do ambiente virtual, você pode executar:
```shell
deactivate
```

### Instalação de Bibliotecas: 
```shell
pip install python-dotenv
```
#### Iniciando o servidor Uvincorn
```shell
uvicorn app:app --reload
```

### strutura do arquivo JSON para manipulação de dados

#### Envio de body pora http://127.0.0.1:8001/submit_data
```json
{
    "textarea": "192.168.1.1",
    "tx":"",
    "elementoA": "",
    "intA": "",
    "elementoB": "",
    "intB": ""
}
```

### VARIAVEL DE AMBIENTE
```.env
APICACHE_SERVERS=http://api-cache-server:8000/cache/recuperar/lcrocha
```