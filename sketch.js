var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backImage, backgr;
var player,player_running;
var ground,ground_img;

var Foodgroup, Bananagroup;
var obstaclesgroup, obstacle_img

var gameover;
var score = 0;


function preload(){
  backImage=loadImage("jungle.jpg")
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyImage = loadAnimation("Monkey_03.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImg = loadImage("stone.png");
  
}


function setup()  
{
  createCanvas(600, 500);
  
  background=createSprite(300,250,600,500);
  background.addImage(backImage);
  background.scale = 1.2;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("playerstop",monkeyImage);
  player.scale=0.1;
  //player.debug=true;
  
  ground = createSprite(300,470,600,20);
  ground.visible=false;
  
  Foodgroup = new Group();
  obstaclesgroup = new Group();
  
  score = 0;
  
  stroke("black");
  textSize(20);
  fill("white");
}


function draw() 
{
  
  
 drawSprites();
  
   if(gameState === PLAY)
   {
     
     background.velocityX = -4;
     
     if(background.x<0)
     {
       background.x=background.width/2;
     }
     
     if(ground.x<0)
     {
       ground.x=ground.width/2;
     }
     
     player.changeAnimation("Running");
     
     if(Foodgroup.isTouching(player))
       {
         Foodgroup.get(0).destroy();
         score=score+1;
       }
     
      text("score "+score,500,50)
     
     if(obstaclesgroup.isTouching(player))
     {
       gameState = END;
     }
     
     spawnfood();
     spawnstone();
     
     if(keyDown("space")&& player.y >= 429)
       {
         player.velocityY = -12;
       }
         
         player.velocityY = player.velocityY + 0.5;
       
   }
  
  else if (gameState === END)
  {
    background.velocityX = 0
    Foodgroup.setVelocityXEach (0) 
    obstaclesgroup.setVelocityXEach (0)
    obstaclesgroup.setLifetimeEach(-1)
    Foodgroup.setLifetimeEach(-1)
    textSize (30);
    text("GAMEOVER",240,200)
    textSize (27)
    text("Press 1 Key to Restart Game",150,250)
    
    
    if(keyDown("1")&& gameState === END)
    {
      reset();
      
    }
    
   player.velocityY = 0
    
    player.changeAnimation("playerstop")
    
  }
  
    player.collide(ground)
   
}
 function spawnfood()
{
  if(frameCount%100 === 0){
   banana = createSprite(600,350,20,20)
   banana.velocityX = -4;
   banana.scale = 0.06
   banana.addImage(bananaImage)
   Foodgroup.add(banana)
   banana.lifetime = 160
  }  
   
   
 }

 function spawnstone()
{
   if(frameCount%100 === 0)
   {
     stone = createSprite(600,430,20,20)
     stone.setCollider ("circle",0,0,180)
     stone.velocityX = -4
     stone.scale = 0.16
     stone.addImage(obstacleImg)
     obstaclesgroup.add(stone)
     stone.lifetime = 160
   }
   
   
   
   
 }

   function reset()
  {
    gameState = PLAY
    score = 0
    obstaclesgroup.destroyEach()
    Foodgroup.destroyEach()
     
     
     
  }

