class CookieManager {

    static set(nome, valor, dias = 7) {
        const data = new Date();
        data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
        
        const expires = `expires=${data.toUTCString()}`;
        
        // MELHORIA: Ativa 'Secure' apenas se a página atual usar HTTPS
        const isSecure = window.location.protocol === 'https:' ? '; Secure' : '';
        const seguranca = `path=/; SameSite=Lax${isSecure}`;
        
        // MELHORIA: Se o valor for objeto/array, converte para string JSON
        let valorFinal = valor;
        if (typeof valor === 'object' && valor !== null) {
            valorFinal = JSON.stringify(valor);
        }
        
        const nomeEncode = encodeURIComponent(nome);
        const valorEncode = encodeURIComponent(valorFinal);
        
        document.cookie = `${nomeEncode}=${valorEncode}; ${expires}; ${seguranca}`;
    }

    static get(nome) {
        const nomeChave = `${encodeURIComponent(nome)}=`;
        
        const cookieEncontrado = document.cookie
            .split(';')
            .map(c => c.trim())
            .find(c => c.startsWith(nomeChave));

        if (!cookieEncontrado) return null;

        const valorDecodificado = decodeURIComponent(cookieEncontrado.substring(nomeChave.length));

        // MELHORIA: Tenta converter de volta para JSON se for uma estrutura válida
        try {
            // Verifica se parece com JSON antes de tentar o parse
            if (valorDecodificado.startsWith('{') || valorDecodificado.startsWith('[')) {
                return JSON.parse(valorDecodificado);
            }
        } catch (e) {
            // Se falhar, retorna como string pura por segurança
            return valorDecodificado;
        }

        return valorDecodificado;
    }

    static delete(nome) {
        const nomeEncode = encodeURIComponent(nome);
        const isSecure = window.location.protocol === 'https:' ? '; Secure' : '';
        
        // Mantém as mesmas flags idênticas para garantir a remoção
        document.cookie = `${nomeEncode}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax${isSecure}`;
    }
}


// --- Exemplo de Uso com JSON ---
// 1. Salvando um objeto complexo
const usuario = { id: 42, nome: "Alex", permissoes: ["admin", "editor"] };
//CookieManager.set("user_profile", usuario, 7);

// 2. Lendo o objeto (já retorna como objeto JavaScript, pronto para usar)
const dadosUsuario = CookieManager.get("user_profile");
console.log(dadosUsuario.nome); // Imprime: Alex
console.log(dadosUsuario.permissoes[0]); // Imprime: admin
