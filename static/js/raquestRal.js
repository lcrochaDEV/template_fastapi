document.addEventListener('DOMContentLoaded', function() {
    smartplan();
});


let textarea = document.querySelector('.txtarea').value;

document.querySelector('.smartplan').addEventListener('click', (event) => {
    event.preventDefault();
    smartplan();
})
//Busca de endereços no SMARTPLAN
let smartplan = async () => {
    let patternDesig = /\w{5}\d{2}\-\w{3}\d{2}/gm;
    let desigCaixa = textarea.match(patternDesig);
    let desigCaixaList = [... desigCaixa]
    const removeDupicados = [...new Set(desigCaixaList.map(itens => itens.substring(0, 7)))];

    let bodyObj = {
        arrayList: removeDupicados
    }

    let sr_only = document.querySelector(".loading");
    sr_only.style.display = 'block';

    //let data =  await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8001/host', bodyObj);
    if (data){
        sr_only.style.display = 'none';
        /*return bodyObj.arrayList.forEach((element, i) => {
            console.log(`${element}: ${data[i]}`);
        })*/
    }
    console.log(bodyObj.arrayList)
}

//Pega dados e abre RAL
//EXEMPLOS: RegExp.regexpsearch(texto = texto, /PROBLEMA:\s?(?<falha>\w+\s\w+)/gm, "falha")
let desigtx = RegExp.regexpsearch(texto = textarea, /(?<tx>\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+)/gm, "tx")
let ipran = RegExp.regexpsearch(texto = textarea, /(?<ipran>IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipran")
let ipnodeb = RegExp.regexpsearch(texto = textarea, /(?<ipnodeb>IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipnodeb")
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
        tx: desigtx && undefined,
        ipran: ipran && undefined,
        nodeb: ipnodeb && undefined,
        textarea: ObjResponse.textarea,
        datahora: datahora,
        elementoA: ObjResponse.elementoA,
        intA: ObjResponse.intA,
        elementoB: ObjResponse.elementoB,
        intB: ObjResponse.intB
    }
    //return await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8003/host', bodyObj);
}

let ral = document.querySelector('.btnpopup'); //Botão
//Loading e Resposta com Número da RAL
ral.addEventListener('click', async (event) => {
    event.preventDefault();
    let sr_only = document.querySelector(".loading");
    sr_only.style.display = 'block';
    const ral = await criarRal();
    let textarea = document.querySelector('.txtarea');
    let alertaral = document.querySelector('.alertaral');
    let regexp = /RAL\s\d+\/\d+/gm;
    let matchRal = ral.match(regexp)
    if (matchRal !== null) {
        textarea.value += `BILHETE:${matchRal[0]}`;
        alertaral.textContent = ral;
        sr_only.style.display = 'none';
    }else{
        alertaral.style.color = 'red';
        alertaral.textContent = ral;    
        sr_only.style.display = 'none';   
    }
})
