//let textarea = document.querySelector('.txtarea').value;
//Pega dados e abre RAL
let desigtx = RegExp.regexpsearch(texto = textarea, /(?<tx>\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|(?<=DESIGNAÇÃO:\s)\w+\s+\w+\s+\w+\s\w+\s\w+\*\w\s\d+)/gm, "tx");
let ipran = RegExp.regexpsearch(texto = textarea, /(?<ipran>IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipran");
let ipnodeb = RegExp.regexpsearch(texto = textarea, /(?<ipnodeb>IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipnodeb");


// /(?<=DESIGNAÇÃO:\s)\w+\s+\w+\s+\w+\s\w+\s\w+\*\w\s\d+/gm
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
    let textarea = document.querySelector('.txtarea').value 
    let patternDesig = /\w{6}?\w?\d?\-\w{3}\d{2}|\w{5}?\w?\d\-\w{3}\d{2}/gm;
    let desigCaixa = textarea.match(patternDesig) || [];
    if (!desigCaixa) return; 
    let desigCaixaList = [... desigCaixa];
    const removeDupicados = [... new Set(desigCaixaList.map(itens => itens.substring(0, 7)))]; //RETIRA OS DUPLICADOS

    let bodyObj = {
        endList: removeDupicados
    }
    return await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8001/host', bodyObj);
}

let data = new Date();

let datahora = `${data.toLocaleDateString()} - ${data.getHours()}:${data.getMinutes()}`;

let designacao = document.querySelectorAll('.desig').forEach(desig => desig.value = desigtx ?? ipran ?? ipnodeb);

async function criarRal () {
    let bodyObj = {
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
    
    console.log(bodyObj)
    return await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8003/host', bodyObj);
}


let postMencached = async(data = {chave, "valor": {user, passw}, expiracao}) => {
    console.log(data)
    let alertsMsg = document.querySelector('.alertsMsg');
    try {
        let gravar = await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8009/cache/gravar', data);
        alertsMsg.style.display = "block";
        
        if(gravar){
            alertsMsg.style.color = "green";
            alertsMsg.textContent = "Cadastrado com sucesso";
        }else{
            alertsMsg.style.color = "red";
            alertsMsg.textContent = "Usuario ou Senha Incorretos";
        }
    
    } catch (error) {
        // Tratamento para falhas de rede ou servidor offline
        alertsMsg.style.display = "block";
        alertsMsg.style.color = "orange";
        alertsMsg.textContent = "Erro de conexão com o servidor.";
    }
}

