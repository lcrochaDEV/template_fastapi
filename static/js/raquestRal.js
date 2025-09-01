//OBJETO TESTES
let ObjResponse = {
    textarea: "CHAMADO:                    \rTRECHO: PILSR01-RMP01 1/1/1 X PIPNA01-RMD01 1/3/11                    \rFALHA: LINK DOWN.                    \rDESIGNAÇÃO: IP RAN/PI LSR01/PI PNA01                    \rENDEREÇOS:\nPILSR01: Endereço: PROJETADA 39 DUNAS LUÍS CORREIA 64220000 0\nPIPNA01: Endereço: DEPUTADO PINHEIRO MACHADO S/N PIAUI PARNAÍBA 64208335 0\n",
    tx:"RJO AM RJO AM DP*V 0001",
    elementoA: "RJMAD01-RMD01",
    intA: "1/1/1",
    elementoB: "RJMAD01-RMD02",
    intB: "1/1/2"
}

//Busca de endereços no SMARTPLAN
/*
let bodyObj = {
    url: '',
    elementoA: elementoA.substring(0, 7),
    elementoB: elementoB.substring(0, 7),
}
let sr_only = document.querySelector(".loading");
sr_only.style.display = 'block';

let data =  await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8001/host', bodyObj);
if (data){
    sr_only.style.display = 'none';
    return `${elementoA.substring(0, 7)}: ${data.pontaA}\n${elementoB.substring(0, 7)}: ${data.pontaB}\n`
}
*/

//Pega dados e abre RAL
let textarea = document.querySelector('.txtarea').value;
let ral = document.querySelector('.btnpopup'); //Botão
async function criarRal () {
    let desigtx = regexpAberturaderal(/\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+/gm);
    let ipran = regexpAberturaderal(/IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+/gm);
    let ipnodeb = regexpAberturaderal(/IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+/gm); 
    let data = new Date();
    let datahora = `${data.toLocaleDateString()} - ${data.getHours()}:${data.getMinutes()}`;

    let bodyObj = {
        site: 'SIR',
        url: 'http://sir.nt.embratel.com.br/',
        xpathTags: '//title',
        tx: desigtx !== undefined ? desigtx : "",
        ipran: ipran !== undefined ? ipran : "",
        nodeb: ipnodeb !== undefined ? ipnodeb : "",
        textarea: ObjResponse.textarea,
        datahora: datahora,
        elementoA: ObjResponse.elementoA,
        intA: ObjResponse.intA,
        elementoB: ObjResponse.elementoB,
        intB: ObjResponse.intB
    }
    console.log(bodyObj)
    //return await CadastrarRal.connectJsonUrlJson('http://clr0an001372366.nt.embratel.com.br:8003/host', bodyObj);
}

let regexpAberturaderal = (patten) => {
    let capturatxt =  [... ObjResponse.textarea.matchAll(patten)];
    if(capturatxt.length !== 0){
        return capturatxt[0][0];
    }
}

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

let smartplanForm = document.querySelector(".smartplanForm");
smartplanForm.addEventListener('submit', async (event) => {
        //event.preventDefault();
        let bodyObj = {
            textarea: "TEXTO DO CAMPO TEXTAREA",
            tx:"RJO AM RJO AM DP*V 0001",
            elementoA: "RJMAD01-RMD01",
            intA: "1/1/1",
            elementoB: "RJMAD01-RMD02",
            intB: "1/1/2"
        }
        await ConnectJson.connectJsonUrlJson('http://localhost:8001/submit_form', bodyObj);
        window.location.href = "http://127.0.0.1:8001/submit_form"; 
    }
    
)