async function verificarSessaoValida() {
    if (!document.cookie) return false;

    // Captura todos os cookies salvos no navegador
    const listaCookies = document.cookie.split(';').map(c => c.trim());
    let uuidEncontrado = null;

    // Varem a lista para achar qual cookie possui o nome no formato UUIDv4
    for (let cookie of listaCookies) {
        const partes = cookie.split('=');
        const nomeDoCookie = decodeURIComponent(partes[0]); 

        // Regex para validar se o nome do cookie é estritamente um UUID puro
        const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (regexUUID.test(nomeDoCookie)) {
            uuidEncontrado = nomeDoCookie; // Encontramos o UUID puro usado como nome do cookie
            break; 
        }
    }

    // Se nenhum cookie com nome UUID existe, o usuário não está logado
    if (!uuidEncontrado) {
        console.warn("Nenhum cookie de sessão UUID foi encontrado.");
        return false;
    }

    // O seu CookieManager busca os dados usando o UUID descoberto
    const dadosSessao = CookieManager.get(uuidEncontrado);
    console.log("UUID encontrado no nome do cookie:", uuidEncontrado);
    console.log("Dados da sessão recuperados:", dadosSessao);

    try {
        // CORREÇÃO: URL estruturada corretamente com '$', rota do FastAPI e a porta 8009
        const url = `http://clr0an001372366.nt.embratel.com.br:8009/cache/recuperar/${uuidEncontrado}`;
        
        const response = await fetch(url, { method: 'GET' });

        if (response.ok) {
            const dadosCache = await response.json();
            // Retorna true se o FastAPI validou com sucesso a chave no Memcached
            return dadosCache && dadosCache.status === "sucesso";
        } 
        
        // Se retornar 404 (Sessão expirou no servidor), limpa o cookie usando o seu delete()
        console.warn("Sessão expirada no Memcached. Removendo cookie local.");
        CookieManager.delete(uuidEncontrado);
        return false;

    } catch (error) {
        console.error("Erro ao conectar com o FastAPI para validar sessão:", error);
        return false;
    }
}