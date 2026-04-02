const express = require('express')
const app = express()

const funcoes = require('./functions')

app.use(express.json())
const cors = require('cors')
app.use(cors())
// Estados
app.get('/estados', (req, res) => {
    res.json(funcoes.getListaDeEstados())
})

// Estado por sigla
app.get('/estado/:uf', (req, res) => {
    const resultado = funcoes.getDadosEstados(req.params.uf)

    if (resultado)
        res.json(resultado)
    else
        res.status(404).json({ erro: 'Estado não encontrado' })
})

// Capital
app.get('/capital/:uf', (req, res) => {
    const resultado = funcoes.getCapitalEstado(req.params.uf)

    if (resultado)
        res.json(resultado)
    else
        res.status(404).json({ erro: 'Estado não encontrado' })
})

// Região
app.get('/regiao/:nome', (req, res) => {
    const resultado = funcoes.getEstadosRegiao(req.params.nome)

    if (resultado)
        res.json(resultado)
    else
        res.status(404).json({ erro: 'Região não encontrada' })
})

// Capitais do país
app.get('/capitais', (req, res) => {
    res.json(funcoes.getCapitalPais())
})

// Cidades
app.get('/cidades/:uf', (req, res) => {
    const resultado = funcoes.getCidades(req.params.uf)

    if (resultado)
        res.json(resultado)
    else
        res.status(404).json({ erro: 'Estado sem cidades' })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})