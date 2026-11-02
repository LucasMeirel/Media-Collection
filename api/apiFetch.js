const maximo_filmes = 15;
var contagem_filmes = 0

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: '[token]'
  }
};

async function buscar(){
    msg.innerHTML = '';
    contagem_filmes = 0;
    const query = ipt_filme.value;

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options);
    
    const data = await response.json()
    const pag = data.total_pages;

    for(var pagina = 1; pagina <= pag; pagina++){
        const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${pagina}&include_adult=false`, options)
        const resposta_data = await resposta.json();
        resposta_data.results.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));

    for (const movie of resposta_data.results){
        if (contagem_filmes < maximo_filmes){
            msg.innerHTML += await buscar_releases(movie.id) 
        }
    };
    }


}

async function buscar_releases(movie){
    const filme = await fetch(`https://api.themoviedb.org/3/movie/${movie}/release_dates`, options);
    const data_filme = await filme.json();
    var teve_dvd = false;

    data_filme.results.forEach(pais => {
        pais.release_dates.forEach(lancamento => {
            if (lancamento.type === 5) {
                teve_dvd = true;
            }
    })
    })

    if(teve_dvd){
        console.log('imagem!')
        return await exibir_imagens(movie)
    }

    return '';
}

async function exibir_imagens(movie) {
    const imagem = await fetch (`https://api.themoviedb.org/3/movie/${movie}`, options);
    const response = await imagem.json();
    const caminho_imagem = response.poster_path;
    const title = response.title;
    console.log(title)

    if(!caminho_imagem){
        return ''
    }else{
        contagem_filmes++
        return `<div class="movie_div"> <img class="poster" src="https://image.tmdb.org/t/p/original/${caminho_imagem}" <label>${title}</label> </div>`
    }
    

}


// buscar();
/* const resposta_tudo = await fetch(`https://api.themoviedb.org/3/discover/movie`, options);
const data = await resposta_tudo.json()
console.log(data); */

/* data.results.forEach(element => {
    console.log(element.title)
}); */