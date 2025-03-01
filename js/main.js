"use strict";

//constantes
const input = document.querySelector(".js-input");
const btnS = document.querySelector(".js-search");
const container = document.querySelector(".js-container");
const fav = document.querySelector(".js-fav");
const btnX = document.querySelector(".js-x");
const btnR = document.querySelector(".js-reset");

//recogeré el VALUE de input paraponerlo en la URL del fetch ${input.value}.

let searchList = []; //inicializo array de búsqueda vacío
let favList = []; //inicializo lista favoritos
const myList = JSON.parse(localStorage.getItem("myShows"));
//traigo la info del localstorage que he guardado tras crear mi lista de favoritos

if (myList !== null) {
  favList = myList;
  renderListFav();
}
//cuando levante la pagina, si hay series favoritas en el localstorage, las pinte

// funciones

function renderList() {
  container.innerHTML = "";
  let classFav = "";

  for (let i = 0; i < searchList.length; i++) {
    let src = searchList[i].show.image;
    //para acceder a la imagen, po la forma del json
    let classFav = ""; 
    //para añadir la clase change con estilo cuando esté en favoritos

    const idShow = favList.findIndex(
      (film) => film.show.id === searchList[i].show.id
    );

    if (idShow !== -1) {
      classFav = "change";
    }
    //si el show NO está en favs, findIndex es -1 -> cuando sea distinto de -1, es que si lo tengo en favs--> le añado clase change

    //hago el condicional para la imagen antes de pintar el html
    if (searchList[i].show.image === null) {
        src = "./images/no-image.png";

    } else {
      src = searchList[i].show.image.medium;
    }

    container.innerHTML += `
            <li class= "li js-li liSearch ${classFav}" id= ${searchList[i].show.id}>
                <article>
                    <img src= "${src}" alt= "imagen portada" class= "imgSearch" />
                    <span class= "pSearch">${searchList[i].show.name}</span>
                </article>            
            </li>`;
  }

  addFav(); //llamo a mi funcion de añadir a favoritos una vez tengo pintada la lista, porque voy a clickar en ella
}

// Con operador ternario para src: let src = searchList[i].show.image ? searchList[i].show.image.medium : '../image/no-image.png';

function getApiInfo() {
  const valueI = input.value;
  fetch(`//api.tvmaze.com/search/shows?q=${valueI}`)
    .then((response) => response.json())
    .then((dataApi) => {
    //   console.log(dataApi);
      searchList = dataApi;
      renderList(); /*la llamo dentro de la respuesta del servidor, que es cuando me ha llegado la info*/
    });
}
getApiInfo(); //para que me pinte serie que indico en input html al levantar pagina

function handleClick(event) {
  event.preventDefault();
  getApiInfo();
}

//**********favorite shows**********************/

function handleAdd(ev) {
  // console.log(ev.target);
  // console.log(ev.currentTarget.id);
  const idShow = parseInt(ev.currentTarget.id);
  //pongo un parseInt() porque el id son numeros, no string
  let favShow = searchList.find((item) => item.show.id === idShow);
  //encontrar el elemento

  const indexFav = favList.findIndex((item) => item.show.id === idShow);
  //comprobar si está en el listado de favoritos

  if (indexFav === -1) {
    favList.push(favShow);
    // -1 siginifica que no está, si no está, lo meto en el array favList
  } else {
    favList.splice(indexFav, 1);
    //si está, al clickar, lo elimino (1 elemento desde posicion indexFav)
  }
  //una vez que haya definido cuando añadir/eliminar favoritos, renderizo de nuevo ambas listas, renederList y renderListaFav
  renderListFav();
  renderList();
  localStorage.setItem("myShows", JSON.stringify(favList));
}

function renderListFav() {
  fav.innerHTML = "";
  for (let i = 0; i < favList.length; i++) {
    let src2 = favList[i].show.image;
    //tengo que poner en todo favList[i], no favShow, porque ahi le estaría pasando UN elemento
    if (favList[i].show.image === null) {
      //si la img no tiene url, pongo no-image.png
      src2 = "./images/no-image.png";
    } else {
      src2 = favList[i].show.image.medium;
    }
    fav.innerHTML += `<li class= "fav favItem"  >
                <article class= "artFav id= ${favList[i].show.id}">
                    <span class= "h3Fav">${favList[i].show.name}</span>
                    <img src= "${src2}" alt= "imagen portada" class= "imgFav"  />
                    <button class="x js-liF" id="${favList[i].show.id}">Quitar</button>                    
                </article>
                </li>`;
  }
  removeFavs(); //llamo a la funcion de borrar favs con X cuando haya pintado la lista!!
  localStorage.setItem("myShows", JSON.stringify(favList)); 
  //me actualice la info del LocalStorage sin este elemento
}

