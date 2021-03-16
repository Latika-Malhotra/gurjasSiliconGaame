var game = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0

var gameOver, restart;

function preload() {
  game1Image = loadImage("images/quiz.png");
  game2Image = loadImage("images/running.png");
  trex_running = loadAnimation("images/trex1.png", "images/trex3.png", "images/trex4.png");
  trex_collided = loadAnimation("images/trex_collided.png");
  // // groundImage = loadImage("images/ground2.png");

  // //cloudImage = loadImage("images/cloud.png");

  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");

  // // gameOverImg = loadImage("images/gameOver.png");
   restartImg = loadImage("images/restart.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  game1 = createSprite(width / 2 - 400, height / 2, 200, 50);
  game1.addImage(game1Image);
  game1.scale = 0.5;
  console.log("check");
  
  game2 = createSprite(width / 2 + 400, height / 2, 200, 50);
  game2.addImage(game2Image);
  game2.scale = 0.5;
  console.log("check");



  trex = createSprite(150, height-200, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 1.5;

  ground = createSprite(width/2, height - 100, width, 20);
  // ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(width/2-100, height/2);
  // gameOver.addImage(gameOverImg);

  restart = createSprite(width/2, height/2+100);
  restart.addImage(restartImg);

  gameOver.scale = 1.5;
  restart.scale = 1.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(width/2, height - 100, width, 20);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  trex.visible=false;
  ground.visible= false;
}

function draw() {
  if (game === 0) {
    background(0);
  }
  if (game === 1) {
    background("red");
  }
  if (game === 2) {
    background("purple");
  }
  if (mousePressedOver(game1)) {
    game = 1;
    game1.visible = false;
    game2.visible = false;
  }
  if (mousePressedOver(game2)) {
    game = 2;
    
    trex.visible=true;
    ground.visible= true;
    game1.visible = false;
    game2.visible = false;
  }
  if (game === 1) {
    question = new Question();
    question.display()
    if (question.ans === "2") {
      //this.answer.html("You Win!")
      //this.position(390,300);
      console.log("match");
    }
  }
  if (game === 2) {
    
    text("Score: " + score, width-200, 100);

    if (gameState === PLAY) {
      score = score + Math.round(getFrameRate() / 60);
      ground.velocityX = -(6 + 3 * score / 100);

      if (keyDown("space") && trex.y >= 159) {
        trex.velocityY = -12;
      }

      trex.velocityY = trex.velocityY + 0.8

      //  camera.position.x = displayWidth / 2
      //  cameera.position.y = trex.y;


      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }

      trex.collide(invisibleGround);
      spawnClouds();
      spawnObstacles();

      if (obstaclesGroup.isTouching(trex)) {
        gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

      //set velcity of each game object to 0
      ground.velocityX = 0;
      trex.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);

      //change the trex animation
      trex.changeAnimation("collided", trex_collided);

      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);

      if (mousePressedOver(restart)) {
        reset();
      }
      drawSprites();
    }
    
  }
  drawSprites()
}
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running", trex_running);



  score = 0;

}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width, 120, 40, 10);
    cloud.y = Math.round(random(80, width/2));
    //cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(width, height-150, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}