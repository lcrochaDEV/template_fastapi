//COPY TEXT
const source = document.querySelector("textarea");
let btn = document.querySelector('.copyall')    
btn.addEventListener("click", (event) => {
    event.preventDefault();
    source.select()
    document.execCommand('copy');
    document.conte
});

document.querySelector('.desig').textContent.toLocaleUpperCase();

//LOADING
let sr_onlys = document.querySelector(".loading");
let loadingStatus = () => {
    sr_onlys.style.display === 'block' ? sr_onlys.style.display = 'none' : sr_onlys.style.display = 'block';
}

let textarea = document.querySelector('.txtarea');
let alertaral = document.querySelector('.alertaral');
//VERRER ENDEREÇO DO SMARTPLAN
document.querySelector('.smartplan').addEventListener('click', async (event) => { //Botão
    event.preventDefault();
    let data = await smartplan();
    if (data){
        loadingStatus();
        return bodyObj.arrayList.forEach((element, i) =>textarea.textContent += `${element}: ${data[i]}\n`);
    }
    loadingStatus();
})

//Loading e Resposta com Número da RAL
document.querySelector('.btnpopup').addEventListener('click', async (event) => { //Botão
    event.preventDefault();
    const ral = await criarRal();
    let regexp = /RAL\s\d+\/\d+/gm;
    let matchRal = ral.match(regexp)
    if (matchRal !== null) {
        textarea.value += `BILHETE:${matchRal[0]}`;
        alertaral.textContent = ral;
        loadingStatus();
    }else{
        alertaral.style.color = 'red';
        alertaral.textContent = ral;    
    }
    loadingStatus();   
})
