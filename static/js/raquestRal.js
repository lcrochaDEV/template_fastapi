let textarea = document.querySelector('.txtarea').value || null
let elementoA = document.querySelector('.caixaA').textContent;
let intA = document.querySelector('.portA').textContent;
let elementoB = document.querySelector('.caixaB').textContent;
let intB = document.querySelector('.portB').textContent;

document.addEventListener('DOMContentLoaded', async () => {
    let textarea = document.querySelector('.txtarea');
    loadingStatus();
    let data = await smartplan();
    if (data){
        data.forEach(element => textarea.textContent += `${element}\n`);
        loadingStatus();
    }
});

//Pega dados e abre RAL
let desigtx = RegExp.regexpsearch(texto = textarea, /(?<tx>\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+)/gm, "tx");
let ipran = RegExp.regexpsearch(texto = textarea, /(?<ipran>IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipran");
let ipnodeb = RegExp.regexpsearch(texto = textarea, /(?<ipnodeb>IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipnodeb");

let data = new Date();
let datahora = `${data.toLocaleDateString()} - ${data.getHours()}:${data.getMinutes()}`;

let designacao = document.querySelectorAll('.desig')
    designacao.forEach(desig => {
    desig.textContent = desigtx ?? ipran ?? ipnodeb;
});

async function criarRal () {
    let bodyObj = {
        site: 'SIR',
        url: 'http://sir.nt.embratel.com.br/',
        xpathTags: '//title',
        tx: desigtx ?? "",
        ipran: ipran ?? "",
        nodeb: ipnodeb ?? "",
        textarea: textarea,
        datahora: datahora,
        elementoA: elementoA,
        intA: intA,
        elementoB: elementoB,
        intB: intB
    }
    return await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8003/host', bodyObj);
}


//Busca de endereços no SMARTPLAN
let smartplan = async () => {
    let patternDesig = /\w{5}?\w?\d\-\w{3}\d{2}/gm;
    let desigCaixa = textarea.match(patternDesig);
    let desigCaixaList = [... desigCaixa]
    const removeDupicados = [... new Set(desigCaixaList.map(itens => itens.substring(0, 7)))]; //RETIRA OS DUPLICADOS

    let bodyObj = {
        endList: removeDupicados
    }
    return await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8001/host', bodyObj);
}