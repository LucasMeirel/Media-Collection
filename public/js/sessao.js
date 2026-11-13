// sessão
function validarSessaoFilm() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var buttons = document.getElementById("left");

    if (email != null && nome != null) {
        buttons.innerHTML += 
        '<a href="collection.html"><button class="attached_button">My Collection</button></a> <button class="attached_button">Dashboard</button>';
    } else {
        console.log("não logado")
    }
}

function validarSessaoCollection() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var buttons = document.getElementById("left");

    if (email != null && nome != null) {
        buttons.innerHTML += 
        '<a href="collection.html"><button class="selected attached_button">My Collection</button></a> <button class="attached_button">Dashboard</button>';
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

