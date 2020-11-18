var player,player_image,playerbig_gun_image;

var aiGroup,aiImg,aiImg2,aiGroup1,aiGroup2;

var back_image,back_Image;

var life,GunshotGroup,gun_shot_image,big;

var sound_zom,sound_gunshot;

var score;

var shot,shoot,shootImg,circle;

var PLAY = 1,END = 0;

var gameState = PLAY;

var changeGun,changeGunImg;

var invisible_side,invisible_side1,gameOver_image,gameOver,restart_image,restart;

var hp = 1000;

function preload(){

  getBackgroundImg();
  
     player_image = loadImage("short gun.png");

     playerbig_gun_image = loadImage("bigGun.png");

     aiImg  =loadImage("zom11.png");

     aiImg2 = loadImage("zom22.png");

    // back_image = loadImage("road.png");

     gun_shot_image = loadImage("shotgun.png");
      
     gameOver_image = loadImage("gameOver.png");
    
     intro_image = loadImage("intro.png");

     restart_image = loadImage("restart.png");

     changeGunImg = loadImage("change.png");

     big = loadImage("bigshot.png");

     shootImg = loadImage("shoot.png");
       
}








function setup(){
  createCanvas(displayWidth, displayHeight);
  
  player = createSprite(displayWidth/2,displayHeight/2,20,20);
  player.addImage("gun-Copy", player_image);
  player.addImage("big gun", playerbig_gun_image);
  player.scale = 0.3;
  player.visible = false;
  
 
  
  invisible_side = createSprite(displayWidth/2-200,displayHeight/2,50,600);
  invisible_side.visible = false;
  
  invisible_side1 = createSprite(displayWidth/2+200,displayHeight/2,50,6000);
  invisible_side1.visible = false;
  
  score = 0;

  gameOver = createSprite(300,285,20,20);
  gameOver.addImage(gameOver_image);
  gameOver.visible = false;
  
  restart = createSprite(300,500,20,20);
  restart.addImage(restart_image);
  restart.scale = 0.3;
  restart.visible = false;
  

  changeGun = createSprite(displayWidth/2-200,displayHeight/2+100,50,50);
  changeGun.addImage(changeGunImg);
  changeGun.scale = 0.5;

 

 
  
  intro = createSprite(displayWidth,displayHeight,20,20);
  intro.addImage("intro",intro_image);
  intro.scale = 0.5;
  intro.visible = true;
  intro.lifetime = 100;

  GunshotGroup = new Group();
  aiGroup = new Group();
  aiGroup1 = new Group();
  aiGroup2 = new Group();
  
  aiGroup.visible =false;
  aiGroup1.visible = false;
  aiGroup2.visible = false;
  
}

