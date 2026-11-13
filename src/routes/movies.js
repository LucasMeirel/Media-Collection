var express = require("express");
var router = express.Router();

var movie_searchController = require("../controllers/movie_searchController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/pesquisar", function (req, res) {
    movie_searchController.pesquisar(req, res);
})

module.exports = router;