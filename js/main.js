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
    1 - evento click sobre las peliculas --> crear qsALL y currentTarget

    2- Pintar el listado de fav:
        - El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
        - listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas --> CREAR ARRAY VACIO PARA METER LAS FAVS, fuera, GLOBAL y LETs 
        - Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda. ¿LOCALSTORAGE para FAV? ¿+=?

4. Almacenamiento local en el localStorage. 
creo const para almacenar, hago un JSON.stringify para el ARRAY de FAVS, luego tendre que llamarlo para que salga por defecto al LEVANTAR la pagina.
(al recargar la página el listado de favoritos debe mostrarse)
*/


//constantes

const input = document.querySelector ('.js-input');
const btnS= document.querySelector ('.js-search');
const container = document.querySelector ('.js-container');
const fav = document.querySelector ('.js-fav');
const btnX = document.querySelector('.js-x');
const btnR = document.querySelector('.js-reset');
// creo una funcion para poder poner algo predeterminado, o poner un value en el input de html???

// const url = `https://api.tvmaze.com/search/shows?q=${valueI}`;

let searchList = []; //mi array con el obj show
let favList = []; //lista favoritos
const myList = JSON.parse(localStorage.getItem("myShows"));
//llamo mi constante con la info del localstorage que he guardado tras crear mi lista de favoritos

//pongo que cuando levante la pagina, si hay info en el localstorage sobre mi lista de favoritos, la muestre/pinte
if(myList !==null){
    favList=myList;
    renderListFav();
}

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
getApiInfo (); //para que me pinte dexter al levantar pagina


function renderList() {        
    container.innerHTML = '';
    // console.log(searchList);   
   
    for (let i=0; i<searchList.length; i++) {
        let src= searchList[i].show.image;
        
        if(searchList[i].show.image=== null){
        src ='https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }else{src = searchList[i].show.image.medium}

        container.innerHTML+=`
            <li class= "li js-li" id= ${searchList[i].show.id} >
                
                    <img src= "${src}" alt= "" class= "imgSearch" />
                    <span class= "pSearch">${searchList[i].show.name}</span>
                            
            </li>`;       
    }  
    addFav();   //llamo a mi funcion de añadir a favoritos una vez tengo pintada la lista, porque voy a clickar en ella 
}  

// Con operador ternario para src: let src = searchList[i].show.image ? searchList[i].show.image.medium : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

function handleClick(event) {
    event.preventDefault();
    //llamar info de API --> fetch
    getApiInfo ();        
};

//**********series favoritas**********************/ 

function handleAdd(ev){
    // console.log(ev.target);
    // console.log(ev.currentTarget.id);
    const idShow = parseInt(ev.currentTarget.id); 
    //pongo un parseInt() porque el id son numeros, no string
    let favShow = searchList.find(item=>item.show.id === idShow);
        
    //comprobar si está en el listado de favoritos
    const indexFav = favList.findIndex(item=>item.show.id === idShow);
    
    // if(favList.includes(ev.currentTarget)){ ev.currentTarget.classList.add('change');}
    if(indexFav === -1){
        favList.push(favShow); 
        // -1 siginifica que no está, si no está, lo meto en el array favList
        ev.currentTarget.classList.add('change');

    }else{
        favList.splice(indexFav, 1); 
     //si está, al clickar, lo elimino (1 elemento desde posicion indexFav)
     ev.currentTarget.classList.remove('change');     
    }
    // console.log(`mi lista favoritas ${favList}`);
        //pintar en HTML       
    renderListFav();  
    localStorage.setItem("myShows", JSON.stringify(favList));
}  
              
function renderListFav() {
    // console.log('holaaaa');
    fav.innerHTML= '';
    for (let i=0; i<favList.length; i++) {
    let src2= favList[i].show.image;  
    //hago el condicional antes de pintar el html
    //tengo que poner en todo favList[i], no favShow, porque ahi le estaría pasando UN elemento
        if(favList[i].show.image=== null){
            src2 ='https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }else{src2 = favList[i].show.image.medium;}
        fav.innerHTML+=
            `<li class= "fav"  >
                <article class= "artFav">
                    <span class= "h3Fav">${favList[i].show.name}</span>
                    <img src= "${src2}" alt= "" class= "imgFav" />
                    <button class="x js-liF" id="${favList[i].show.id}">x</button>
                    
                </article>
                </li>`;  
        }
    removeFavs(); //llamo a la funcion de borrar favs con X cuando haya pintado la lista!!
    localStorage.setItem("myShows", JSON.stringify(favList)); //me actualice la info del LocalStorage sin este elemento
}

function addFav () {    
    const allShows = document.querySelectorAll('.js-li');
    // console.log(allShows);
    for(const item of allShows){
        item.addEventListener('click', handleAdd);        
    }    
}
/****remove from fav by clicking***/

function handleRemoveAdd(e){
    // console.log(e.target);
    // console.log(e.currentTarget.id);
    //pongo el ID al BOTON, que es a quien quiero localizar(al pintar la lista de favs lo ponia al <li>, que era a quien queria pintar.)

    const idFav = parseInt(e.currentTarget.id); 
    // pongo un parseInt() porque el id son numeros, no string
     
    //comprobar si está en el listado de favoritos
    const indexNoFav = favList.findIndex(itemF=>itemF.show.id === idFav);
   //encuentro el elemeno COMPLETO por medio del indice del BOTON

    favList.splice(indexNoFav, 1);         

    renderListFav();  //volver a pintar en HTML lista actualizada
    localStorage.setItem("myShows", JSON.stringify(favList));
}  

function removeFavs () { 
    //hago qsALL a las X de la lista favList, recorro bucle. 
    const allFavs= document.querySelectorAll('.js-liF');    
    for(const itemF of allFavs){
        itemF.addEventListener('click', handleRemoveAdd);        
    }   
}
    
function handleReset () {
    favList = [];
    fav.innerHTML = "";
    location.reload();
    localStorage.setItem("myShows", JSON.stringify(favList));
}

//eventos

btnS.addEventListener('click', handleClick);
btnR.addEventListener ('click', handleReset);



/* Bonus:
 1 - que sobre cada fav haya una X y que al  darle, borre de la LISTA y del LOCALST. HECHO

 2 - si hago CLICK sobre SERIE en listado SEARCH, se borre de lista FAVS (como ejemplo yanelis 28 sept) HECHO

 3 - En listado SEARCH, si la peli está en FAVs, que aparezca de DISTINTO COLOR A MEDIAS, NO SE QUEDA MARCADO AL REFRESCAR PAGINA

 4 - Al final de FAVs, haya un BOTON RESET que me borre todo el Listado FAVs. HHECHO
*/