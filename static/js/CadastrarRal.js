class CadastrarRal {
    static _myHeaders() {
        return new Headers({
            'Content-Type': 'application/json',
        });
    }
    
    static _optionsOBJ(payload){
        return {
            method: "POST",
            body: JSON.stringify(payload),
            headers: this._myHeaders(),
            mode: "cors",
            cache: "default",
        };
    }

    static async connectJsonUrlJson(URL, payload ){     
        let options = payload !== null ? this._optionsOBJ(payload) : null //POST <-> GET
        try{
            const conexao = await fetch(URL, options)
            if(conexao.status === 200){
                const openConexao = await conexao.json();
                return openConexao;
            } else {
                return conexao;
            }
        }catch(error){
            throw new Error("Erro no servidor");
        }
    }
}