const express = require('express')
const app = express()

const funcoes = require('./functions')

app.use(express.json())

app.get('/estados', (req, res) => {
    res.json(funcoes.getListaDeEstados())
})

app.get('/estado/:uf', (req, res) => {
    const resultado = funcoes.getDadosEstados(req.params.uf)

    if (resultado)
        res.json(resultado)
    else
        res.status(404).json({ erro: 'Estado não encontrado' })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})