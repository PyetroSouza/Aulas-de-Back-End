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

    if (validarCalculadora && validarEscolhaCalculadora) {
        if (escolhaCalculo == "IMC") {
            entradaDeDados.question('\n ==== Cálculo de IMC ==== \nDigite o seu peso em kilos (kg): ', function (peso) {

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
        }
        else if (escolhaCalculo == "MÉDIAS ESCOLARES" || escolhaCalculo == "MEDIAS ESCOLARES") {

            entradaDeDados.question('\n ==== Cálculos de Médias Escolares ==== \nQual é o nome do aluno?: ', function (nomeAluno) {

                let nomeAlunoVal = validacao.validarEntradaString(nomeAluno)

                if (nomeAlunoVal)

                    entradaDeDados.question('\nQual é o nome do professor?: ', function (nomeProfessor) {

                        let nomeProfVal = validacao.validarEntradaString(nomeProfessor)

                        if (nomeProfVal)

                            entradaDeDados.question('\nQual é o sexo do aluno?: ', function (sexoAluno) {

                                let sexoAlunoVal = calculoMediaEscolar.classificarSexo(sexoAluno)
                                let generoAluno = calculoMediaEscolar.classificarSexoAluno(sexoAlunoVal)

                                if (sexoAlunoVal && generoAluno)

                                    entradaDeDados.question('\nQual é o sexo do professor?: ', function (sexoProfessor) {

                                        let sexoProfVal = calculoMediaEscolar.classificarSexo(sexoProfessor)
                                        let generoProfessor = calculoMediaEscolar.classificarSexoProfessor(sexoProfVal)

                                        if (sexoProfVal && generoProfessor)

                                            entradaDeDados.question('\nQual é o nome do curso?: ', function (curso) {

                                                let nomeCursoVal = validacao.validarEntradaString(curso)

                                                if (nomeCursoVal)

                                                    entradaDeDados.question('\nQual é o nome da disciplina?: ', function (disciplina) {

                                                        let nomeDisciplinaVal = validacao.validarEntradaString(disciplina)

                                                        if (nomeDisciplinaVal)

                                                            entradaDeDados.question('\nInforme a nota 1: ', function (nota1) {

                                                                let n1 = nota1.replace(',', '.')
                                                                let n1Val = validacao.validarEntradaNumber(n1) && validacao.validarMediaEscolares(n1)

                                                                if (n1Val)

                                                                    entradaDeDados.question('\nInforme a nota 2: ', function (nota2) {

                                                                        let n2 = nota2.replace(',', '.')
                                                                        let n2Val = validacao.validarEntradaNumber(n2) && validacao.validarMediaEscolares(n2)

                                                                        if (n2Val)

                                                                            entradaDeDados.question('\nInforme a nota 3: ', function (nota3) {

                                                                                let n3 = nota3.replace(',', '.')
                                                                                let n3Val = validacao.validarEntradaNumber(n3) && validacao.validarMediaEscolares(n3)

                                                                                if (n3Val)

                                                                                    entradaDeDados.question('\nInforme a nota 4: ', function (nota4) {

                                                                                        let n4 = nota4.replace(',', '.')
                                                                                        let n4Val = validacao.validarEntradaNumber(n4) && validacao.validarMediaEscolares(n4)

                                                                                        if (n4Val) {

                                                                                            let mediaFinal = calculoMediaEscolar.calcularMedia(n1, n2, n3, n4)
                                                                                            let status = calculoMediaEscolar.classificarMedia(mediaFinal)

                                                                                            if (status === 'Exame')

                                                                                                entradaDeDados.question('\nInforme a nota do exame: ', function (notaExame) {

                                                                                                    let nEx = notaExame.replace(',', '.')
                                                                                                    let nExVal = validacao.validarEntradaNumber(nEx) && validacao.validarMediaEscolares(nEx)

                                                                                                    if (nExVal) {

                                                                                                        let mediaExame = calculoMediaEscolar.calcularMediaExame(mediaFinal, nEx)
                                                                                                        let statusFinal = mediaExame >= 60 ? 'Aprovado' : 'Reprovado'

                                                                                                        let statusTexto = statusFinal.toLowerCase()

                                                                                                        console.log('\n===== RELATÓRIO =====')
                                                                                                        console.log(`${generoAluno}, ${nomeAluno}, foi ${statusTexto} na disciplina ${disciplina}.`)
                                                                                                        console.log(`Curso: ${curso}`)
                                                                                                        console.log(`${generoProfessor}: ${nomeProfessor}`)
                                                                                                        console.log(`Notas do aluno: ${n1}, ${n2}, ${n3}, ${n4}, ${nEx}`)
                                                                                                        console.log(`Média Final: ${mediaFinal}`)
                                                                                                        console.log(`Média Final do Exame: ${mediaExame}`)
                                                                                                        entradaDeDados.close()

                                                                                                    } else {
                                                                                                        console.log('[ERRO] Nota do exame inválida')
                                                                                                        entradaDeDados.close()
                                                                                                    }
                                                                                                })

                                                                                            else {

                                                                                                let statusTexto = status.toLowerCase()

                                                                                                console.log('\n===== RELATÓRIO =====')
                                                                                                console.log(`${generoAluno}, ${nomeAluno}, foi ${statusTexto} na disciplina ${disciplina}.`)
                                                                                                console.log(`Curso: ${curso}`)
                                                                                                console.log(`${generoProfessor}: ${nomeProfessor}`)
                                                                                                console.log(`Notas do aluno: ${n1}, ${n2}, ${n3}, ${n4}`)
                                                                                                console.log(`Média Final: ${mediaFinal}`)
                                                                                                console.log(`Média Final do Exame: Não foi necessário exame`)

                                                                                                entradaDeDados.close()
                                                                                            }

                                                                                        } else {
                                                                                            console.log('[ERRO] Nota 4 inválida')
                                                                                            entradaDeDados.close()
                                                                                        }
                                                                                    })

                                                                                else {
                                                                                    console.log('[ERRO] Nota 3 inválida')
                                                                                    entradaDeDados.close()
                                                                                }
                                                                            })

                                                                        else {
                                                                            console.log('[ERRO] Nota 2 inválida')
                                                                            entradaDeDados.close()
                                                                        }
                                                                    })

                                                                else {
                                                                    console.log('[ERRO] Nota 1 inválida')
                                                                    entradaDeDados.close()
                                                                }
                                                            })

                                                        else {
                                                            console.log('[ERRO] Nome da disciplina inválido')
                                                            entradaDeDados.close()
                                                        }
                                                    })

                                                else {
                                                    console.log('[ERRO] Nome do curso inválido')
                                                    entradaDeDados.close()
                                                }
                                            })

                                        else {
                                            console.log('[ERRO] Sexo do professor inválido')
                                            entradaDeDados.close()
                                        }
                                    })

                                else {
                                    console.log('[ERRO] Sexo do aluno inválido')
                                    entradaDeDados.close()
                                }
                            })

                        else {
                            console.log('[ERRO] Nome do professor inválido')
                            entradaDeDados.close()
                        }
                    })

                else {
                    console.log('[ERRO] Nome do aluno inválido')
                    entradaDeDados.close()
                }
            })
        }
        else if (escolhaCalculo == "CÁLCULO DE TABUADA" || escolhaCalculo == "CALCULO DE TABUADA") {

            entradaDeDados.question('\n==== Cálculo de Tabuada ==== \nDigite o valor inicial da tabuada: ', function (valorTabuadaI) {

                let tabuadaI = valorTabuadaI.replace(',', '.')
                let tabuadaIVal =
                    validacao.validarEntradaNumber(tabuadaI) &&
                    validacao.validarEntradaTabuada(tabuadaI)

                if (tabuadaIVal)

                    entradaDeDados.question('\nDigite o valor final da tabuada: ', function (valorTabuadaF) {

                        let tabuadaF = valorTabuadaF.replace(',', '.')
                        let tabuadaFVal =
                            validacao.validarEntradaNumber(tabuadaF) &&
                            validacao.validarEntradaTabuada(tabuadaF)

                        if (tabuadaFVal && Number(tabuadaF) > Number(tabuadaI))

                            entradaDeDados.question('\nDigite o contador inicial: ', function (contadorInicial) {

                                let contI = contadorInicial.replace(',', '.')
                                let contIVal =
                                    validacao.validarEntradaNumber(contI) &&
                                    validacao.validarEntradaNumeroTabuada(contI)

                                if (contIVal)

                                    entradaDeDados.question('\nDigite o contador final: ', function (contadorFinal) {

                                        let contF = contadorFinal.replace(',', '.')
                                        let contFVal =
                                            validacao.validarEntradaNumber(contF) &&
                                            validacao.validarEntradaNumeroTabuada(contF)

                                        if (contFVal && Number(contF) > Number(contI)) {

                                            let resultado = calculoTabuada.gerarTabuada(
                                                tabuadaI,
                                                tabuadaF,
                                                contI,
                                                contF
                                            )

                                            console.log('\n===== TABUADA ===== \n')
                                            console.log(resultado)

                                            entradaDeDados.close()

                                        } else {
                                            console.log('[ERRO] Contador final inválido')
                                            entradaDeDados.close()
                                        }
                                    })

                                else {
                                    console.log('[ERRO] Contador inicial inválido')
                                    entradaDeDados.close()
                                }
                            })

                        else {
                            console.log('[ERRO] Valor final da tabuada inválido')
                            entradaDeDados.close()
                        }
                    })

                else {
                    console.log('[ERRO] Valor inicial da tabuada inválido')
                    entradaDeDados.close()
                }
            })
        }
        else if (escolhaCalculo == "FATORIAL") {

            entradaDeDados.question('\n ==== Cálculo de Fatorial ==== \nDigite um número inteiro maior que 1: ', function (numeroFatorial) {

                let numFat = numeroFatorial.replace(/!/g, '')

                let numeroValido =
                    validacao.validarEntradaNumber(numFat) &&
                    validacao.validarNumeroFatorial(numFat)

                if (numeroValido) {

                    let resultado = calculoFatorial.calcularFatorial(numFat)

                    console.log('\n===== FATORIAL =====')
                    console.log(resultado)

                    entradaDeDados.close()

                } else {
                    console.log('[ERRO] Não é possível calcular o fatorial. O número deve ser inteiro e maior que 1.')
                    entradaDeDados.close()
                }
            })
        }
        else if (escolhaCalculo == "PAR OU ÍMPAR" || escolhaCalculo == "PAR OU IMPAR") {

            entradaDeDados.question('\n ==== Cálculo de Par ou Ímpar ==== \nDigite o primeiro número: ', function (numeroInicial) {

                let numI = numeroInicial.replace(',', '.')

                let numIVal = validacao.validarEntradaNumber(numI)

                if (numIVal) {

                    entradaDeDados.question('Digite o último número: ', function (numeroFinal) {

                        let numF = numeroFinal.replace(',', '.')

                        let numFVal = validacao.validarEntradaNumber(numF)

                        if (numFVal && Number(numF) > Number(numI)) {

                            entradaDeDados.question('Deseja calcular apenas números: Par, Impar ou Ambos?: ', function (tipoCalculo) {

                                let tipo = tipoCalculo.trim().toUpperCase()

                                let tipoVal =
                                    validacao.validarEntradaString(tipo) &&
                                    validacao.validarTipoParImpar(tipo)

                                if (tipoVal) {

                                    let resultado = calculoParImpar.calcularParOuImpar(
                                        numI,
                                        numF,
                                        tipo
                                    )

                                    console.log('\n===== PAR OU ÍMPAR =====\n')
                                    console.log(resultado)

                                } else {
                                    console.log('[ERRO] Tipo inválido')
                                }

                                entradaDeDados.close()
                            })

                        } else {
                            console.log('[ERRO] Número final inválido ou menor que o inicial')
                            entradaDeDados.close()
                        }
                    })

                } else {
                    console.log('[ERRO] Número inicial inválido')
                    entradaDeDados.close()
                }
            })
        }

    }
    else {
        console.log('[ERRO] Calculadora inválida')
        entradaDeDados.close()
    }
})
