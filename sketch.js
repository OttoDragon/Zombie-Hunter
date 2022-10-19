var bg;

var gameOver = false;

var menu;
var play, play2;
var zh, zh2;
var somMenu;
var mute_btn;
var hehe;
var surpresa;

var spawn, spawnImg;
var piso, pisoImg;
var piso2;

var ninja;
var ninjaParado;
var ninjaAndando;
var ninjaPulando;
var ninjaAtacando;
var ninjaArremessando;
var ninjaDash;
var espada;

var vidaImg, vida1, vida2, vida3, vida4;
var vidas = [];

var ZMandando, ZMmorrendo;
var zumbi;
var suporte;

var superIMG;
var suuper;

var goImg, go;


function preload(){
  goImg = loadImage('gameOver.png');
  espada = loadSound('espada.mp3');
  surpresa = loadSound('surpresa.mp3');
  bg = loadImage('BG.png');
  menu = loadImage('menu.png');
  play2 = loadImage('play.png');
  zh2 = loadImage('zh.png');
  somMenu = loadSound('Mjogo.mp3');
  spawnImg = loadImage('chao1.png');
  pisoImg = loadImage('chao2.png');
  vidaImg = loadImage('life.png');
  ninjaParado = loadAnimation('Idle__000.png','Idle__009.png');
  ninjaAndando = loadAnimation('Run__000.png','Run__009.png');
  ninjaPulando = loadAnimation('Jump__000.png','Jump__009.png');
  ninjaAtacando = loadAnimation('Attack__000.png','Attack__009.png');
  ninjaArremessando = loadAnimation('Throw__000.png', 'Throw__009.png');
//ninjaDash = loadAnimation('Slide__000.png, Slide__009.png');
  ZMandando = loadAnimation('male/Walk1.png', 'male/Walk10.png');
  ZMmorrendo = loadAnimation('male/Dead1.png', 'male/Dead12.png');
}

function setup() {
  createCanvas(1280, 716)
  //menu
  edges = createEdgeSprites();

  suporte = createSprite(windowWidth / 2, 630, 1000000000000000000000000, 89);
  suporte.setCollider('rectangle', 0, 0, 1000000000000000000, 100);
  suporte.debug = true;
  suporte.visible = false;

  play = createSprite (windowWidth / 2, 500, 5, 5);
  play.addImage(play2);

  zh = createSprite (windowWidth / 2, 200, 5, 5);
  zh.addImage(zh2);

  mute_btn = createImg('mute.png');
  mute_btn.position(windowWidth - 100,windowHeight - 575);
  mute_btn.size(70,70);
  mute_btn.mouseClicked(mute);

  hehe = createImg('nsei.png');
  hehe.position(windowWidth - 670,windowHeight - 575);
  hehe.size(70,70);
  hehe.mouseClicked(hihi);
  hehe.visible = false;

  //vidas
  
  vida1 = createSprite(40, 50);
  vida1.addImage(vidaImg);
  vida1.scale = 0.2;
  vida1.visible = false;
  vidas.push(vida1);

  vida2 = createSprite(140, 50);
  vida2.addImage(vidaImg);
  vida2.scale = 0.2;
  vida2.visible = false;
  vidas.push(vida2);

  vida3 = createSprite(240, 50);
  vida3.addImage(vidaImg);
  vida3.scale = 0.2;
  vida3.visible = false;
  vidas.push(vida3);

  vida4 = createSprite(240, 50);
  vida4.addImage(vidaImg);
  vida4.scale = 0.2;
  vida4.visible = false;
  vidas.push(vida4);

  spawn = createSprite(190, 650);
  spawn.addImage(spawnImg);
  spawn.visible = false;

  zumbi = new Zumbi(width / 2, 0);
  zumbi.sprite.visible = false;

  ninja = createSprite(100, 530);
  ninja.addAnimation('ninjaParado', ninjaParado);
  ninja.addAnimation('ninjaAndando', ninjaAndando);
  ninja.addAnimation('ninjaPulando', ninjaPulando);
  ninja.addAnimation('ninjaAtacando', ninjaAtacando);
  ninja.visible = false;
  
  piso = createSprite(650, 450);
  piso.addImage(pisoImg);
  piso.visible = false;
  piso.setCollider('rectangle', 0, 0, 500, 100);
  piso.debug = true;

  piso2 = createSprite(1090, 650);
  piso2.addImage(spawnImg);
  piso2.visible = false;
}

function draw () {
  //menu
  if(mousePressedOver(play)){
   start();
  }

  if(ninja.isTouching(edges)){
    morte();
  }

  if(vidas.length == 0){
    gameOver = true;
  }
  if(gameOver == true){
    perdeu();
  }

 zumbi.display();
 zumbi.sprite.velocityY += 0.8;

  ninja.velocityY += 1;
  ninja.scale = 0.4;
  ninja.collide(spawn);
  ninja.collide(piso);
  ninja.collide(piso2);
  ninja.setCollider('rectangle', 0, 0, 150, 430);
  ninja.debug = true;
  ataque();
  movimento();
  
  fill('white');
  textSize(20);
  text('para melhor experiência, favor apertar F11', play.width - 100, 100 );
  background(bg);
  drawSprites()
}

function mute(){
  if(!somMenu.isPlaying())
     {
      somMenu.play();
      somMenu.setVolume(0.3);
     }
     else{
      somMenu.stop();
     }
}

function colisao(){
  ninja.collide(spawn);
}

function start(){
  ninja.x = 100;
   ninja.y = 530;
   ninja.visible = true;
   spawn.visible = true;
   piso.visible = true;
   piso2.visible = true;
   vida1.visible = true;
   vida2.visible = true;
   vida3.visible = true;
   vida4.visible = true;
   hehe.visible = true;
   zumbi.sprite.visible = true;
  play.remove();
  zh.remove();
}

function movimento(){
  if(keyIsDown(65)){
    //esquerda
    ninja.changeAnimation('ninjaAndando', ninjaAndando);
    ninja.mirrorX(-1);
    ninja.x = ninja.x - 10;
  }
  else if(keyIsDown(68)){
    //direita
    ninja.changeAnimation('ninjaAndando', ninjaAndando);
    ninja.mirrorX(1);
    ninja.x = ninja.x + 10;
  }
  else if(ninja.collide(spawn) || 
    ninja.collide(piso) || 
    ninja.collide(piso2)){
    ninja.changeAnimation('ninjaParado');
  }



  if((keyIsDown(32) || keyIsDown(87))){
    //cima
    ninja.velocityY = -18;
    ninja.changeAnimation('ninjaPulando');
    
  }

  if(keyIsDown(83)){
    //baixo?
  }
}

function ataque(){
  if(keyIsDown(69)){
    ninja.changeAnimation('ninjaAtacando');
    //espada.play(loop = false);
    if(ninja.isTouching(zumbi.sprite)){
      zumbi.morte();
    }
  }
  else{
    ninja.changeAnimation('ninjaParado');
    //espada.stop();
  }
}

function hihi(){
  surpresa.play(loop = false);
}

function morte(){
  ninja.x = 100;
  ninja.y = 530;
  vidas[vidas.length -1].destroy();
  vidas.pop();
}

function perdeu(){
  go = createSprite(windowWidth / 2, windowHeight / 2);
  go.addImage(goImg);
  ninja.destroy();
  if(mousePressedOver(go)){
    window.location.reload();
  }
}