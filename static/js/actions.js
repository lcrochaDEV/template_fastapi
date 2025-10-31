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
let loadingStatus = () => {
   sr_onlys.style.display === 'block' ? sr_onlys.style.display = 'none' : sr_onlys.style.display = 'block';
}

let alertaral = document.querySelector('.alertaral');
//VARRER ENDEREÇO DO SMARTPLAN
document.querySelector('.smartplan').addEventListener('click', async (event) => { //Botão
    event.preventDefault();
    let textarea = document.querySelector('.txtarea');
    loadingStatus();
    let data = await smartplan();
    if (typeof(data) !== "string"){
        data.forEach(element => textarea.textContent += `${element}\n`);
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
