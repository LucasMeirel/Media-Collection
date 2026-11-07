genreModel = require("../models/genreModel");

function cadastrar(idGenero, nome_genero) {
    genreModel.cadastrar(idGenero, nome_genero)
/*             .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            ); */
    }

module.exports = {
    cadastrar
}