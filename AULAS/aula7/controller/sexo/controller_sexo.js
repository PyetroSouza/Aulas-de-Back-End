/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de sexo
 * Data: 13/05/2026
 * Autor: Pyetro Ferreira
 * Versão: 1.0
 ***************************************************************************************************************/
//Import do arquivo de conigurações de mensagens do projeto
const configMessage = require("../modulo/configMessage.js")

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const fotoDAO = require('../../model/DAO/foto/foto.js')
const knexConfig = require("../../model/database_config/knexConfig.js")

const insertSexo = async function (sexo){}
const updateSexo = async function (sexo){}
const selectAllSexo = async function (){}
const selectByIdSexo = async function (id){}
const deleteSexo = async function (id){}

module.exports = {
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}

