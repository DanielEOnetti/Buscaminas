# Buscaminas - Mini Proyecto de JavaScript

## Descripción

Este proyecto es un **mini juego de Buscaminas** desarrollado como parte del módulo de JavaScript en mis clases.  
El objetivo del proyecto es practicar la **manipulación dinámica del DOM**, el **uso de eventos**, la **lógica de juego**, y conceptos como **recursión** y **almacenamiento local** (`localStorage`) para guardar el mejor tiempo del jugador.

El juego permite:  

- Seleccionar diferentes niveles de dificultad (Fácil, Medio, Difícil).  
- Marcar celdas con banderas.  
- Revelar celdas vacías automáticamente con lógica recursiva.  
- Contar el número de minas restantes en tiempo real.  
- Guardar el mejor tiempo por tamaño de tablero usando `localStorage`.  
- Reiniciar el juego sin necesidad de recargar la página.

---

## Tecnologías usadas

- **HTML5**: para la estructura del tablero y la interfaz.  
- **CSS3**: para el diseño, estilos de celdas y responsividad.  
- **JavaScript (ES6)**: para toda la lógica del juego, manejo de eventos y actualización dinámica del DOM.

---

## Cómo usarlo

1. Clonar o descargar este repositorio.  
2. Abrir el archivo `index.html` en un navegador moderno (Chrome, Firefox, Edge…).  
3. Seleccionar la dificultad deseada usando el menú desplegable.  
4. Hacer clic en las celdas para revelar su contenido.  
5. Hacer clic derecho en las celdas para marcar o desmarcar banderas.  
6. Usar el botón **Reiniciar** para comenzar una nueva partida en cualquier momento.  
7. Al ganar, el juego guarda el **mejor tiempo** para ese tamaño de tablero.

---

## Estructura del proyecto

buscaminas/
│
├─ index.html # Archivo principal del juego
├─ README
└─ style.css # Estilos del tablero y elementos
├─ script.js # Lógica completa del juego en JavaScript

## Autor

**Daniel Echarri Onetti**  
Mini proyecto de JavaScript para el módulo de JavaScript.