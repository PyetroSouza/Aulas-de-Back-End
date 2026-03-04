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

    let escolha = informarCalculo
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

    let calculadorasValidas = [
        "IMC",
        "MEDIAS ESCOLARES",
        "CALCULO DE TABUADA",
        "FATORIAL",
        "PAR OU IMPAR"
    ]

    return calculadorasValidas.includes(escolha)
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

    return !isNaN(valor) && valor >= 0 && valor <= 100
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
    return !isNaN(tabValor) && tabValor >= 2 && tabValor <= 100
}

const validarEntradaNumeroTabuada = function (numeroTabuada) {
    let tabNumero = Number(numeroTabuada)
    return !isNaN(tabNumero) && tabNumero >= 2 && tabNumero <= 100
}

//Validação do cálculo do Fatorial

const validarNumeroFatorial = function (numeroFatorial) {

    let numFat = Number(numeroFatorial)

    return Number.isInteger(numFat) && numFat > 1
}

//Validações do cálculo de Par ou Ímpar
const validarNumeroInicial = function (numeroInicial) {
    let numI = Number(numeroInicial)

    return !isNaN(numI) && Number.isInteger(numI)
}
const validarNumeroFinal = function (numeroFinal) {
    let numF = Number(numeroFinal)

    return !isNaN(numF) && Number.isInteger(numF)
}
const validarTipoParImpar = function (tipo) {

    if (!tipo) return false

    const tp = tipo
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

    const valoresValidos = [
        "PAR",
        "PARES",
        "IMPAR",
        "IMPARES",
        "AMBOS"
    ]

    return valoresValidos.includes(tp)
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