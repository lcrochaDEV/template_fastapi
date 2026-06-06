class ConnectJson {
    // 1. Atualizado para receber o token (opcional)
    static _myHeaders(token = null) {
        const headersObj = {
            'Content-Type': 'application/json',
        };

        // Se o token existir, adiciona o Bearer aos headers
        if (token) {
            headersObj['Authorization'] = `Bearer ${token}`;
        }

        return new Headers(headersObj);
    }
    
    // 2. Atualizado para receber o token e repassar adiante
    static _optionsOBJ(cacheData, token = null){
        return {
            method: "POST",
            body: JSON.stringify(cacheData),
            headers: this._myHeaders(token), // Passa o token aqui
            mode: "cors",
            cache: "default",
        };
    }

    // 3. Adicionado o parâmetro 'token' no método principal
    static async connectJsonUrlJson(URL, cacheData = null, token = null){
       
        // Passa o token para o criador de options
        let options = cacheData !== null ? this._optionsOBJ(cacheData, token) : null 
       
        try{
            const conexao = await fetch(URL, options)
            if(conexao.status === 200){
                const openConexao = await conexao.json();
                return openConexao;
            } else {
                return conexao;
            }
        }catch(error){
            console.log('Falha no link!', error)
        }
    }

    // 4. Adicionado o parâmetro 'token' também na versão Text
    static async connectJsonUrlText(URL, cacheData = null, token = null){
       
        let options = cacheData !== null ? this._optionsOBJ(cacheData, token) : null 
       
        try{
            const conexao = await fetch(URL, options)
            if(conexao.status === 200){
                const openConexao = await conexao.text();
                return openConexao;
            } else {
                return conexao;
            }
        }catch(error){
            console.log('Falha no link!', error)
        }
    }
}