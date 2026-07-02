// ELEMENTOS GLOBAIS DO DOM
const btnCopy = document.querySelector('.copyall');
const sr_onlys = document.querySelector(".loading");
const alertaral = document.querySelector('.alertaral');
const textareaElement = document.querySelector('.txtarea');


//COPY TEXT
let btn = document.querySelector('.copyall')    
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        textareaElement.select()
        document.execCommand('copy');
});

//TEXTO MAIUSCÚLO
//document.querySelector('.desig').textContent.toLocaleUpperCase();

//LOADING
const loadingStatus = (loading_active = true) => {
    if (!sr_onlys) return;
    sr_onlys.style.display = loading_active ? 'block' : 'none';
};

//VARRER ENDEREÇO DO SMARTPLAN
document.querySelector('.smartplan')?.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!textareaElement) return;
    
    loadingStatus(true);
    alertaral.style.display = "none";
    
    try {
        let data = await smartplan();
        if (data && typeof data !== "string" && Array.isArray(data)) {
            data.forEach(element => textareaElement.value += `${element}\n`);
            loadingStatus(false);
        } else {
            throw new Error(data || "Erro desconhecido no Smartplan");
        }
    } catch (error) {
        alertaral.style.display = "block";
        alertaral.style.color = 'red';
        alertaral.textContent = error.message;    
        loadingStatus(false);
    }
});

//Loading e Resposta com Número da RAL
document.querySelector('.btnpopup')?.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!textareaElement) return;

    loadingStatus(true);
    alertaral.style.display = "none";
    
    try {
        let ral = await criarRal();
        let regexp = /RAL\s\d+\/\d+/gm;
        let matchRal = ral.match(regexp);
        
        if (matchRal) {
            textareaElement.value += `BILHETE:${matchRal[0]}`;
            alertaral.style.display = "block";
            alertaral.style.color = '#fff';
            alertaral.textContent = ral;
        } else {
            throw new Error(ral);
        }
    } catch (error) {
        alertaral.style.display = "block";
        alertaral.style.color = 'red';
        alertaral.textContent = error.message;    
    } finally {
        loadingStatus(false);
    }
});

/*DIALOG*/
function switchTab(e, formId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');

    document.querySelectorAll('.form-content').forEach(form => form.classList.remove('active'));
    const targetForm = document.getElementById(formId);
    if (targetForm) targetForm.classList.add('active');
    
    const alertsMsg = document.querySelector('.alertsMsg');
    if (alertsMsg) alertsMsg.textContent = "";
}

// Fecha o dialog ao clicar fora dele (no backdrop)
const dialog = document.getElementById('auth-dialog');
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});

let postMecacheddataSir = document.querySelector("#form-sir").addEventListener('submit', async (event) => {
    event.preventDefault();
    // 1. Validação casada antes de processar
    const sessaoValida = await verificarSessaoValida();
    let alertsMsg = document.querySelector('.alertsMsg');
    
    if (sessaoValida) {
        alertsMsg.style.display = "block";
        alertsMsg.style.color = "blue";
        alertsMsg.textContent = "Você já possui uma sessão ativa válida no SIR!";
        return; // Interrompe aqui para não regravar sem necessidade
    }
    let user = event.target.elements['user'].value;
    let passw = event.target.elements['passw'].value;
    let expiracao = event.target.elements['session-time'].value;
    let chave = event.target[3].dataset.sir;

    postMencached({chave, "valor": {user, passw}, "expiracao": Number(expiracao)});
});

let postMecacheddataSmartplan = document.querySelector("#form-smart").addEventListener('submit', async (event) => {
    event.preventDefault();
    // 1. Validação casada antes de processar
    const sessaoValida = await verificarSessaoValida();
    let alertsMsg = document.querySelector('.alertsMsg');
    
    if (sessaoValida) {
        alertsMsg.style.display = "block";
        alertsMsg.style.color = "blue";
        alertsMsg.textContent = "Você já possui uma sessão ativa válida no Smartplan!";
        return; // Interrompe aqui para não regravar sem necessidade
    }

    let user = event.target.elements['user'].value;
    let passw = event.target.elements['passw'].value;
    let expiracao = event.target.elements['session-time'].value;
    let chave = event.target[3].dataset.smartplan;
 
    postMencached({chave, "valor": {user, passw}, "expiracao": Number(expiracao)});
});

