//Trabajo final - PMIW
//Grupo_Lucas Salvatierra_Sofía Pisani
//Película seleccionada: Toy Story 3
//video: https://youtu.be/vQVqeP7lBys

//variables
let sonidoMusica;
let pantalla = 15;
let textos = [];
let imagenes = [];
let imagenInicio;
let textosnotas = [];
let botonA = "SI";
let botonB = "NO";
let botonc = "EMPEZAR";
let botond = "CRÉDITOS";
let finales = [3,4,7,8,9,11,12];

//carga de imagenes/textos
function preload(){
  textosnotas = loadStrings("data/textos.txt");
  
for (let i = 0; i < 13; i++) {
    imagenes[i] = loadImage("data/imagenes/pantalla_"+nf(i+1,2)+".jpg");
  }
  
//imagen para la pantalla de inicio
  imagenInicio = loadImage("data/imagenes/pantalla_15.jpg");
}


function setup(){
createCanvas(640,480);

//música
sonidoMusica = document.getElementById("sonido-musica");

//for para acomodar los textos "en orden"
for (let i = 0; i < textosnotas.length; i++) {
    let linea = textosnotas[i];
    let lineaArray = split(linea, "#");
    textos[lineaArray[0]] = lineaArray[1];
  }
}


function draw(){
console.log(pantalla);

//empieza en la pantalla 15
if (pantalla===15){
  //inicio
background(240,6,120);
image(imagenInicio,0,0,width,height);
fill(255);
textSize(20);
textStyle(BOLD);
textAlign(CENTER);
text("¿Estás listo para acompañar a los juguetes \nen una de sus aventuras?", width/2, height/2-100);
text(botonc, width/2,height/2+100);


fill(255);
textSize(20);
textAlign(CENTER);
text(botond, width/2, height/2+150);

}
//pantalla de creditos
else if (pantalla ===13){
  background(0);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("CRÉDITOS", width/2,75);
  text("Sofía Pisani(119112/9)",width/2,180);
  text("Lucas Salvatierra(119140/4)",width/2,240);
  text("Profesor: David Bedoian", width/2,400);
  
// Botón "Volver"
    fill(255);
    rect(250, 420, 140, 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text("VOLVER", 250 + 70, 420 + 25);
  } else if (finales.includes(pantalla)) {
    // Pantallas de final
    image(imagenes[pantalla], 0, 0, 640, 480);
    fill(255);
    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER);
    text(textos[pantalla], 0, 250, width, height * 0.4);
    
    // Botón "Volver" 
    fill(255);
    rect(250, 420, 140, 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text("VOLVER", 250 + 70, 420 + 25);
  } else {

image (imagenes[pantalla], 0, 0, 640, 480);

fill(255);
  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER);
  text(textos[pantalla], 0, 250, width, height * 0.4);

if(!finales.includes(pantalla)){

dibujoBoton();
}}}

//botones
function dibujoBoton() {
  // Botón Sí
  fill(255);
  rect(150, 420, 100, 50);
  fill(0);
  textSize(20);
  textAlign(CENTER,CENTER);
  text(botonA, 150 + 50, 420 + 25);

  // Botón No
  fill(255);
  rect(400, 420, 100, 50);
  fill(0);
  text(botonB, 400 + 50, 420 + 25);
}


function mousePressed(){
    
   //navegacion de inicio a "historia"
  if(pantalla=== 15){
   if(colisionBoton(width/2-50,height/2+70,100,40)){
    sonidoMusica.currentTime = 0;
    sonidoMusica.play();
    
     pantalla = 0;
   }
   //pantalla de créditos
   else if(colisionBoton(width/2-50,height/2+120,100,40)){
   pantalla = 13;
   }
  } else if (pantalla === 13) {
    // Lógica para volver desde Créditos 
    if (colisionBoton(250, 420, 140, 50)) {
      pantalla = 15; // Volver a inicio
    }
  } else if (finales.includes(pantalla)) {
    // Lógica para volver desde pantallas de final
    if (colisionBoton(250, 420, 140, 50)) {
      pantalla = 15; // Volver a inicio
    }}
  //navegacion de pantallas
  else if (pantalla === 0) {
    // Botón "Sí"
    if (colisionBoton(150, 420, 100, 50) ) {
      pantalla=1;
    }
    // Botón "No"
    else if (colisionBoton(400, 420, 100, 50)) {
      pantalla = 2;
    }
  } else if (pantalla===1) {
    if (colisionBoton(150, 420, 100, 50)) {
      pantalla=5;
    } else if (colisionBoton(400, 420, 100, 50)) {
      pantalla = 6;
    }   
  } else if (pantalla===2) {
    if (colisionBoton(150, 420, 100, 50)) {
      pantalla=4;
    } else if (colisionBoton(400, 420, 100, 50)) {
      pantalla = 3; 
    }
  } else if (pantalla===5) {
    if (colisionBoton(150, 420, 100, 50)) {
      pantalla=9; 
    } else if (colisionBoton(400, 420, 100, 50)) {
      pantalla = 10; 
    }        
  } else if (pantalla===6) {
    if (colisionBoton(150, 420, 100, 50)) {
      pantalla=7;
    } else if (colisionBoton(400, 420, 100, 50)) {
      pantalla = 8;
    } 
  } else if (pantalla===10) {
    if (colisionBoton(150, 420, 100, 50)) {
      pantalla=11; 
    } else if (colisionBoton(400, 420, 100, 50)) {
      pantalla = 12;
    }
  }
}



function colisionBoton(x, y,w,h){
  if(mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h){
    return true
  }else{ 
    return false 
  }
}
