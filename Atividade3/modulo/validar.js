/**********************************************************
 * Objetivo: Arquivo responsável pelas validações de dados
 * Data: 25/02/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 *********************************************************/

//Validação para entrada de String
const validarEntradaString = function (dado) {

    if (dado == undefined || dado.trim() === '')
        return false

    if (!isNaN(dado))
        return false

    return true
}

//Validação para entrada de Number
const validarEntradaNumber = function (valor) {

    if (valor == undefined)
        return false

    if (String(valor).trim() === '')
        return false

    if (isNaN(Number(valor)))
        return false

    return true
}

//Validação da escolha da Calculadora
const validarCalculadora = function (informarCalculo) {
    let escolha = String(informarCalculo).trim().toUpperCase()
    let calculadoraEscolhida = ['PAR/IMPAR', 'IMPAR/PAR', 'IMPAR OU PAR', 'PAR OU IMPAR', 'IMPAR E PAR', 'PAR E IMPAR', 'IMPAR', 'PAR',
        'PAR/ÍMPAR', 'ÍMPAR/PAR', 'ÍMPAR OU PAR', 'PAR OU ÍMPAR', 'ÍMPAR E PAR', 'PAR E ÍMPAR', 'ÍMPAR',
        'IMC', 'MÉDIA', 'MEDIA', 'TABUADA', 'FATORIAL']

    if (calculadoraEscolhida.includes(escolha)) {
        return true
    } else {
        return false
    }
}

//Validações do IMC
const validarUnidadeMedidaAltura = function (unidadeMedida) {
    let medida = unidadeMedida.toUpperCase()
    if (medida === "CM" || medida === "M") {
        return true
    } else {
        return false
    }
}
//Validações da Media Escolares
const validarMediaEscolares = function (nota) {
    let valor = Number(nota)
    return !(valor < 0 || valor > 100)
}
const classificarSexo = function (sexo) {

    if (!sexo) return false

    const sx = sexo.trim().toLowerCase()

    const valoresValidos = ["masculino", "feminino"]

    return valoresValidos.includes(sx) ? sx : false
}

const classificarSexoAluno = function (sexo) {

    if (!sexo) return false

    const sx = sexo.toLowerCase()

    if (sx === "masculino")
        return "Aluno"

    if (sx === "feminino")
        return "Aluna"

    return false
}

const classificarSexoProfessor = function (sexo) {

    if (!sexo) return false

    const sx = sexo.toLowerCase()

    if (sx === "masculino")
        return "Professor"

    if (sx === "feminino")
        return "Professora"

    return false
}

//Validações do cálculo da Tabuada

const validarEntradaTabuada = function (tabuadaValor) {
    let tabValor = Number(tabuadaValor)
    return !(tabValor < 2 || tabValor > 100)
}

const validarEntradaNumeroTabuada = function (numeroTabuada) {
    let tabNumero = Number(numeroTabuada)
    return !(tabNumero < 1 || tabNumero > 50)
}

//Validação do cálculo do Fatorial

const validarNumeroFatorial = function (numeroFatorial){

    let numFat = Number(numeroFatorial)

    return Number.isInteger(numFat) && numFat > 1
}

//Validações do cálculo de Par ou Ímpar
const validarNumeroInicial = function (numeroInicial){
    let numI = Number(numeroInicial)

    return Number.isInteger(numI)
}
const validarNumeroFinal = function (numeroFinal){
    let numF = Number(numeroFinal)

    return Number.isInteger(numF)
}
const validarTipoParImpar = function(tipo){

    return tipo === "PAR" || "PARES" || 
           tipo === "IMPAR" || "ÍMPAR" || "IMPARES" ||
           tipo === "AMBOS"
}

module.exports = {
    validarEntradaNumber,
    validarEntradaString,
    validarCalculadora,
    validarUnidadeMedidaAltura,
    validarMediaEscolares,
    classificarSexo,
    classificarSexoAluno,
    classificarSexoProfessor,
    validarEntradaTabuada,
    validarEntradaNumeroTabuada,
    validarNumeroFatorial,
    validarNumeroInicial,
    validarNumeroFinal,
    validarTipoParImpar
}