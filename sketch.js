//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup, fruitGroup2, enemyGroup, score,r,randomFruit,enemyGroup2;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,FruitCutSound,bombSound; 


function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  FruitCutSound = loadSound("swoosh1.mp3")
  bombSound = loadSound("bomb.wav")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup2=createGroup();
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  enemyGroup2=createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    Enemy2();
    fruits2();
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();       
      score=score+2;
      FruitCutSound.play();
     // score=score+2;
      
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        bombSound.play();
        fruitGroup.destroyEach();
        fruitGroup2.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        fruitGroup2.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        enemyGroup2.setVelocityXEach(0);
        enemyGroup2.destroyEach();
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.scale=1.5
        sword.x=300;
        sword.y=270;
      }
    }
     if(enemyGroup2.isTouching(sword)){
        gameState=END;
        bombSound.play();
        fruitGroup.destroyEach();
        fruitGroup2.destroyEach();
        enemyGroup2.destroyEach();
        fruitGroup.setVelocityXEach(0);
        fruitGroup2.setVelocityXEach(0);
        enemyGroup2.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        enemyGroup.destroyEach();
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.scale=1.5
        sword.x=300;
        sword.y=270;
      }
  }
  
  drawSprites();
if(fruitGroup2.isTouching(sword)){
      fruitGroup2.destroyEach(); 
      score=score+2;
      FruitCutSound.play();
    }
  //Display score
  textFont("Palatino")
  textSize(20)
  text("Score : "+ score,250,30);
}


function Enemy(){
  if(World.frameCount%240===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,600));
    monster.velocityX=-13;
    monster.setLifetime=50;    
    enemyGroup.add(monster);
  }
}
  
function Enemy2(){
  if(World.frameCount%319===0){
    monster=createSprite(0,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,600));
    monster.velocityX=13;
    monster.setLifetime=50;    
    enemyGroup2.add(monster);
  }
}

function fruits(){
  if(World.frameCount%93===0){
    fruit=createSprite(650,200,20,20);
    fruit.scale=0.2;
  //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-12;
    fruit.setLifetime=100;
    
    
    
    fruitGroup.add(fruit);
  }
}
function fruits2(){
   if(World.frameCount%134===0){
    fruit=createSprite(-10,400,20,20);
    fruit.scale=0.2;
  //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX= 12;
    fruit.setLifetime=100;
    fruitGroup2.add(fruit)
   }
}