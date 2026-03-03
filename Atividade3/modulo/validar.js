/**********************************************************
 * Objetivo: Arquivo responsável pelas validações de dados
 * Data: 25/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 *********************************************************/

 
const validarEntradaString = function (dado) {

    if (dado == undefined || dado.trim() === '')
        return false

    if (!isNaN(dado))
        return false

    return true
}

const validarEntradaNumber = function (valor) {

    if (valor == undefined)
        return false

    if (String(valor).trim() === '')
        return false

    if (isNaN(Number(valor)))
        return false

    return true
}

const validarCalculadora = function (informarCalculo){
        let escolha = String(informarCalculo).trim().toUpperCase()
    let calculadoraEscolhida = ['PAR/IMPAR', 'IMPAR/PAR', 'IMPAR OU PAR', 'PAR OU IMPAR', 'IMPAR E PAR', 'PAR E IMPAR', 'IMPAR', 'PAR',
        'PAR/ÍMPAR', 'ÍMPAR/PAR', 'ÍMPAR OU PAR', 'PAR OU ÍMPAR', 'ÍMPAR E PAR', 'PAR E ÍMPAR', 'ÍMPAR',
        'IMC', 'MÉDIA', 'MEDIA', 'TABUADA', 'FATORIAL']

        if(calculadoraEscolhida.includes(escolha)) {
            return true
        } else {
            return false
        }
}

module.exports = {
    validarEntradaNumber,
    validarEntradaString,
    validarCalculadora
}