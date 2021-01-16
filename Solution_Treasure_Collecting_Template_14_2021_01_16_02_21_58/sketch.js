//create Game Variables and Objects
var Play = 1;
var End = 0;
var Gamestate = Play;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  //load Images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");

}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("gameover",endImg);
boy.scale=0.08;
  
//create groups  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  //make background
  background(0);
  
  //make edge Sprites, so boy can't go out
  edges= createEdgeSprites();
  boy.collide(edges);
  //make gamestate
  if(Gamestate === Play){
    //code to reset the background
 
    //make infinite scrolling effect
    if(path.y > 400 ){
    path.y = height/2;
  }
    //make boy run side to side
    boy.x = World.mouseX;
    //create cash diamonds and Jwellery, and sword
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
    
    //If object touching Boy add certain amount, if touching sword end state
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 200;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        Gamestate = End;
        
    }
  }
  }
  else if(Gamestate === End){
    //set objects to get destroyed and make boy end animation;
    
    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    path.velocityY = 0;
    swordGroup.setVelocityYEach(0);
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    boy.changeAnimation("gameover",endImg);
    boy.scale = 1;
    boy.x = 200;
    boy.y = 200;
    
    
  }
  

  drawSprites();
  //create treasure score
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  //create cash images
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  //create Diamond Images
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  //create Jwellery Images
  if (World.frameCount % 180 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  //create Sword Images
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
