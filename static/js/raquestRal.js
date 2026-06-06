//let textarea = document.querySelector('.txtarea').value;
//Pega dados e abre RAL
let desigtx = RegExp.regexpsearch(texto = textarea, /(?<tx>\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|(?<=DESIGNAÇÃO:\s)\w+\s+\w+\s+\w+\s\w+\s\w+\*\w\s\d+)/gm, "tx");
let ipran = RegExp.regexpsearch(texto = textarea, /(?<ipran>IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipran");
let ipnodeb = RegExp.regexpsearch(texto = textarea, /(?<ipnodeb>IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipnodeb");

/*
document.addEventListener('DOMContentLoaded', async () => {;
    let textarea = document.querySelector('.txtarea');
    loadingStatus();
    let data = await smartplan();
    if (typeof(data) !== "string"){
        data.forEach(element => textarea.value += `${element}\n`);
        loadingStatus();
    }else{
        alertaral.style.color = 'red';
        alertaral.textContent = data;    
        loadingStatus();      
    }
});
*/

//Busca de endereços no SMARTPLAN
let smartplan = async () => {
        // 1. Recupera o objeto do cookie
    const dadosSessao = CookieManager.get("session_token_smartplan");

    // 2. Valida se o cookie existe e se tem o ID da sessão
    if (!dadosSessao || !dadosSessao.sessaoId) {
        console.error("Necessário fazer login (Token não encontrado no cookie)");
        return;
    }

    // Extrai o UUID puro do objeto
    const uuidPuro = dadosSessao.sessaoId; 

    let textarea = document.querySelector('.txtarea').value 
    let patternDesig = /\w{6}?\w?\d?\-\w{3}\d{2}|\w{5}?\w?\d\-\w{3}\d{2}/gm;
    let desigCaixa = textarea.match(patternDesig) || [];
    if (!desigCaixa) return; 
    let desigCaixaList = [... desigCaixa];
    const removeDupicados = [... new Set(desigCaixaList.map(itens => itens.substring(0, 7)))]; //RETIRA OS DUPLICADOS

    let payload = {
        endList: removeDupicados
    };
    // 1. Corrigido para ConnectJson (ou o nome real da sua classe)
    let data = await ConnectJson.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8001/host', payload, uuidPuro);
    
    // 2. Validação para evitar erro de "undefined" caso o fetch falhe ou retorne o JSON direto
    if (data && data.status) return data.status;
    
    return data; // Retorna o objeto JSON completo caso ele não tenha a propriedade .status
}

let data = new Date();
let datahora = `${data.toLocaleDateString()} - ${data.getHours()}:${data.getMinutes()}`;
let designacao = document.querySelectorAll('.desig').forEach(desig => desig.value = desigtx ?? ipran ?? ipnodeb);
/*
async function criarRal () {
    // 1. Recupera o objeto do cookie
    const dadosSessao = CookieManager.get("session_token_sirRobot");

    // 2. Valida se o cookie existe e se tem o ID da sessão
    if (!dadosSessao || !dadosSessao.sessaoId) {
        console.error("Necessário fazer login (Token não encontrado no cookie)");
        return;
    }

    // Extrai o UUID puro do objeto
    const uuidPuro = dadosSessao.sessaoId; 
    console.log(uuidPuro)

    let textarea = document.querySelector('.txtarea').value;
    let payload = {
        site: 'SIR',
        url: 'http://sir.nt.embratel.com.br/',
        xpathTags: '//title',
        tx: desigtx ?? desigtxChange ?? "",
        ipran: ipran ?? ipranChange ?? "",
        nodeb: ipnodeb ?? ipnodebChange ?? "",
        textarea: textarea,
        datahora: datahora,
        elementoA: elementoA.textContent,
        intA: intA.textContent,
        elementoB: elementoB.textContent,
        intB: intB.textContent
    }
    let data = await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8003/host', payload, uuidPuro);
    return data.status;
    /*try {

        const resposta = await fetch('http://clr0an001372366.nt.embratel.com.br:8003/host', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${uuidPuro}` // Envia: Bearer c4e66ff5-931c-...
            },
            body: JSON.stringify(payload)
        });
        
        return await resposta.json();
    } catch (error) {
        console.error("Erro na comunicação com o servidor Sir:", error);
        return { error: "Erro de conexão com o servidor." };
    }
}*/
async function criarRal () {
    // 1. Recupera o objeto do cookie
    const dadosSessao = CookieManager.get("session_token_sirRobot");

    // 2. Valida se o cookie existe e se tem o ID da sessão
    if (!dadosSessao || !dadosSessao.sessaoId) {
        console.error("Necessário fazer login (Token não encontrado no cookie)");
        return;
    }

    // Extrai o UUID puro do objeto
    const uuidPuro = dadosSessao.sessaoId; 
    console.log(uuidPuro);

    let textarea = document.querySelector('.txtarea').value;
    let payload = {
        site: 'SIR',
        url: 'http://sir.nt.embratel.com.br/',
        xpathTags: '//title',
        tx: desigtx ?? desigtxChange ?? "",
        ipran: ipran ?? ipranChange ?? "",
        nodeb: ipnodeb ?? ipnodebChange ?? "",
        textarea: textarea,
        datahora: datahora,
        elementoA: elementoA.textContent,
        intA: intA.textContent,
        elementoB: elementoB.textContent,
        intB: intB.textContent
    };

    // 1. Corrigido para ConnectJson (ou o nome real da sua classe)
    let data = await ConnectJson.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8003/host', payload, uuidPuro);
    
    // 2. Validação para evitar erro de "undefined" caso o fetch falhe ou retorne o JSON direto
    if (data && data.status) return data.status;
    
    return data; // Retorna o objeto JSON completo caso ele não tenha a propriedade .status
}

let postMencached = async(data = {chave, "valor": {user, passw}, expiracao}) => {

    let alertsMsg = document.querySelector('.alertsMsg');
    try {
        let gravar = await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8009/cache/gravar', data);
        const response = await gravar.json();
        alertsMsg.style.display = "block";
        console.log(response)
        if (response && (response.status === "sucesso" || response.uuid)) {
            alertsMsg.style.color = "green";
            alertsMsg.textContent = "Cadastrado com sucesso";

            const tokenUuid = response.uuid;
            const loginUsuario = response.user;

            // Converte os segundos retornados pelo backend em dias para a fórmula do CookieManager
            const segundosBackend = response.tempo_expiracao_segundos || data.expiracao;
            const tempoEmDias = segundosBackend / (24 * 60 * 60);

            const dadosSessao = { sessaoId: tokenUuid, usuario: loginUsuario };
            
            // GRAVAÇÃO EXATA: O nome do cookie será o UUID puro
            CookieManager.set(`session_token_${data.chave}`, dadosSessao, tempoEmDias);
      

        } else {
            alertsMsg.style.color = "red";
            alertsMsg.textContent = "Usuário ou Senha Incorretos";
        }
    
    } catch (error) {
        alertsMsg.style.display = "block";
        alertsMsg.style.color = "orange";
        alertsMsg.textContent = "Erro de conexão com o servidor.";
    }
}
    