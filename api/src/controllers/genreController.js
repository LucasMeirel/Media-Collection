genreModel = require("../models/genreModel");

function cadastrar(idGenero, nome_genero) {
    genreModel.cadastrar(idGenero, nome_genero)
    }

module.exports = {
    cadastrar
}