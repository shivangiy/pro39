var score=0
var monkey,monkeyimage
var banana,bananaimage,bananagroup
var obstacle,obstacleimage,obstaclegroup
var jungle,jungleimage
var ground

function preload(){
  monkeyimage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  jungleimage=loadImage("jungle.jpg")
  
  bananaimage=loadImage("banana.png")
  
  obstacleimage=loadImage("stone.png")
}

function setup() {
  createCanvas(800, 400);
  
  jungle=createSprite(0,0,800,400);
  jungle.addImage(jungleimage)
  jungle.x=jungle.width/2
  jungle.velocityX=-4
  jungle.scale=2
  
  monkey=createSprite(70,350,20,20)
  monkey.addAnimation("running",monkeyimage)
  monkey.scale=0.1
  
  ground=createSprite(200,360,400,20)
  ground.visible=false
  
  bananagroup=new Group()
  obstaclegroup=new Group()
  
}

function draw() {
  background(250);
  monkey.x=camera.position.x-350
  if(jungle.x<camera.position.x-300){
    jungle.x=camera.position.x
  }
  
  if(keyDown("space")){
    monkey.velocityY=-10
  }
  
  monkey.velocityY=monkey.velocityY+0.5
  
  monkey.collide(ground)
  
  food()
  obstacles()
  
  if(bananagroup.isTouching(monkey)){
    bananagroup.destroyEach()
    score=score+2
  }
  switch(score){
    case 10:monkey.scale=0.12;
      break;
      
      case 20:monkey.scale=0.14;
      break; 
      
      case 30:monkey.scale=0.16;
      break;
                 
      case 40:monkey.scale=0.18;
      break;
      default:break
  }
  
  
  
  
  if(obstaclegroup.isTouching(monkey)){
    monkey.scale=0.08; 
  }
      
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, camera.position.x+100,camera.position.y-150);
  
}
function food(){
  if(frameCount%80===0){
 
    
    
    banana=createSprite(camera.position.x+400,Math.round(random(120,200)),10,10)
    banana.addImage(bananaimage);
    banana.velocityX=-4
    banana.lifetime=200
    banana.scale=0.04
    bananagroup.add(banana)
  }
}
function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(camera.position.x+400,camera.position.y+120,10,10)
    obstacle.addImage(obstacleimage);
    obstacle.velocityX=-3
    obstacle.lifetime=270
    obstacle.scale=0.15
    obstaclegroup.add(obstacle)
  }
}