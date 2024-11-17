// COMISIÓN 3 - DAVID BEDOIAN
//TP FINAL PARTE 2
//TP: SOFIA PISANI - LUCAS SALVATIERRA
//link: https://youtu.be/I2pX4ZeCxeE


let sonidoMusica;
let pantalla = 1;
let portada;
let muñecos = [];
let vidas;
let estadoJuego;
let puntos = 0;
let objetivo = 10;

let victoria;
let derrota;
let fondoimag;
let pantinstru;
let muñecoMaloImagen;
let muñecoImagen;
let cajon;
let imagencaja;
let corazonImagen;


function preload(){
portada = loadImage("data/imagenes/inicio1.jpg");

muñecoImagen = loadImage("data/imagenes/lagarra2.png");

imagencaja = loadImage("data/imagenes/caja2.png");

corazonImagen = loadImage("data/imagenes/corazon2.png");

muñecoMaloImagen = loadImage ("data/imagenes/Zurg.png");

pantinstru = loadImage("data/imagenes/instrucciones1.png");

fondoimag = loadImage("data/imagenes/pantallainicio.jpg");

derrota = loadImage("data/imagenes/derrota.jpg");

victoria = loadImage("data/imagenes/victoria2.png");
}

function setup() {
  createCanvas(640,480);
  
  //musica
  sonidoMusica = document.getElementById("sonido-musica");
  
  if(sonidoMusica){
    sonidoMusica.loop = true;
    sonidoMusica.style.display = "none";
  }
  cajon = new caja();
  vidas = new Vidas(2);
  
}


//pantalla de Juego
function pantallaJuego(){
background(50);
image(fondoimag, 0, 0);

if(frameCount % 60 === 0){
  if(random(1)< 0.2){
  muñecos.push(new MuñecoMalo());
  } else{
muñecos.push(new muñeco());

}
}

for(let i = muñecos.length - 1; i >= 0; i--){
muñecos[i].mostrar();
muñecos[i].mover();

if (muñecos[i]instanceof muñeco && muñecos[i].y > cajon.y && muñecos[i].x > cajon.x && muñecos[i].x < cajon.x + cajon.ancho){
    muñecos.splice(i,1);
    puntos++;
}

  else if(muñecos[i]instanceof MuñecoMalo && muñecos[i].y > cajon.y && muñecos[i].x > cajon.x && muñecos[i].x < cajon.x + cajon.ancho){

    muñecos.splice(i,1);
    puntos--;
 } else if(muñecos[i].y > height){
     if (muñecos[i] instanceof muñeco){
       vidas.perderVida();
 }
 muñecos.splice(i,1);
}
}



vidas.mostrar();

fill(255);
textSize(20);
text("Puntaje:" + puntos, 100, 90);

if (vidas.cantidad <=0){
  estadoJuego = "derrota";
  pantalla = 4;
} else if (puntos >= objetivo){
  estadoJuego = "victoria";
  pantalla = 4;
}

//mostrar cajon
cajon.mostrar();
cajon.mover();
}

