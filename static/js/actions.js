//COPY TEXT
let source = document.querySelector("textarea");
let btn = document.querySelector('.copyall')    
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        source.select()
        document.execCommand('copy');
        document.conte
});

//TEXTO MAIUSCÚLO
//document.querySelector('.desig').textContent.toLocaleUpperCase();

//LOADING
let sr_onlys = document.querySelector(".loading");
let loadingStatus = () => sr_onlys.style.display === 'block' ? sr_onlys.style.display = 'none' : sr_onlys.style.display = 'block';

let alertaral = document.querySelector('.alertaral');
//VARRER ENDEREÇO DO SMARTPLAN
document.querySelector('.smartplan').addEventListener('click', async (event) => { //Botão
    event.preventDefault();
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
})

//Loading e Resposta com Número da RAL
document.querySelector('.btnpopup').addEventListener('click', async (event) => { //Botão
    event.preventDefault();
    loadingStatus();
    let ral = await criarRal();
    let regexp = /RAL\s\d+\/\d+/gm;
    let matchRal = ral.match(regexp)
    if(matchRal.length > -1) {
        source.value += `BILHETE:${matchRal[0]}`;
        alertaral.textContent = ral;
        loadingStatus();
    }else{
        alertaral.style.color = 'red';
        alertaral.textContent = ral;    
        loadingStatus();
    }
})
/*DIALOG*/
function switchTab(e, formId) {
    // Alternar botões
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Alternar formulários
    document.querySelectorAll('.form-content').forEach(form => form.classList.remove('active'));
    document.getElementById(formId).classList.add('active');
    document.querySelector('.alertsMsg').textContent = "";
}

// Fecha o dialog ao clicar fora dele (no backdrop)
const dialog = document.getElementById('auth-dialog');
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});

let postMecacheddataSir = document.querySelector("#form-sir").addEventListener('submit', async (event) => {
    event.preventDefault();
    let user = event.target.elements['user'].value;
    let passw = event.target.elements['passw'].value;
    let time = event.target.elements['session-time'].value;
    let chave = event.target[3].dataset.sir
 
    postMencached({chave, "valor": {user, passw}, "time": Number(time)});
});

let postMecacheddataSmartplan = document.querySelector("#form-smart").addEventListener('submit', async (event) => {
    event.preventDefault();
    let user = event.target.elements['user'].value;
    let passw = event.target.elements['passw'].value;
    let time = event.target.elements['session-time'].value;
    let chave = event.target[3].dataset.smartplan
 
    postMencached({chave, "valor": {user, passw}, "time": Number(time)});
});

//PREENCHE DADOS QUANDO COPIADO NO TEXTAREA
document.querySelector('.txtarea').addEventListener('input', async (event) => { 
    //Pega dados e abre RAL
    let desigtx = RegExp.regexpsearch(texto = event.data, /(?<tx>\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+)/gm, "tx");
    let ipran = RegExp.regexpsearch(texto = event.data, /(?<ipran>IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipran");
    let ipnodeb = RegExp.regexpsearch(texto = event.data, /(?<ipnodeb>IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+)/gm, "ipnodeb");

    let tx = event.data.search(/\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+/gm);
    let pattern = /RMD|RMC|RMA|RMP/gm;
    let trexoA = event.data.match(pattern) || [];
    let ipan = trexoA.findIndex(itens => itens === 'RMC') || trexoA.findIndex(itens => itens === 'RMD');

    if(tx !== -1) trechos.innerText = `TX`;
    else if (ipan === 1) trechos.innerText = `IP RAN`;
    else  trechos.innerText = `IP NODEB`;
    
    if(desigtx !== null)
        desigtxChange = desigtx;
    if(ipran !== null)
        ipranChange = ipran;
    if(ipnodeb !== null)
        ipnodebChange = ipnodeb;
    
    desig.textContent = desigtx ?? ipran ?? ipnodeb;

    let listRouter = event.data.match(/\w+\-\w+/gm);
    elementoA.innerText = listRouter[0];
    elementoB.innerText = listRouter[1];
    let interfaces = event.data.match(/\b(?:[A-Z-]*\d+)?\/\d+[\/\w-]*\b/gm);
    intA.innerText = interfaces[0];
    intB.innerText = interfaces[1];
    textarea = event.data;
})
