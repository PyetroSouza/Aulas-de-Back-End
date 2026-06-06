/*****************************************************************************
 * Objeivo: Arquivo responsável pelo CRUD de dados da tabela da relação entre Ator e Foto no banco de dados 
 *           MySQL
 * Data: 29/05/2026
 * Autor: Pyetro
 * Versão: 1.0
 *****************************************************************************/

//Import da biblioteca para manipular dados Banco de Dados MySql
const knex = require("knex")

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração (no caso: knexDataBaseConfig)
const knexConection = knex(knexDataBaseConfig.development)

const insertAtorFoto = async function (atorFoto) {
    try {
        let sql =
            `insert into tbl_ator_foto (
        id_ator,
        id_foto
        ) values (
        ${atorFoto.id_ator},
        ${atorFoto.id_foto}
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

const updateAtorFoto = async function (atorFoto) {
    try {
        let sql = `update tbl_ator_foto set
        id_foto = ${atorFoto.id_foto},
        id_ator = ${atorFoto.id_ator}
        where id = ${atorFoto.id}`

        let result = await knexConection.raw(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllAtorFoto = async function () {
    try {
        let sql = `select * from tbl_ator_foto order by id desc;`

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

const selectByIdAtorFoto = async function (id) {
    try {
        let sql = `select * from tbl_ator_foto where id = ${id}`

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
const selectFotoByIdAtor = async function (idAtor) {
    try {
        let sql = `select tbl_foto.* 
                    from tbl_ator
                        inner join tbl_ator_foto
                            on tbl_ator.id = tbl_ator_foto.id_ator
                        inner join tbl_foto
                            on tbl_foto.id = tbl_ator_foto.id_foto 
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

const selectAtorByIdFoto = async function (idFoto) {
    try {
        let sql = `select tbl_ator.*
                    from tbl_ator
                        inner join tbl_ator_foto
                            on tbl_ator.id = tbl_ator_foto.id_ator
                        inner join tbl_foto
                            on tbl_foto.id = tbl_ator_foto.id_foto 
                    where tbl_foto.id = ${idFoto}`

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
const deleteAtorFoto = async function (id) {
    try {
        let sql = `delete from tbl_ator_foto where id = ${id};`

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
const deleteFotosByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_foto where id_ator = ${idAtor};`

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
    insertAtorFoto,
    updateAtorFoto,
    selectAllAtorFoto,
    selectByIdAtorFoto,
    selectFotoByIdAtor,
    selectAtorByIdFoto,
    deleteAtorFoto,
    deleteFotosByIdAtor
}