//PREENCHE DADOS QUANDO COPIADO NO TEXTAREA
document.querySelector('.txtarea').addEventListener('input', async (event) => preencheTextarea(textareaElement.value))

//let desigtx = RegExp.regexpsearch(texto = event.data, /(?<tx>\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\w{2}\*\w\s\d{4}|\w{1,}\s\w{1,}\s\w{1,}\s\w{1,}\s\d+\w\s\d+)|[A-Z0-9]+(?: [A-Z0-9]+)* ?DP\*V ?\d+/gm, "tx");
const preencheTextarea = (texto) => {
    if (!texto) return;

    // Correção do Regex usando método nativo .exec() para capturar os grupos nomeados
    const rgxTx = /[A-Z0-9]+(?: [A-Z0-9]+)* ?DP\*V ?\d+/gm;
    const rgxIpran = /(?<ipran>IP\sRAN\/\w{2}\s\w+\/\w{2}\s\w+)/gm;
    const rgxIpnodeb = /(?<ipnodeb>IP\sNODEB\/\w{2}\s\w+\/\w{2}\s\w+)/gm;

    const matchTx = rgxTx.exec(texto);
    const matchIpran = rgxIpran.exec(texto);
    const matchIpnodeb = rgxIpnodeb.exec(texto);

    let desigtx = matchTx ? (matchTx.groups?.tx || matchTx[0]) : null;
    let ipran = matchIpran ? matchIpran.groups?.ipran : null;
    let ipnodeb = matchIpnodeb ? matchIpnodeb.groups?.ipnodeb : null;

    let txIndex = texto.search(/(?:\w{1,}\s){4}\w{2}\*\w\s\d{4}/gm);
    let pattern = /RMD|RMC|RMA|RMP/gm;
    let trexoA = texto.match(pattern) || [];
    let ipranTipe = trexoA.findIndex(itens => itens === 'RMC' || itens === 'RMD');

    if(tx !== -1) trechos.innerText = `TX`;
    else if (ipranTipe === 1) trechos.innerText = `IP RAN`;
    else  trechos.innerText = `IP NODEB`;
    
    if (desigtx) desigtxChange = desigtx;
    if (ipran) ipranChange = ipran;
    if (ipnodeb) ipnodebChange = ipnodeb;
    
    if (desig) desig.textContent = desigtx ?? ipran ?? ipnodeb ?? "Não identificado";

    let listRouter = texto.match(/\w+\-\w+/gm);
    if (listRouter && listRouter.length >= 2) {
        if (elementoA) elementoA.innerText = listRouter[0];
        if (elementoB) elementoB.innerText = listRouter[1];
    }

    let interfaces = texto.match(/\b(?:[A-Z-]*\d+)?\/\d+[\/\w-]*\b/gm);
    if (interfaces && interfaces.length >= 2) {
        if (intA) intA.innerText = interfaces[0];
        if (intB) intB.innerText = interfaces[1];
    }
};

/**
 * Filtra e normaliza a string do tipo de alarme recebida do back-end.
 */
/**
 * @param {string} textoAlarme - Alarme bruto recebido da API.
 * @returns {string} Alarme tratado sem pontuação final.
 */
const verificarTipoAlarme = (textoAlarme) => {
  if (!textoAlarme) return 'LINK DOWN';
  const texto = textoAlarme.toUpperCase().trim();

  if (texto.includes('SEM_RESP_SNMP')) return 'SEM RESP SNMP';
  if (texto.includes('FLAPPINGS')) return 'FLAPPING'; 
  if (texto.includes('TRAFEGO ALTO')) return 'TRAFEGO ALTO';
  if (texto.includes('TRAFEGO BAIXO')) return 'TRAFEGO BAIXO';
  if (texto.includes('ERROS')) return 'ERROS';
  if (texto.includes('LOCALIZADA VIA SNMP')) return 'INTERFACE NÃO LOCALIZADA VIA SMNP'; 
  if (texto.includes('RELOAD')) return 'RELOAD';
  
  if (texto.includes('OPTICAL POWER')) {
    const match = texto.match(/(?:TX|RX).*/i);
    if (match) return match[0].toUpperCase().trim();
    return textoAlarme.toUpperCase().trim();
  }

  return 'LINK DOWN';
};

/**
 * Constrói o texto final formatado para exibição no front-end.
 * @param {Array|Object} responsedata - Dados brutos trafegados pelo back-end.
 * @param {string} numeroChamado - Identificador único do incidente (INC).
 * @returns {string} String estruturada pronta para exibição ou cópia.
 */


