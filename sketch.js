var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana;
var stone_img,stone;
var gameover_img,gameover;
var foodGroup,obstaclesGroup;   

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana = loadImage("banana.png");
  stone = loadImage("stone.png");
  gameover = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  console.log("1");

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

  console.log("2");
   
  foodGroup = new Group();
  obstaclesGroup = new Group();      
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
    spawnFood();
  rock();

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

 }
 

if(foodGroup.isTouching(player)){
 foodGroup.destroyEach();
 score = score +1;
 player.scale +=+0.020;
}
 
 ;

  drawSprites();

  stroke("black");
  strokeWeight(5)
  textSize(30);
  fill("cyan");
  text("score :"+ score,400,50);

  if(obstaclesGroup.isTouching(player)){
    gameState = END;  
   }
   else if(gameState === END){
      backgr.velocityX = 0 
      player.visible = false;
  
      foodGroup.destroyEach();
      obstaclesGroup.destroyEach();
       
      textSize(30);
      fill(255);
      text("Game Over!",300,200)
   }  
}

function spawnFood(){
  if(frameCount % 120 === 0){
   var banana1 = createSprite(750,100,20,50);
   banana1.addImage(banana);
   banana1.y = Math.round(random(50,300));
   banana1.scale = 0.06;
   banana1.velocityX = -6;
   banana1.lifetime = 300;  
   player.depth = banana1.depth + 1;
   foodGroup.add(banana1);
  } 
} 

function rock(){
  if(frameCount % 150 === 0){
   stone_img = createSprite(750,340,20,50);
   stone_img.addImage("rock",stone);
   stone_img.scale = 0.5;
   stone_img.velocityX = -14;
   stone_img.lifetime = 1200;
   obstaclesGroup.add(stone_img);
  }
}

