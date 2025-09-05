class RegExp {
    static regexpsearch(texto = null, pattern = null, groupsRegexp = null){
        let capturatxt = [... texto.matchAll(pattern)];
        if(capturatxt.length != 0){
            if(groupsRegexp != null){
                return capturatxt[0].groups[groupsRegexp]; //pantaA[0].groups['ab']
            }
            console.log(capturatxt[0])
            return capturatxt[0].input;
        }
        return null
    }
}
//EXEMPLOS: RegExp.regexpsearch(texto = texto, /PROBLEMA:\s?(?<falha>\w+\s\w+)/gm, "falha")
