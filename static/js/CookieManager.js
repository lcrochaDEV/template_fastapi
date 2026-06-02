 class CookieManager {

    static set(uuid, valor, expiracao = 7) {
        const data = new Date();
        data.setTime(data.getTime() + (expiracao * 24 * 60 * 60 * 1000));
        
        const expires = `expires=${data.toUTCString()}`;
        
        // MELHORIA: Ativa 'Secure' apenas se a página atual usar HTTPS
        const isSecure = window.location.protocol === 'https:' ? '; Secure' : '';
        const seguranca = `path=/; SameSite=Lax${isSecure}`;
        
        // MELHORIA: Se o valor for objeto/array, converte para string JSON
        let valorFinal = valor;
        if (typeof valor === 'object' && valor !== null) {
            valorFinal = JSON.stringify(valor);
        }
        
        const uuidEncode = encodeURIComponent(uuid);
        const valorEncode = encodeURIComponent(valorFinal);
        
        document.cookie = `${uuidEncode}=${valorEncode}; ${expires}; ${seguranca}`;
    }

    static get(uuid) {
        const uuidChave = `${encodeURIComponent(uuid)}=`;
        
        const cookieEncontrado = document.cookie
            .split(';')
            .map(c => c.trim())
            .find(c => c.startsWith(uuidChave));

        if (!cookieEncontrado) return null;

        const valorDecodificado = decodeURIComponent(cookieEncontrado.substring(uuidChave.length));

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

    static delete(uuid) {
        const uuidEncode = encodeURIComponent(uuid);
        const isSecure = window.location.protocol === 'https:' ? '; Secure' : '';
        
        // Mantém as mesmas flags idênticas para garantir a remoção
        document.cookie = `${uuidEncode}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax${isSecure}`;
    }
}


// --- Exemplo de Uso com JSON ---
// 1. Salvando um objeto complexo
const usuario = { id: 42, uuid: "Alex", permissoes: ["admin", "editor"] };
//CookieManager.set("user_profile", usuario, 7);

// 2. Lendo o objeto (já retorna como objeto JavaScript, pronto para usar)
const dadosUsuario = CookieManager.get("user_profile");
//console.log(dadosUsuario.uuid); // Imprime: Alex
//console.log(dadosUsuario.permissoes[0]); // Imprime: admin
