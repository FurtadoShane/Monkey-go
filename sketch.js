var gameState=PLAY;
var PLAY, END;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacles, obstaclesImage;
var FoodGroup, obstaclesGroup;
var score=0;
var ground, gground;

function preload(){
  
  //monkey running
 monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png", "sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png", "sprite_7.png","sprite_8.png")
 
  //banana loadImage
    bananaImage = loadImage("banana.png");
  
  //obstacle loadImage
    obstaclesImage = loadImage("obstacle.png");
 
  //dead monkey
    die= loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(700,400);
  
  obstaclesGroup= createGroup();
  foodGroup= createGroup();
  
  //draw monkey
    monkey=createSprite(40,355,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.1;
          
  //ground
    ground=createSprite(0,365,2000,10)
  
  //invisible ground
    //ground
    gground=createSprite(0,365,2000,20)
    
}


function draw() {
  background("white");
  
  text("SCORE: "+score,230,29)
  
  if (gameState===PLAY){
      
      //score update
        score=score+Math.round(getFrameRate()/60);
    
      //monkey movement
        if(keyDown("space")&&monkey.y>=250){
        monkey.y=monkey.y-135;
        }
      
      //game to end
        if (monkey.isTouching(obstaclesGroup)){
        
        obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        
        obstaclesGroup.setVelocityXEach(-1);  
        foodGroup.setLifetimeEach(-1);
                          
        gameState=END;
        }
      
      //gravity
        monkey.velocityY = monkey.velocityY + 2.6;
        monkey.collide(ground);
    
      //spawning
        spawnObstacles();
        spawnBanana();
  
  }
   
  else if (gameState===END){
  
  }
  
 
  drawSprites();  
  
  monkey.debug=true;
}

function spawnBanana(){
  
    //draw banana
      if (frameCount%80===0){
        banana=createSprite(700,120,10,10);
        banana.addImage(bananaImage);
        banana.scale=0.09;
        banana.velocityX=-4;
        banana.y=Math.round(random(200,320))
        banana.lifetime=200;
        foodGroup.add(banana);
      }  
}

function spawnObstacles(){
      
      //creating obstacles
        if(frameCount%300===0){
            obstacles=createSprite(700,350,10,10);
            obstacles.addImage(obstaclesImage);
            obstacles.scale=0.09;
            obstacles.velocityX=-4;
            obstacles.lifetime=200;
            
            obstaclesGroup.add(obstacles);
        } 
}
