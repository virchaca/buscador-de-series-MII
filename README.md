# modulo-2-evaluacion-final-_Virginia Alvarez Perez_
modulo-2-evaluacion-final-virchaca created by GitHub Classroom

Módulo 2: Ejercicio de evaluación final

Despues de mes y medio de bootCamp, hemos terminado el segundo módulo, JavaScript, y vamos a realizar un ejercicio para comprobar que hemos asentado nuestros nuevos conocimientos.
Lo primero crearemos este repositorio en GitHub y lo clonaremos en una carpeta en nuestro ordenador para trabajar con él. Por último publicaremos nuestro trabajo en GitHubPages, el enlace a GitHub Pages se mostrará en la página página principal del repositorio, en la parte superior, al lado de la descripción.

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, con una lista de favoritas, donde podamos guardar nuestras pelis/series favoritas haciendo click sobre la que nos guste.
Nuestras favoritas quedarán guardadas en local storage.

Para desarrollar el ejercicio, usaremos diferentes tipos de lenguaje, `HTML`, `CSS` y `JS`.

Lo primero realizaremos una estructura básica de HTML, con un campo de texto y un botón para buscar series por su título, a la que daremos dinamismo por medio de ordenes y funciones de JS. 
En esta ocasión el estilo de la página web será algo secundario, centrándonos más en la parte de JavaScript.
Es importante linkar los archivvos CSS y JS correctamente a nuestro documento HTML.
```bash
<head>
	....
	<link rel="stylesheet" href="css/main.css">
</head>
```
```bash
<body>
	....
	<script src="js/main.js"></script>
</body>
```

Los pasos seguidos son los siguietes:

1. Estructura básica de HTML
Campo para buscar, seccion para pintar nuestra lista de favoritos y seccion para pintar los resultados de nuestra búsqueda.
```bash
        <header>
		<h1>Buscador de Series</h1>
       		<form action="">
            	<input type="text"/>
            	<button ">SEARCH</button>
        	</form>
	</header>
```
```bash
        <div>
            <h2 class="h2Fav">Mis Favoritas</h2>
            <section class="sectionFav js-fav"></section>
            <button class="js-reset btn">RESET</button>
        </div>
```
```bash
        <div>
            <h2>Recomendaciones y búsquedas</h2>
            <section></section>
        </div> 
```
2. `Búsqueda`:
   
Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TVMaze para
búsqueda de series. 

Esto lo conseguimos mediante petición fetch a la api indicada, que nos devolverá como respuesta, las series que coincidan con nuestra búsqueda.
Creando una función render, renderizaremos cada serie con su nombre e imagen en la pagina. Las series que aun no tengan una imagen asociada, llevaran por defecto una que nosotros le hemos puesto.

Ejecutaremos estas funciones asignando un evento click al botón de buscar.

3. `Favoritos`:
   
Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series
favoritas haciendo clic sobre una serie. El listado de favoritas aparecerá siempre en la parte izquierda de la pantalla, debajo del formulario de búsqueda. 
Para ello definimos una función utilizando el selector querySelectorAll y el sistema currentTarget para que cada vez que la usuaria pinche una serie, esta se añada a la lista de favoritos, y cambie su color de fondo y fuente.

De nuevo definiremos una funcion render que renderice dicha lista.

4. `Almacenamiento local`:

Mediante la siguiente orden, guardaremos esta informacion en el localStorage para que quede almacenada para mayor comodidad de la usuaria.
```bash
localStorage.setItem("myShows", JSON.stringify(favList));

const myList = JSON.parse(localStorage.getItem("myShows"));
```
y le indico al ordenador, que si cuando levante la pagina hay pelis o series en mi lista, me las muestre:
```bash
if(myList !==null){
    favList=myList;
    renderListFav();
}
```

5. `BONUS`: 

-> Al final de la lista de favoritos hemos creado un botón reset que, al hacer click sobre él, borra todos los favoritos a la vez.
```bash
function handleReset () {...};
btnR.addEventListener ('click', handleReset);
```
-> Además, al hacer click sobre una serie del listado de búsqueda que esté en nuestras favoritas, se elimina de la lista.
-> Si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparece resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados), mediante su localización por método ```bash findIndex```.
-> Al hacer clic sobre el icono de una 'x' al lado de cada favorito, se borra ese favorito clicado de la lista y del localStorage, esto lo conseguimos de nuevo creando otro  querySelectorAll y el sistema currentTarget, mediante la función
```bash
removeFavs();
```
que llamaremos dentro de la función renderListFav(), donde además, actualizaré de nuevo la infomracion guardada en mi localStorage.

Os dejo por aqui el enlace a la página para que lo tengais a mano
http://beta.adalab.es/modulo-2-evaluacion-final-virchaca/