class muñeco{
constructor(){
this.x = random(width);
this.y = 0
this.vel = random(4,7);
this.size = 80;
}

mostrar(){
image(muñecoImagen, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
}

mover(){
this.y += this.vel;
}

}

class Vidas {
constructor(cantidadInicial){
this.cantidad = cantidadInicial;
}

mostrar(){
for (let i = 0; i < this.cantidad; i++){
  image(corazonImagen, 10 + i * 40, 10, 30, 30);
}
}

perderVida(){
if (this.cantidad > 0){
  this.cantidad--;
}
}

}


//cajon
class caja{
constructor(){
this.x = width/2 - 75;
this.y = height - 90;
this.ancho = 150;
this.alto = 80;
}

mostrar(){
image(imagencaja, this.x, this.y, this.ancho, this.alto);
}

mover(){
this.x = mouseX - this.ancho/2;
}
}

class MuñecoMalo{
constructor(){
this.x = random(width);
this.y = 0;
this.vel = random(4,7);
this.size = 80;
}

mostrar(){
image(muñecoMaloImagen, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
}

mover(){
this.y += this.vel;
}
}



function draw() {
  console.log();
 background(200);

//navegacion de pantallas
if(pantalla===1){
pantallaPrincipal();
} else if(pantalla === 2){
pantallaInstrucciones();
} else if (pantalla === 3){
pantallaJuego();
} else if(pantalla === 4){
pantallaVictoriaoderrota();
} else if (pantalla === 5){
pantallaCreditos();}

}



//Pantalla de Inicio
function pantallaPrincipal(){

image(portada, 0, 0);
  
//Título
fill(255);
rect(width/2-110, height/4-50, 220,70);
textAlign(CENTER);
textSize(40);
fill(0);
text("Toy Story 3", width/2, height/4);

//Botón Iniciar
fill(100,200,100);
rect(width/2-75, height/2+80, 150, 50);
fill(0);
textSize(20);
text("Iniciar", width/2, height/2+112);

//Botón Créditos
fill(100,200,100);
rect(width/2-75, height/2+150, 150, 50);
fill(0);
text("Créditos", width/2, height/2+182);
}



//Juego
function pantallaInstrucciones(){
  
  image(pantinstru, 0,-100);
  
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(25);
  fill(255);
  text("¿Cómo jugar?", width/2 - 200, height/2 - 180);
 
 textAlign(LEFT);
  textSize(15);
  text("1. ¡Ten cuidad! tienes dos vidas, si te quedas sin ellas, pierdes.", 50, height/2 - 130);
  text("2. Tienes que agarrar a 10 marcianitos para poder ganar, ayúdate \ncon el mouse para tener control de la caja y poder recogerlos.", 50, height/2 -100);
  text("3. ¡Cuidado con Zurg! Si lo recoges a \nél te quitara puntos, evitando que ganes.", 50, height/2 - 55);
  text("¡Suerte!", 50, height/2 +20);
  
 
  //boton empezar
  textAlign(CENTER);
  fill(100,200,100);
  rect(width/2+124, height/2+168, 150,50);
  textSize(20);
  fill(0);
  text("Empezar", width/2+200, height/2+200);
}


function pantallaVictoriaoderrota(){
background(0);
textAlign(CENTER);
fill(255);

if(estadoJuego === "victoria"){
  image(victoria, 0,0);
  textSize(32);
  text("¡Has ganado!", width/2, height/2 + 50);
  
fill(100, 150,250);
rect(width/2 -75, height/2 +70, 150, 50);
fill(0);
textSize(15);
text("Menú Principal", width/2, height/2 + 100);

fill(100, 150, 250);
rect(width/2 -75, height/2 + 150, 150,50);
fill(0);
textSize(15);
text("Volver a jugar", width/2, height/2 + 180);

  
} else if (estadoJuego === "derrota"){
  image(derrota, 0, 0);
  
  textSize(32);
  text("Oh no ¡Has perdido!", width/2, height/2 + 20);
  
  fill(100, 150,250);
rect(width/2 -75, height/2 +70, 150, 50);
fill(0);
textSize(15);
text("Menú Principal", width/2, height/2 + 100);

fill(100, 150, 250);
rect(width/2 -75, height/2 + 150, 150,50);
fill(0);
textSize(15);
text("Volver a intentar", width/2, height/2 + 180);
}

}


//Pantalla de créditos
function pantallaCreditos(){
textAlign(CENTER);
textSize(20);
fill(0);
text("Juego desarrollado por: \nSofía Pisani(119112/9) \nLucas Salvatierra(119140/4)", width/2, height/2-100);

text("Profesor: David Bedoian", width/2, height/2+20);

//Botón para volver al Inicio
fill(100,150,250);
rect(width/2-75, height/2+150, 150,50);
fill(0);
textSize(16);
text("Menú principal", width/2, height/2+180);
}



//funcion de botones
function mousePressed(){
if(pantalla === 1){
  //Botón Iniciar
  if( mouseX >= width/2 - 75 && mouseX <= width/2 + 75 && mouseY >= height/2 + 80 && mouseY <= height/2 + 130){   
  pantalla = 2; }
  
  if(sonidoMusica && sonidoMusica.paused){
  sonidoMusica.play();
}
 //Botón Créditos
 if(mouseX >= width/2 - 75 && mouseX <= width/2 + 75 && mouseY >= height/2 + 148 && mouseY <= height/2 + 200){
 pantalla = 5;
 }
} else if(pantalla === 5){
  if(mouseX >= width/2 - 75 && mouseX <= width/2 + 75 && mouseY >= height/2 + 150 && mouseY <= height/2 + 200){
  pantalla = 1;
}
} else if(pantalla === 2){
  if(mouseX >= width/2 + 124 && mouseX <= width/2 + 124 + 150 && mouseY >= height/2 + 168 && mouseY <= height/2 + 168 + 50){
  pantalla = 3;
  }
} //se resetea todo al volver al menú
  if(pantalla === 4){
  if(mouseX >= width/2 - 75 && mouseX <=width/2 + 75 && mouseY >= height/2 + 50 && mouseY <= height/2 + 100){
    pantalla = 1;
    estadoJuego = "";
    vidas = new Vidas(2);
    muñecos = [];
    puntos = 0;
  } 
  if (pantalla === 4 && estadoJuego === "derrota") {
    if (mouseX >= width / 2 - 75 && mouseX <= width / 2 + 75 && mouseY >= height / 2 + 150 && mouseY <= height / 2 + 200) {
      pantalla = 3; 
      estadoJuego = ""; 
      vidas = new Vidas(2); 
      muñecos = [];
      puntos = 0;
    }
  } else if (pantalla === 4 && estadoJuego === "victoria"){
    if (mouseX >= width / 2 - 75 && mouseX <= width / 2 + 75 && mouseY >= height / 2 + 150 && mouseY <= height / 2 + 200) {
      pantalla = 3; 
      estadoJuego = ""; 
      vidas = new Vidas(2); 
      muñecos = [];
      puntos = 0;
  }}
}}
