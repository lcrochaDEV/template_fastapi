let txtarea = document.querySelector('.txtarea').value;
let trechos = document.querySelector('.trecho');


let tx = txtarea.search(/\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+/gm); 
let pattern = /RMD|RMC|RMA|RMP/gm;
let trexoA = txtarea.match(pattern) || [];
let ipan = trexoA.findIndex(itens => itens === 'RMC') || trexoA.findIndex(itens => itens === 'RMD');

if(tx !== -1){
    trechos.innerText = `TX`;
}
else if (ipan === 1){
    trechos.innerText = `IP RAN`;
}else {
    trechos.innerText = `IP NODEB`;
}

let regexp2 = (exp) => {
    return `${exp.substring(0, 2)} ${exp.substring(2, 7)}`
}