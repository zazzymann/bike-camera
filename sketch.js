var caminho,imgCaminho;
var jogador1,jogador2,jogador3;
var imgCaminho,img1CiclistaPrincipal,img2CiclistaPrincipal;

var opRosaimg1,opRosaimg2;
var opAmareloimg1,opAmareloimg2;
var opVermelhoimg1,opVermelhoimg2;
var imgFimJogo,sinoBicicleta;

var CGRosa, CGAmarelo,CGVermelho; 

var ENCERRAMENTO =0;
var JOGAR =1;
var estadoJogo = JOGAR;

var distancia=0;
var fimdeJogo, recomecar;

function preload(){
  imgCaminho = loadImage("images/Road.png");
  img1CiclistaPrincipal = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  img2CiclistaPrincipal= loadAnimation("images/mainPlayer3.png");
  
  opRosaimg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  opRosaimg2 = loadAnimation("images/opponent3.png");
  
  opAmareloimg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  opAmareloimg2 = loadAnimation("images/opponent6.png");
  
  opVermelhoimg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  opVermelhoimg2 = loadAnimation("images/opponent9.png");
  
  sinoBicicleta = loadSound("sound/bell.mp3");
  imgFimJogo = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// movendo o plano de fundo
caminho=createSprite(100,150);
caminho.addImage(imgCaminho);
caminho.velocityX = -5;

//criando o ciclista correndo de bicicleta
ciclistaPrincipal  = createSprite(70,150);
ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
ciclistaPrincipal.scale=0.07;
  
//definir collider para o ciclista

  
fimdeJogo = createSprite(650,150);
fimdeJogo.addImage(imgFimJogo);
fimdeJogo.scale = 0.8;
fimdeJogo.visible = false;  
  
CGRosa = new Group();
CGAmarelo = new Group();
CGVermelho = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distancia,900,30);
  
  if(estadoJogo===JOGAR){
    
   distancia = distancia + Math.round(getFrameRate()/50);
   caminho.velocityX = -(6 + 2*distancia/150);
  
   ciclistaPrincipal.y = World.mouseY;
  
   edges= createEdgeSprites();
   ciclistaPrincipal .collide(edges);

   camera.position.x = displayWidth/4;
   camera.position.y = ciclistaPrincipal.y;
  
  //código para resetar o plano de fundo
  if(caminho.x < 0 ){
    caminho.x = width/2;
  }
  
    //código para tocar o som do sino da bicicleta
  if(keyDown("space")) {
    sinoBicicleta.play();
  }
  
  //criando oponentes continuos
  var selecionar_jogadorOP = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (selecionar_jogadorOP == 1) {
      ciclistaRosa();
    } else if (selecionar_jogadorOP == 2) {
      ciclistaAmarelo();
    } else {
      ciclistaVermelho();
    }
  }
  
   if(CGRosa.isTouching(ciclistaPrincipal)){
     estadoJogo = ENCERRAMENTO;
     jogador1.velocityY = 0;
     jogador1.addAnimation("opponentPlayer1",opRosaimg2);
    }
    
    if(CGAmarelo.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador2.velocityY = 0;
      jogador2.addAnimation("opponentPlayer2",opAmareloimg2);
    }
    
    if(CGVermelho.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador3.velocityY = 0;
      jogador3.addAnimation("opponentPlayer3",opVermelhoimg2);
    }
    
}else if (estadoJogo === ENCERRAMENTO) {
    fimdeJogo.visible = true;
    //Adicione o código para mostrar instruções de reinicialização do jogo em texto aqui
  
  
    caminho.velocityX = 0;
    imgCaminho.velocityY = 0;
 ciclistaPrincipal.addAnimation("SahilRunning",img2CiclistaPrincipal);
  
    CGRosa.setVelocityXEach(0);
    CGRosa.setLifetimeEach(-1);
  
    CGAmarelo.setVelocityXEach(0);
    CGAmarelo.setLifetimeEach(-1);
  
    CGVermelho.setVelocityXEach(0);
    CGVermelho.setLifetimeEach(-1);
    textSize(50);
    text("aperte space para reniciar",200,200)

    //condição de gravação para chamada de reset()
  if (keyDown("space")){
    reset();
  }
}
}

function ciclistaRosa(){
        jogador1 =createSprite(1100,Math.round(random(50, 250)));
        jogador1.scale =0.06;
        jogador1.velocityX = -(6 + 2*distancia/150);
        jogador1.addAnimation("opponentPlayer1",opRosaimg1);
        jogador1.setLifetime=170;
        CGRosa.add(jogador1);
}

function ciclistaAmarelo(){
        jogador2 =createSprite(1100,Math.round(random(50, 250)));
        jogador2.scale =0.06;
        jogador2.velocityX = -(6 + 2*distancia/150);
        jogador2.addAnimation("opponentPlayer2",opAmareloimg1);
        jogador2.setLifetime=170;
        CGAmarelo.add(jogador2);
}

function ciclistaVermelho(){
        jogador3 =createSprite(1100,Math.round(random(50, 250)));
        jogador3.scale =0.06;
        jogador3.velocityX = -(6 + 2*distancia/150);
        jogador3.addAnimation("opponentPlayer3",opVermelhoimg1);
        jogador3.setLifetime=170;
        CGVermelho.add(jogador3);
}

// criar função de redefinição aqui
function reset(){
  CGVermelho.destroyEach();
  CGRosa.destroyEach();
  CGAmarelo.destroyEach();
  estadoJogo = JOGAR;            ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
  fimdeJogo.visible = false;
  distancia = 0;
}


