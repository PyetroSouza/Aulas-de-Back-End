const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: ["*"],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']

}

app.use(cors(corsOptions))

//ROTAS - Tabela Filme
const filmeRouter = require('./routers/filme/filme.router.js')
app.use('/v1/senai/locadora/filme', filmeRouter)

//ROTAS - Tabela Gênero
const generoRouter = require('./routers/genero/genero.router.js')
app.use('/v1/senai/locadora/genero', generoRouter)

//ROTAS - Tabela Nacionalidade
const nacionalidadeRouter = require('./routers/nacionalidade/nacionalidade.router.js')
app.use('/v1/senai/locadora/nacionalidade', nacionalidadeRouter)

//ROTAS - Tabela Atividade
const atividadeRouter = require('./routers/atividade/atividade.router.js')
app.use('/v1/senai/locadora/atividade', atividadeRouter)

//ROTAS - Tabela Foto
const fotoRouter = require('./routers/foto/foto.router.js')
app.use('/v1/senai/locadora/foto', fotoRouter)

//ROTAS - Tabela Sexo
const sexoRouter = require('./routers/sexo/sexo.router.js')
app.use('/v1/senai/locadora/sexo', sexoRouter)

//ROTAS - Tabela Classificação
const classificacaoRouter = require('./routers/classificacao/classificacao.router.js')
app.use('/v1/senai/locadora/classificacao', classificacaoRouter)

//ROTAS - Tabela Diretor
const diretorRouter = require('./routers/diretor/diretor.router.js')
app.use('/v1/senai/locadora/diretor', diretorRouter)

//ROTAS - Tabela Ator
const atorRouter = require('./routers/ator/ator.router.js')
app.use('/v1/senai/locadora/ator', atorRouter)

app.listen(8080, function () {
    console.log('API agurdando novas requisições...')
})