function addFav() {
  const allShows = document.querySelectorAll(".js-li");
  // qsALL para seleccionar todos los <li> que haya en la lista search, y recorro el bucle que se forma para poner un evento click al que clicke --> eso lo defino en la funcion handleAdd mediante currentTarget.
  for (const item of allShows) {
    item.addEventListener("click", handleAdd);
  }
}

/****remove from fav by clicking***/
function handleRemoveAdd(e) {
  //pongo el ID al BOTON, que es a quien quiero localizar(al pintar la lista de favs lo ponia al <li>, que era a quien queria pintar.)

  const idFav = parseInt(e.currentTarget.id);
  // pongo un parseInt() porque el id son numeros, no string

  const indexNoFav = favList.findIndex((itemF) => itemF.show.id === idFav);
  //encuentro el elemeno COMPLETO por medio del indice del BOTON, si está en el listado de favoritos

  favList.splice(indexNoFav, 1);
  //elimino 1 obj desde ese indice.

  renderListFav(); //volver a pintar en HTML ambas listas actualizadas
  renderList();
  localStorage.setItem("myShows", JSON.stringify(favList));
}

function removeFavs() {
  //hago qsALL a las X de la lista favList, recorro bucle.
  const allFavs = document.querySelectorAll(".js-liF");
  for (const itemF of allFavs) {
    itemF.addEventListener("click", handleRemoveAdd);
  }
}

function handleReset() {
  favList = [];
  fav.innerHTML = "";
  renderList(); //reescribir la lista para actualizar a quien quitarle la clase de estilos de favs, change
  localStorage.setItem("myShows", JSON.stringify(favList));
}

//eventos
btnS.addEventListener("click", handleClick);
btnR.addEventListener("click", handleReset);


// abrir juego PIEDRA PAPEL TIJERA en título
const btnOpenGame = document.getElementById("btnOpenGame");

btnOpenGame.addEventListener("click", function () {
  window.open(
    "./game.html",
    "JuegoPiedraPapelTijera",
    "width=800,height=600,left=100,top=100,resizable=no"
  );
});


// manejar el modal
const modalGame = document.getElementById("modalGame");
const btnConfirmGame = document.getElementById("btnConfirmGame");
const closeModal = document.querySelector(".close-modal-js");

closeModal.addEventListener("click", function () {
    modalGame.classList.add("hidden");
});

btnConfirmGame.addEventListener("click", function () {
    modalGame.classList.add("hidden"); 
  window.open(
    "./game.html",
    "JuegoPiedraPapelTijera",
    "width=800,height=600,left=100,top=100,resizable=no"
  );
});

function showModalAgain() {
    modalGame.classList.remove("hidden");
}

setInterval(showModalAgain, 60000);









/*pasos
1 - buscar/filtrar series y pelis de TV
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
            - CONDICIONAL: si no tiene img, poner la mia por defecto no-image.png

2 - Favoritas
    1 - evento click sobre las peliculas --> crear qsALL y currentTarget
    2 - Pintar el listado de fav:
        - Al seleccionar una serie los estilos cambian, indicando que es una serie favorita.
        - listado en la parte izquierda de la pantalla con las series favoritas 
            --> CREAR ARRAY VACIO PARA METER LAS FAVS, fuera, GLOBAL y LETs 
        - Las favoritas seguiran en la lista aunque la usuaria realice otra búsqueda.             
            ¿LOCALSTORAGE para FAV? ¿+=?

3. Almacenamiento local en el localStorage. 
        creo const para almacenar, hago un JSON.stringify para el ARRAY de FAVS, luego tendre que llamarlo para que salga por defecto al LEVANTAR la pagina. Paso a JSON.parse
        (al recargar la página el listado de favoritos, si hay, debe mostrarse)
*/