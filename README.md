# 📺 Buscador de Series & Juego Piedra, Papel o Tijera

Este proyecto es una aplicación web interactiva que permite a los usuarios buscar y guardar sus series favoritas, además de disfrutar de un divertido juego de Piedra, Papel o Tijera.

## 🚀 Funcionalidades

### 🔍 Buscador de Series
- Permite buscar series mediante un campo de entrada.
- Recupera información de series desde una API externa.
- Muestra una lista de resultados con imágenes y títulos.
- Permite agregar y eliminar series a una lista de favoritos.
- Almacena las series favoritas en el almacenamiento local del navegador (localStorage) para su persistencia.
- Indica cuando una serie no tiene imagen disponible, mostrando una imagen por defecto.

### ⭐ Gestión de Favoritos
- Sección específica donde se almacenan las series marcadas como favoritas.
- Opción para eliminar series de la lista de favoritos.
- Persistencia de datos mediante localStorage.

### 🎮 Juego de Piedra, Papel o Tijera
- Interfaz interactiva para jugar contra la IA.
- Registra y muestra el resultado de cada ronda.
- Se adapta visualmente al diseño del buscador de series.

## 🛠️ Tecnologías utilizadas
- **HTML5, CSS3 y SASS**: Maquetación y estilos.
- **JavaScript (ES6)**: Lógica de la aplicación.
- **LocalStorage**: Almacenamiento de favoritos.
- **APIs externas**: Para obtener datos de las series.
- **GitHub Pages**: Despliegue de la aplicación.

## 📂 Estructura del Proyecto
```
📁 proyecto-buscador-series-juego
 ├── 📂 css (Estilos de la aplicación)
 ├── 📂 images (Recursos gráficos)
 ├── 📂 js (Lógica y funcionalidades)
 ├── 📄 index.html (Página principal)
 ├── 📄 README.md (Este archivo)
```

## 📌 Instalación y ejecución
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/virchaca/buscador-de-series-MII.git
   ```
2. Acceder al directorio del proyecto:
   ```bash
   cd buscador-de-series-MII
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Ejecutar el proyecto en local:
   ```bash
   npm start
   ```

## 🚀 Despliegue en GitHub Pages
Para actualizar la versión en GitHub Pages, ejecutar:
```bash
npm run deploy
```

## 📬 Contacto
Si tienes dudas o sugerencias, puedes contactarme a través de [LinkedIn](https://www.linkedin.com/in/virginia-alvarezperez/) o visitar mi [GitHub](https://github.com/virchaca).

¡Gracias por visitar el proyecto! 😊





Los pasos seguidos son los siguientes:

1. Estructura básica de HTML
Campo para buscar, seccion para pintar nuestra lista de favoritos y seccion para pintar los resultados de nuestra búsqueda.

2. `Búsqueda`:
   
Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TVMaze para
búsqueda de series. 

Esto lo conseguimos mediante petición fetch a la api, que nos devuelve como respuesta un listado de las series que coincidan con nuestra búsqueda.
Las series que aun no tengan una imagen asociada, llevaran por defecto una que nosotros le hemos puesto.

Ejecutaremos estas funciones asignando un evento click al botón de buscar.

3. `Favoritos`:
   
La usuaria puede seleccionar series favoritas haciendo clic sobre ellas. El listado de favoritas se almacenará en el localStorage para no perderlo. Además, los estilos de las series marcadas como favoritas cambiarán para diferenciarla del resto dentro del listado normal. 


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

5. `resteando nuestra lista`: 

- Al final de la lista de favoritos hemos creado un botón reset que, al hacer click sobre él, borra todos los favoritos a la vez.
```bash
function handleReset () {...};
btnR.addEventListener ('click', handleReset);
```
- Además, al hacer click sobre una serie del listado de búsqueda que esté en nuestras favoritas, se elimina de la lista.
- Si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparece resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados), mediante su localización por método ```findIndex```.
- Al hacer clic sobre el icono de una 'x' al lado de cada favorito, se borra ese favorito clicado de la lista y del localStorage, esto lo conseguimos de nuevo creando otro  querySelectorAll y el sistema currentTarget, mediante la función
```bash
removeFavs();
```
que llamaremos dentro de la función renderListFav(), donde además, actualizaré de nuevo la infomracion guardada en mi localStorage.

Os dejo por aqui el enlace a la página para que lo tengais a mano
http://beta.adalab.es/modulo-2-evaluacion-final-virchaca/

