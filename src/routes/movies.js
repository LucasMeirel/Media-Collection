var express = require("express");
var router = express.Router();

var movie_searchController = require("../controllers/movie_searchController");

// Pesquisa sem filtro de usuário. Todos os filmes.
router.post("/pesquisar", function (req, res) {
    movie_searchController.pesquisar(req, res);
})


// Pesquisa pela coleção do usuário (colecao = id)
router.post("/buscar/:search", function (req, res) {
    movie_searchController.pesquisar_id(req, res);
});

module.exports = router;