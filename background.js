
var ancho = document.getElementById('canvas').offsetWidth;
var alto = document.getElementById('canvas').offsetHeight;

var graficos;
var estrellas;
var estrellasTitilando;
var cantEstrellas;
var titilandoMax;

function setup(){
    //creo el canvas y lo pongo de hijo del contenedor
    createCanvas(ancho,alto).parent('canvas');
    graficos = createGraphics(ancho,alto);
    //inicializo estrellas
    estrellas = [];
    cantEstrellas = 1500;
    for(let i=0; i<cantEstrellas;i++){
        estrellas[i] = new Estrella;
        estrellas[i].show(graficos);
    }
    //inicializo variables para hacer estrellas titilar
    titilandoMax = 4;
    estrellasTitilando = [estrellas[0]];
}

//si el tamaño de la ventana cambia tambien tiene que cambiar el canvas y su distribucion de estrellas
//@todo redistribuir estrellas
function windowResized(){
    var ancho = document.getElementById('canvas').offsetWidth;
    var alto = document.getElementById('canvas').offsetHeight;
    resizeCanvas(ancho, alto);
}

function draw(){
    clear();
    image(graficos,0,0);
    animar();
}

function animar(){
    // si no hay estrellas titilando
    if(!estrellasTitilando[0].titilando){
        //selecciono estrellas al azar para que titilen
        for(let i = 0; i<titilandoMax; i++){
          estrellasTitilando[i] = estrellas[floor(random(cantEstrellas))];
          estrellasTitilando[i].titilar();
        }
      }
    else{
        //sino sigo animando las que ya titilaban
        for(let i = 0; i<titilandoMax; i++){
          estrellasTitilando[i].titilar();
        }
    }
}

class Estrella{
    constructor(){
      this.pos = createVector(random(width),random(height));
      this.size = random(1,3);
      this.time = 0;
      this.timeMax = 25;
      this.titilando = false;
      this.sizeA = 0;
      this.sizeMax = 2;
      this.vel = this.sizeMax / (this.timeMax/2);
    }
    show(canv){
      let a = map(this.pos.y,0,alto,255,0);
      for(let i=1;i<10;i++){
        canv.noStroke()
        canv.fill(255,255,255,a/(i*i*i));
        canv.ellipse(this.pos.x,this.pos.y,this.size*(i/1.2));
      }
    }
    titilar(){
      if (!this.titilando){
        this.titilando = true;
        this.time = this.timeMax;
      }
      let a = map(this.pos.y,0,alto,255,0);
      for(let i=1;i<5;i++){
        noStroke()
        fill(210,200,255,a/(i*i*i));
        ellipse(this.pos.x,this.pos.y,(this.size*(i/1.2)*this.sizeA));
      }
      
      this.sizeA += this.vel;
      this.time--;
      if(this.sizeA>this.sizeMax){
        this.vel *= -1
      }
      if(this.time==0){
        this.titilando = false;
        this.sizeA = 0;
        this.vel *= -1; 
      }
    }
}