function draw() {
  
   if(back_Image){
    background(back_Image);
  }

  circle(displayWidth/2+250,displayHeight/2+25,100,100);
  
  if(keyDown("space")){
    gameState = PLAY;
    intro.visible = false;
  }

  if(gameState === PLAY){
      
    
     player.visible = true;
     aiGroup.visible =true;
     aiGroup1.visible = true;
     aiGroup2.visible = true;
     player.velocityX = 0;
  
  if(GunshotGroup.collide(aiGroup)){
    GunshotGroup.destroyEach();
    aiGroup.destroyEach();
    score = score+ 1;
  }
  
  
  if(GunshotGroup.collide(aiGroup1)){
    
    GunshotGroup.destroyEach();
    aiGroup1.destroyEach();
    score = score+1;
  }

  
  if(GunshotGroup.collide(aiGroup2)){
    
    GunshotGroup.destroyEach();
    aiGroup2.destroyEach();
    score = score+1;
  }
    
  
  //key_right
  if(keyDown("right")){
    player.x = player.x+5;
    
  }
 
  //key_left
   if(keyDown("left")){
    player.x = player.x-5;
    
  }
  

  //change anima when key c pressed
  if(keyDown("c")|| mousePressedOver(changeGun)){
    player.changeImage("big gun", playerbig_gun_image);
    player.scale= 0.4;

   // shot.changeImage(big);
   
  }


  if(keyDown("r")){
    player.changeImage("gun-Copy", player_image);
    player.scale = 0.3;
    
  }
  
 
  if(hp<=0){
    gameState = END;
  }
  
  
 if(aiGroup.collide(player)||aiGroup1.collide(player)||aiGroup2.collide(player)){
  
 
  hp = hp-100;

  aiGroup.destroyEach();
  aiGroup1.destroyEach();
  aiGroup2.destroyEach();
  
  }
  //collide player with side road
  player.collide(invisible_side);
  player.collide(invisible_side1);
  
  
  spawnGunshot();
  spawnZom1();
  spawnZom2();
  } 
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    aiGroup.setVelocityXEach(0);
    aiGroup1.setVelocityXEach(0);
    aiGroup2.setVelocityXEach(0);
    
    
    //change the trex animation
    
    player.visible =false;
    //set lifetime of the game objects so that they are never destroyed
    aiGroup.setVelocityXEach(-1);
    aiGroup1.setVelocityXEach(-1);
    aiGroup2.setVelocityXEach(-1);
    
     aiGroup.visible = false;
     aiGroup2.visible = false;
    
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  shoot = createSprite(displayWidth/2+250,displayHeight/2+25,50,50);
  shoot.addImage(shootImg);
  shoot.scale = 0.1;
  
drawSprites();
 


stroke("black")
//fill("white")



  
  
   textSize(34);
  fill("green");
  text("speed: "+score,16,30);
  text("HEALTH = " + hp,200,200);
  
  
 
}
//gunshot
function spawnGunshot(){
  
  if(keyDown("up_arrow")||mousePressedOver(shoot)){
    
    shot=createSprite(player.x+10,player.y-35,10,10);
    shot.addImage(gun_shot_image);
    shot.scale = 0.05;
    shot.velocityY=-(6 + 3*score/100);
    shot.lifetime=150;
    GunshotGroup.add(shot);
  }
}





//zom_1
 function spawnZom1(){
   if(frameCount %80==0){
    
   var zom = createSprite(displayWidth/2,displayHeight/2-500,20,30);
   zom.x = Math.round(random(600,800));
   zom.addImage(aiImg);
   zom.scale = 0.2;
   zom.velocityY = (6 + 3*score/100);
   zom.lifetime = 160;
  
   aiGroup.add(zom);
  
 }
 }
function spawnZom2(){
  if(frameCount%80==0){
    
   var zom1 = createSprite(displayWidth/2,displayHeight/2-500,20,30);
   zom1.x = Math.round(random(600,800));
   zom1.addImage(aiImg2);
  zom1.scale = 0.2;
   zom1.velocityY = (6 + 3*score/100);
   zom1.lifetime = 160;
  
   aiGroup1.add(zom1);
  
 }
  if(score >=25 && frameCount%90==0){
   
 
    
   var zom1 = createSprite(400,0,20,30);
   zom1.x = Math.round(random(600,800));
   zom1.addImage(aiImg2);
   zom1.scale = 0.2;
   zom1.velocityY = 10;
   zom1.lifetime = 160;
  
   aiGroup.add(zom1);
  
 }
  }



 function reset(){

   gameState = PLAY;
   gameOver.visible = false;
   restart.visible = false;
  
   aiGroup.destroyEach();
   aiGroup1.destroyEach();
   aiGroup2.destroyEach();
   
   player.visible = true;
  
  
   score = 0;
  
 }

  async function getBackgroundImg(){
   var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
   var responseJSON = await response.json();

   var datetime = responseJSON.datetime;
   var hour = datetime.slice(11,13);
  
   if(hour>=6 && hour<=19){
       back_image = "road.png";
   }
   else{
       back_image = "nightRoad.png";
   }

   back_Image = loadImage(back_image);

 }
