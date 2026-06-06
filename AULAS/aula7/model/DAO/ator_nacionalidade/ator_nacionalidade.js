/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Ator e Nacionalidade no banco de dados 
 *           MySQL
 * Data: 06/06/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertAtorNacionalidade = async function (atorNacionalidade) {
    try {
        let sql =
            `insert into tbl_ator_nacionalidade (
        id_ator,
        id_nacionalidade
        ) values (
        ${atorNacionalidade.id_ator},
        ${atorNacionalidade.id_nacionalidade}
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

const updateAtorNacionalidade = async function (atorNacionalidade) {
    try {
        let sql = `update tbl_ator_nacionalidade set
        id_nacionalidade = ${atorNacionalidade.id_nacionalidade},
        id_ator = ${atorNacionalidade.id_ator}
        where id = ${atorNacionalidade.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllAtorNacionalidade = async function () {
    try {
        let sql = `select * from tbl_ator_nacionalidade order by id desc;`

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

const selectByIdAtorNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_ator_nacionalidade where id = ${id}`

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

//Função para retornar os dados do Genero filtrando pelo ID do Filme
const selectNacionalidadeByIdAtor = async function (idAtor) {
    try {
        let sql = `select tbl_nacionalidade.* 
                    from tbl_ator
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
                    where tbl_ator.id = ${idAtor}`

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

const selectAtorByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `select tbl_ator.*
                    from tbl_ator
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
                    where tbl_nacionalidade.id = ${idNacionalidade}`

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

//Função para exlcuir um Filme genero pelo ID
const deleteAtorNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id = ${id};`

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

//Função para excluir as fotos relacionados com um Diretor
//OBS: Esta função será utilizada no PUT do Diretor
const deleteNacionalidadeByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id_ator = ${idAtor};`

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
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade,
    selectAtorByIdNacionalidade,
    selectNacionalidadeByIdAtor,
    deleteAtorNacionalidade,
    deleteNacionalidadeByIdAtor
}