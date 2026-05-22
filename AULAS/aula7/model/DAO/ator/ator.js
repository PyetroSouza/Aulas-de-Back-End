/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados do autor no banco de dados
 *           MySQL
 * Data: 15/04/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertAtor = async function (ator) {
    try {
        let sql = `insert into tbl_ator (
        nome,
        data_nascimento,
        ano_inicio_carreira,
        biografia,
        id_sexo
        ) values (
         replace("${ator.nome}", "'", ""),
         replace("${ator.data_nascimento}", "'", ""),
         replace("${ator.ano_inicio_carreira}", "'", ""),
         replace("${ator.biografia}", "'", ""),
         ${ator.id_sexo}
         );`

        let result = await knexConection.raw(sql)
        if (result) {
            return result[0].insertId
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateAtor = async function (ator) {
    {
        try {
            let sql = `update tbl_ator set
            nome                 = '${ator.nome}',
            data_nascimento      = '${ator.data_nascimento}',
            ano_inicio_carreira  = '${ator.ano_inicio_carreira}',
            biografia            = '${ator.biografia}',
            id_sexo              =  ${ator.id_sexo}
            where id = ${ator.id}`

            let result = await knexConection.raw(sql)
            if (result)
                return true
            else
                return false

        } catch (error) {
            return false
        }
    }
}
const selectAllAtor = async function () {
    {
        try {
            let sql = 'select * from tbl_ator order by id desc'
            let result = await knexConection.raw(sql)

            if (Array.isArray(result)) {
                return result[0]
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
}
const selectByIdAtor = async function (id) {
    try {
        let sql = `select * from tbl_ator where id = ${id};`
        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteAtor = async function (id) {
    try {
        let sql = `delete from tbl_ator where id = ${id};`
        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}