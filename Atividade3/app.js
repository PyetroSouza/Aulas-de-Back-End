/****************************************************************
 * Objetivo: Desenvolver uma aplicação para a empresa Cálculos SA
 * Autor: Pyetro Souza
 * Data: 02/02/2026
 * Versão: 2.0
 * ****************************************************************/

//Import da biblioteca de entrada de dados
const readline = require('readline')

// Criação do objeto para captar as entradas de objetos 
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Import dos arquivos de calculos e validação
let calculoImc = require('./modulo/calculo/imc')
let calculoMediaEscolar = require('./modulo/calculo/mediaEscolares')
let calculoTabuada = require('./modulo/calculo/tabuada')
let calculoFatorial = require('./modulo/calculo/fatorial')
let calculoParImpar = require('./modulo/calculo/par_impar')
let validacao = require('./modulo/validar')

entradaDeDados.question("Olá! Seja bem vindo a empresa Cálculo SA \n Qual calculadora você gostaria de usar? \n - IMC \n - Médias Escolares \n - Cálculo de Tabuada \n - Fatorial \n - Par ou Ímpar \n Escreva uma delas que queira usar: ", function (informarCalculo) {

    let escolhaCalculo = informarCalculo.trim().toUpperCase()
    let validarCalculadora = validacao.validarEntradaString(informarCalculo)
    let validarEscolhaCalculadora = validacao.validarCalculadora(informarCalculo)

    if (validarCalculadora && validarEscolhaCalculadora)
        if (escolhaCalculo == "IMC")
            entradaDeDados.question('\nDigite o seu peso em kilos (kg): ', function (peso) {

                let pesoPessoa = peso.replace(',', '.')
                let pesoVerificado = validacao.validarEntradaNumber(pesoPessoa)

                if (pesoVerificado)
                    entradaDeDados.question('Qual será a unidade de medida para altura? Em metros (m) ou em centímetros (cm)?: ', function (unidadeMedida) {

                        let unidadeEscolhida = unidadeMedida.toUpperCase()
                        let unidadeValString = validacao.validarEntradaString(unidadeEscolhida)
                        let unidadeValAltura = validacao.validarUnidadeMedidaAltura(unidadeEscolhida)

                        if (unidadeValString && unidadeValAltura)
                            entradaDeDados.question(`Informe a altura em ${unidadeEscolhida}: `, function (altura) {

                                let alturaInformada = altura.replace(',', '.')
                                let alturaVal = validacao.validarEntradaNumber(alturaInformada)

                                if (alturaVal) {
                                    let resultadoIMC = calculoImc.calcularImc(pesoPessoa, alturaInformada, unidadeEscolhida)
                                    let classificarImc = calculoImc.classificarImc(resultadoIMC)

                                    console.log(`\nResultado IMC é: ${resultadoIMC}`)
                                    console.log(`IMC está classificado como: ${classificarImc}`)
                                } else
                                    console.log('[ERRO] Altura digitada é inválida')

                                entradaDeDados.close()
                            })
                        else {
                            console.log('[ERRO] Unidade de medida da altura está incorreta')
                            entradaDeDados.close()
                        }
                    })
                else {
                    console.log('[ERRO] Peso digitado é inválido')
                    entradaDeDados.close()
                }
            })
    if (escolhaCalculo == "MÉDIA ESCOLARES" || escolhaCalculo == "MEDIA ESCOLARES") {
        entradaDeDados.question('\n Qual é o nome do aluno?: ', function (nomeAluno) {
            let nmAl = nomeAluno.trim()
            let nomeAlunoVal = validacao.validarEntradaString(nmAl)

            if (nomeAlunoVal) {
                entradaDeDados.question('\n Qual é o nome do professor?: ', function (nomeProfessor) {
                    let nmProf = nomeProfessor.trim()
                    let nomeProfVal = validacao.validarEntradaString(nmProf)

                    if (nomeProfVal) {
                        entradaDeDados.question('\n Qual é o sexo do aluno?: ', function (sexoAluno) {
                            let sxAl = sexoAluno.trim()
                            let sxAlunoVal = validacao.validarEntradaString(sxAl)
                            sxAlunoVal = calculoMediaEscolar.classificarSexo(sxAl)

                            if (sxAlunoVal) {
                                entradaDeDados.question('\n Qual é o sexo do professor: ', function (sexoProfessor) {
                                    let sxProf = sexoProfessor.trim()
                                    let sxProfVal = validacao.validarEntradaString(sxProf)
                                    sxProfVal = calculoMediaEscolar.classificarSexo(sxProf)
                                    if (sxProfVal) {
                                        entradaDeDados.question('\n Qual é o nome da disciplina?: ', function (disciplina) {
                                            let nomeDisciplina = disciplina.trim()
                                            let nomeDisciplinaVal = validacao.validarEntradaString(nomeDisciplina)
                                            if (nomeDisciplinaVal){
                                                entradaDeDados.question('\n Informe a nota1: ', function(nota1){
                                                    let n1 = nota1.replace(',', '.')
                                                    n1 = validacao.validarMediaEscolares(n1)
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})