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

// creo una funcion para poder poner algo predeterminado, o poner un value en el input de html???

// const url = `https://api.tvmaze.com/search/shows?q=${valueI}`;

let searchList = []; //mi array con el obj show
let favList = []; //lista favoritos
const myList = JSON.parse(localStorage.getItem("myShows"));
//lamo mi constante con la info del localstorage que he guardado tras crear mi lista de favoritos

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
    // console.log('holaaaa');
    container.innerHTML = '';
    console.log(searchList);    
    for (let i=0; i<searchList.length; i++) {
        let src= searchList[i].show.image;
        //hago el condicional antes de pintar el html

        if(searchList[i].show.image=== null){
        src ='https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }else{src = searchList[i].show.image.medium}

        container.innerHTML+=`
            <li class= "li js-li" id= ${searchList[i].show.id} >
                <img src= "${src}" alt= "" class= "img" />
                <h3>${searchList[i].show.name}</h3>                
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
    console.log(ev.currentTarget.id);
    const idShow = parseInt(ev.currentTarget.id); 
    //pongo un parseInt() porque el id son numeros, no string
    let favShow = searchList.find(item=>item.show.id === idShow);
    console.log(favShow);
    
    //comprobar si está en el listado de favoritos
    const indexFav = favList.findIndex(item=>item.show.id === idShow);
    console.log(`mi index ${indexFav}`);

    if(indexFav === -1){
        favList.push(favShow); 
        // -1 siginifica que no está, si no está, lo meto en el array favList
    }else{
        favList.splice(indexFav, 1); 
     //si está, al clickar, lo elimino (1 elemento desde posicion indexFav)
    
    }
    console.log(`mi lista favoritas ${favList}`);
    localStorage.setItem("myShows", JSON.stringify(favList));

    //pintar en HTML
    renderListFav();  
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
    }else{src2 = favList[i].show.image.medium}
        fav.innerHTML+=
            `<li class= "fav js-li" id="" >
                <img src= "${src2}" alt= "" class= "img" />
                <h3>${favList[i].show.name}</h3>
            </li>`;  
    }    
}

function addFav () {    
    const allShows = document.querySelectorAll('.js-li');
    // console.log(allShows);
    for(const item of allShows){
        item.addEventListener('click', handleAdd);
    }
    
}

/***********************************************/


//eventos

btnS.addEventListener('click', handleClick);

/*******guardar en localStorage****/













/* Bonus:
 1 - que sobre cada fav haya una X (ejercicio Dayana sept) y que al  darle, borre de la LISTA y del LOCALST.

 2 - si hago CLICK sobre SERIE en listado SEARCH, se borre de lista FAVS (como ejemplo yanelis 28 sept)

 3 - En listado SEARCH, si la peli está en FAVs, que aparezca de DISTINTO COLOR

 4 - Al final de FAVs, haya un BOTON RESET que me borre todo el Listado FAVs.
*/