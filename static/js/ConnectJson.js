class ConnectJson {
    static _myHeaders() {
        return new Headers({
            'Content-Type': 'application/json',
        });
    }
    
    static _optionsOBJ(cacheData){
        return {
            method: "POST",
            body: JSON.stringify(cacheData),
            headers: this._myHeaders(),
            mode: "cors",
            cache: "default",
        };
    }

    static async connectJsonUrlJson(URL, cacheData = null){
       
        let options = cacheData !== null ? this._optionsOBJ(cacheData) : null //POST <-> GET
       
        try{
            const conexao = await fetch(URL, options)
            if(conexao.status === 200){
                const openConexao = await conexao.json();
                return openConexao;
            } else {
                return conexao;
            }
        }catch(error){
            console.log('Falha no link!')
        }
    }
    static async connectJsonUrlText(URL, cacheData = null){
       
        let options = cacheData !== null ? this._optionsOBJ(cacheData) : null //POST <-> GET
       
        try{
            const conexao = await fetch(URL, options)
            if(conexao.status === 200){
                const openConexao = await conexao.text();
                return openConexao;
            } else {
                return conexao;
            }
        }catch(error){
            console.log('Falha no link!')
        }
    }
}