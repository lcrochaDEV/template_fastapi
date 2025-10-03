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

//VERRER ENDEREÇO DO SMARTPLAN
document.querySelector('.smartplan').addEventListener('click', async (event) => { //Botão
    event.preventDefault();
    alert('oi')
})
