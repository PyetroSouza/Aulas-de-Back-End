/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados do nacionalidade no banco de dados
 *           MySQL
 * Data: 08/05/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/
//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertNacionalidade = async function (nacionalidade) {
    try {
        let sql = `insert into tbm_nacionalidade (
        nacionalidade 
        ) values (
        replace("${nacionalidade.nacionalidade}", "'", "") 
        );`

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}
const updateNacionalidade = async function (nacionalidade) {
    try {

    } catch (error) {
        return false
    }
}
const selectAllNacionalidade = async function () {
    try {

    } catch (error) {
        return false
    }
}
const selectByIdNacionalidade = async function (id) {
    try {

    } catch (error) {
        return false
    }
}
const deleteNacionalidade = async function (id) {
    try {

    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}