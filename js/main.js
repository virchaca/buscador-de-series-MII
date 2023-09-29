'use strict'

/*pasos
1 - hacer HTML
2 - buscar/filtrar series y pelis de TV
    1- traer constantes
    2- evento click sobre boton --> ejecuta handle
    3- funcion handle:
        - ev.preventDefault()
        - recoger valor input ¿funcion o constante GLOBAL?
        - filtrar lo k hay en API con FETCH("https://api.tvmaze.com/search/shows?q=${name}"):
            Mirar en JSON el nombre de los datos que necesito!!!
            
        - PINTAR titulo y foto:
            - pintar solo name y image --> BUCLE
            - dar estilo con clase en CSS
            - CONDICIONAL: si no tiene img, poner la mia por defecto (https://via.placeholder.com/210x295/ffffff/666666/?text=TV)

3 - Favoritas
    1 - evento click sobre las peliculas --> ¿crear qsALL y currentTarget?

    2- Pintar el listado de fav:
        - El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
        - listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas --> CREAR ARRAY VACIO PARA METER LAS FAVS, fuera, GLOBAL y LETs 
        - Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda. ¿LOCALSTORAGE? ¿+=?

4. Almacenamiento local en el localStorage. 
creo cobst para almacenar, hago un JSON.stringify al ARRAY de FAVS, luego tendre que llamrlo para que salga por defecto al LEVANTAR la pagina.
(al recargar la página el listado de favoritos se debe mostrarse)
*/


//constantes

const input = document.querySelector ('.js-input');
const btnS= document.querySelector ('.js-search');
const container = document.querySelector ('.js-container');
const fav = document.querySelector ('.js-fav');

// creo una funcion para poder poner algo predeterminado, o poner un value en el input de html???

// const url = `https://api.tvmaze.com/search/shows?q=${valueI}`;

let searchList = []; //mi array con el obj show
// let favList = [];

// funciones

function getApiInfo () {
    const valueI = input.value;    
    fetch(`//api.tvmaze.com/search/shows?q=${valueI}`)
    .then((response) => response.json())
    .then(dataApi => {       
        console.log(dataApi);
        searchList = dataApi;    
        renderList();  /*la llamo dentro de la respuesta del servidor, que es cuando me ha llegado la info*/
    });
}
getApiInfo (); //para que me pinte grils al levantar pagina


function renderList() {    
    console.log('holaaaa');
    container.innerHTML = '';
    console.log(searchList);
    
    for (let i=0; i<searchList.length; i++) {
        let src= searchList[i].show.image;

        if(searchList[i].show.image=== null){
        src ='https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }else{src = searchList[i].show.image.medium}

        container.innerHTML+=`<li class= "li">
        <article class= "article"> 
        <h3>${searchList[i].show.name}</h3>
        <img src= "${src}" alt= "" class= "img" />
        </article>
        </li>`;       
   
    }  
}  

// Con operador ternario para src: let src = searchList[i].show.image ? searchList[i].show.image.medium : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

  
   
  

function handleClick(event) {
    event.preventDefault();
    //llamar info de API --> fetch
    getApiInfo ();
    
    
};

// llamar funciones


//eventos

btnS.addEventListener('click', handleClick);













/* Bonus:
 1 - que sobre cada fav haya una X (ejercicio Dayana sept) y que al  darle, borre de la LISTA y del LOCALST.

 2 - si hago CLICK sobre SERIE en listado SEARCH, se borre de lista FAVS (como ejemplo yanelis 28 sept)

 3 - En listado SEARCH, si la peli está en FAVs, que aparezca de DISTINTO COLOR

 4 - Al final de FAVs, haya un BOTON RESET que me borre todo el Listado FAVs.
*/