function gerarTextoFrontEnd(responsedata, numeroChamado) {
  // Verifica se o retorno não é um Array válido ou se possui o campo de erro 'detail'
  if (!Array.isArray(responsedata)) {
    const mensagemErro = responsedata?.detail || "Nenhum dado encontrado para este chamado.";
    alertaral.style.display = "block";
    alertaral.style.color = 'red';
    alertaral.textContent = mensagemErro;    
    //return `CHAMADO: ${numeroChamado}\nAVISO: ${mensagemErro}\nENDEREÇOS:`;
    loadingStatus(false)
    return '';
  }

  // 1. Filtra o JSON removendo qualquer item que possua "LAG-" nas propriedades de interface
  const listaParaFiltrar = Array.isArray(responsedata) ? responsedata : [];
  const dadosFiltrados = responsedata.filter(item => {
    const intA = (item.interface_a || "").toUpperCase();
    const intB = (item.interface_b || "").toUpperCase();
    return !intA.includes("LAG-") && !intB.includes("LAG-");
  });

  // Fallback de segurança se nenhuma interface válida restar pós-filtro
  if (dadosFiltrados.length === 0) {
    loadingStatus(false);
    alertaral.textContent = numeroChamado;
    return '';

    //return `CHAMADO: ${numeroChamado}\nNenhum trecho válido encontrado (Interfaces LAG filtradas).\nENDEREÇOS:`;
  }

  // Verifica a existência de abordagem GPON nos dados que passaram pelo filtro
  const temGpon = dadosFiltrados.some(item => item.rede_gpon === true);
  let linhas = [];
  
  if (temGpon) linhas.push("###### ABORDAGEM GPON RESIDENCIAL ######");
  
  linhas.push(`CHAMADO: ${numeroChamado}`);
  loadingStatus(false)
  
  // Monta as linhas de TRECHO dinamicamente
  dadosFiltrados.forEach(item => linhas.push(`TRECHO: ${item.ponta_a} ${item.interface_a} X ${item.ponta_b} ${item.interface_b}`));
  
  // Captura o alarme do primeiro elemento válido e remove pontos residuais
  const alarmeBruto = dadosFiltrados[0]?.alarme_type;
  const alarmeFormatado = verificarTipoAlarme(alarmeBruto).replace(/\.$/, '');
  
  // Insere a linha de falha garantindo um único ponto final de forma universal
  linhas.push(`FALHA: ${alarmeFormatado}.`);
  
  // Processamento e formatação das linhas de DESIGNAÇÃO
  dadosFiltrados.forEach(item => {
    if (item.desigtx && item.desigtx.trim() !== "") {
      if (item.desigtx.includes("LAG-")) {
        return; 
      }
      linhas.push(`DESIGNAÇÃO: ${item.desigtx}`);
    } else {
      // Isolamento da primeira parte antes do hífen
      const siglaA = item.ponta_a.split('-')[0];
      const siglaB = item.ponta_b.split('-')[0];

      // Desmembramento por posicionamento para espaçamento fixo via substring
      const locA = `${siglaA.substring(0, 2)} ${siglaA.substring(2)}`;
      const locB = `${siglaB.substring(0, 2)} ${siglaB.substring(2)}`;
      
      // Ordenação alfanumérica estrita das localidades calculadas
      const localidadesOrdenadas = [locA, locB].sort((a, b) => a.localeCompare(b));
      linhas.push(`DESIGNAÇÃO: IP RAN/${localidadesOrdenadas[0]}/${localidadesOrdenadas[1]}`);
    }
  });
  
  linhas.push("ENDEREÇOS:");
  return linhas.join('\n');
}


//Página de ALARME
document.querySelector('.btn_inc').addEventListener('click', async (event) => {
    event.preventDefault();
    let textarea = document.querySelector('.txtarea');
    let inc_value = document.querySelector('.inc');
    if (!inc_value) return;
    loadingStatus(true);
    alertaral.style.display = "none";
    try {
        let data = await requestData(inc_value.value);
        textarea.value = data;
        inc_value.value = "";
    } catch (error) {
        alertaral.style.display = "block";
        alertaral.style.color = 'red';
        alertaral.textContent = error.message;    
    } finally {
        loadingStatus(false);
    }
});