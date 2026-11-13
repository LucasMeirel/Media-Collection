var movie_searchModel = require("../models/movie_searchModel");

function pesquisar(req, res) {
    var search = req.body.searchServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        movie_searchModel.pesquisar(search)
            .then((resultadoSearch)  => {
                    console.log(`\nResultados encontrados: ${resultadoSearch.length}`);
                    //console.log(`Resultados: ${JSON.stringify(resultadoSearch)}`); // transforma JSON em String
                    if (resultadoSearch.length == 0){
                        console.log('Filme não encontrado')
                        res.status(403).send("Filme não encontrado)");
                    }
                    else{
                        console.log(resultadoSearch);
                        res.json(resultadoSearch);
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pesquisar os filmes! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function pesquisar_id(req, res) {
    var id = req.body.idServer;
    var search = req.body.searchServer;
    console.log(search)

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        movie_searchModel.pesquisar_id(id, search)
            .then((resultadoSearch)  => {
                    console.log(`\nResultados encontrados: ${resultadoSearch.length}`);
                    //console.log(`Resultados: ${JSON.stringify(resultadoSearch)}`); // transforma JSON em String
                    if (resultadoSearch.length == 0){
                        console.log('Filme não encontrado')
                        res.status(403).send("Filme não encontrado)");
                    }
                    else{
                        console.log(resultadoSearch);
                        res.json(resultadoSearch);
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pesquisar os filmes! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    pesquisar,
    pesquisar_id
}