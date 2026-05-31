async function verificarSessaoValida() {
    const cookieSessao = CookieManager.get("session_token");
    
    // 1. Se não existe cookie local, a sessão não é válida
    if (!cookieSessao || !cookieSessao.sessaoId) {
        return false;
    }

    try {
        // 2. Consulta o endpoint GET do seu FastAPI usando a chave guardada no cookie
        // Como o seu método 'connectJsonUrlJson' provavelmente faz POST, certifique-se de que 
        // ele aceita requisições GET ou use o 'fetch' nativo abaixo para garantir o método correto:
        const url = `http://embratel.com.br{encodeURIComponent(cookieSessao.sessaoId)}`;
        
        const response = await fetch(url, { method: 'GET' });

        // Se o FastAPI retornar 200 OK, a chave existe e é válida
        if (response.ok) {
            const dadosCache = await response.json();
            // Opcional: Validar se o usuário dentro do cache bate com o do cookie
            return dadosCache.status === "sucesso";
        } 
        
        // Se retornar 404 (Chave não encontrada) ou 503/500, limpa o cookie
        CookieManager.delete("session_token");
        return false;

    } catch (error) {
        console.error("Erro ao conectar com o Memcached para validar sessão:", error);
        // Em caso de queda do servidor de cache, definimos como inválido por segurança
        return false;
    }
}
