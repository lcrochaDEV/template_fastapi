class CadastrarRal {
    static _myHeaders() {
        return new Headers({
            'Content-Type': 'application/json',
        });
    }
    
    static _optionsOBJ(objdata){
        return {
            method: "POST",
            body: JSON.stringify(objdata),
            headers: this._myHeaders(),
            mode: "cors",
            cache: "default",
        };
    }

    static async connectJsonUrlJson(URL, objdata){     
        let options = objdata !== null ? this._optionsOBJ(objdata) : null //POST <-> GET
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