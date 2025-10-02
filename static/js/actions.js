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
