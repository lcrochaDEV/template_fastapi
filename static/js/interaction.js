let textarea = document.querySelector('.txtarea').value;
let trechos = document.querySelector('.trecho');
let desig = document.querySelector('.desig');
let elementoA = document.querySelector('.caixaA');
let intA = document.querySelector('.portA');
let elementoB = document.querySelector('.caixaB');
let intB = document.querySelector('.portB');


document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.txtarea').value = ""
    desig.textContent = "";
    elementoA.textContent = "";
    elementoB.textContent = "";
    intA.textContent = "";
    intB.textContent = "";
    textarea = "";
    trechos.textContent = "";
    console.log(event)

})

//DADOS COLADOS NO CAMPO TEXTAREA
let desigtxChange;
let ipranChange;
let ipnodebChange;

let tx = textarea.search(/\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+/gm);
let pattern = /RMD|RMC|RMA|RMP/gm;
let trexoA = textarea.match(pattern) || [];
let ipan = trexoA.findIndex(itens => itens === 'RMC') || trexoA.findIndex(itens => itens === 'RMD');

if(tx !== -1) trechos.innerText = `TX`;
else if (ipan === 1) trechos.innerText = `IP RAN`;
else  trechos.innerText = `IP NODEB`;

let regexp2 = (exp) => `${exp.substring(0, 2)} ${exp.substring(2, 7)}`;

