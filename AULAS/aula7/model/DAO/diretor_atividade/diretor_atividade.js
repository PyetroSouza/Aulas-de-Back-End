/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Diretor e Atividade no banco de dados 
 *           MySQL
 * Data: 05/06/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertDiretorAtividade = async function (diretorAtividade) {
    try {
        let sql =
            `insert into tbl_diretor_atividade (
        id_diretor,
        id_atividade
        ) values (
        ${diretorAtividade.id_diretor},
        ${diretorAtividade.id_atividade}
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

const updateDiretorAtividade = async function (diretorAtividade) {
    try {
        let sql = `update tbl_diretor_atividade set
        id_atividade = ${diretorAtividade.id_atividade},
        id_diretor = ${diretorAtividade.id_diretor}
        where id = ${diretorAtividade.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllDiretorAtividade = async function () {
    try {
        let sql = `select * from tbl_diretor_atividade order by id desc;`

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

const selectByIdDiretorAtividade = async function (id) {
    try {
        let sql = `select * from tbl_diretor_atividade where id = ${id}`

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
const selectAtividadeByIdDiretor = async function (idDiretor) {
    try {
        let sql = `select tbl_atividade.* 
                    from tbl_diretor
                        inner join tbl_diretor_atividade
                            on tbl_diretor.id = tbl_diretor_atividade.id_diretor
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_diretor_atividade.id_atividade
                    where tbl_diretor.id = ${idDiretor}`

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

const selectDiretorByIdAtividade = async function (idAtividade) {
    try {
        let sql = `select tbl_diretor.*
                    from tbl_diretor
                        inner join tbl_diretor_atividade
                            on tbl_diretor.id = tbl_diretor_atividade.id_diretor
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_diretor_atividade.id_atividade
                    where tbl_atividade.id = ${idAtividade}`

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
const deleteDiretorAtividade = async function (id) {
    try {
        let sql = `delete from tbl_diretor_atividade where id = ${id};`

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
const deleteAtividadeByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_atividade where id_diretor = ${idDiretor};`

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

const deleteDiretorByIdAtividade = async function (idAtividade) {
    try {
        let sql = `delete from tbl_diretor_atividade where id_atividade = ${idAtividade};`

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
    insertDiretorAtividade,
    updateDiretorAtividade,
    selectAllDiretorAtividade,
    selectByIdDiretorAtividade,
    selectDiretorByIdAtividade,
    selectAtividadeByIdDiretor,
    deleteDiretorAtividade,
    deleteAtividadeByIdDiretor,
    deleteDiretorByIdAtividade
}