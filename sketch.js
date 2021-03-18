var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaimg,foodG;
var stone,stoneimg,stoneG;
var gameover,gameoverIMG;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("stone.png");
  gameoverIMG = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameover = createSprite(300,200,800,10);
  gameover.addImage(gameoverIMG);
  gameover.scale = 0.7
  gameover.visible=false;
  
  foodG = createGroup();
  stoneG = createGroup();
}

function draw() { 
  background(0);
    drawSprites();
   fill("red");
   textSize(20);
   text("score:"+score,550,50);
  
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(foodG.isTouching(player)){
    foodG.destroyEach();
    player.scale += 0.02;
    score += 10;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnBananas();
    spawnstones();
  }
  if(stoneG.isTouching(player)){
    gameState = END;
  }
  if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;
    foodG.destroyEach();
    stoneG.destroyEach();
    gameover.visible = true;
  }

}
function spawnBananas() {
    if(frameCount%80 === 0){
      banana = createSprite(600,350,100,100);
      banana.y = random(120,200);
      banana.addImage(bananaimg);
      banana.scale = 0.05;
      banana.velocityX = -4;
      banana.lifetime = 300;
      foodG.add(banana);
      player.depth = banana.depth+1;
    }
}
function spawnstones() {
    if(frameCount%300 === 0){
      stone = createSprite(800,350,100,100);
      // stone.y = random(120,200);
      stone.addImage(stoneimg);
      stone.scale = 0.2;
      stone.velocityX = -5;
      banana.lifetime = 350;
      stoneG.add(stone);
    }
}