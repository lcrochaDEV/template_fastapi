let txtarea = document.querySelector('.txtarea').textContent;
let trechos = document.querySelector('.trecho');


let pattern = /RMD|RMC|RMA|RMP/gm;
let trexoA = txtarea.match(pattern);

let ipan = trexoA.findIndex(itens => itens === 'RMC') || trexoA.findIndex(itens => itens === 'RMD') === 1
let tx = txtarea.search(/\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+/gm) !== -1; 
    if(tx){
        trechos.innerText = `TX`;
    }
    else if (ipan){
        trechos.innerText = `IP RAN`;
    }else {
        trechos.innerText = `IP NODEB`;
    }

let regexp2 = (exp) => {
    return `${exp.substring(0, 2)} ${exp.substring(2, 7)}`
}