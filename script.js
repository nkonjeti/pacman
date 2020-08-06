/* global createCanvas, background, createSprite, width, height, mouseX, color, mouseY,
drawSprites, colorMode, HSB, keyCode, top_border, left_border, right_border, bottom_border, score,
lives, foodimg, loadImage, Group, fill, text, RIGHT_ARROW, LEFT_ARROW, DOWN_ARROW, UP_ARROW, frameRate, textFont, loadFont, 
textSize, key, loadSound, levelCounter

*/

let spr1, pacman, level1, x, y, w, h, create, fr, border_lines, border, obstacles, backgroundColor, pacmanIMG,
    ghost_pinkIMG,ghost_pink,cur, environmentArr, env, foods, food, curPINK, curRED, ghost_redIMG, ghost_red,
    ghost_orangeIMG, ghost_orange, curORANGE, ghost_blueIMG, ghost_blue, curBLUE, stage, pacman_logoIMG, pacman_logo, pacFont,
    pacSmallFont, start, ghost_array, level2, empty_array;

let lives = 3;
let levelCounter = 1
//score is -10 because pacman is already on a fooditem at the start of the game so score changes to 0
let score = -10
function setup() {
  // fr = 300;
  
  //createCanvas(1200, 700);
  let cnv = createCanvas(1200,700)
  cnv.position(130, 0, 'fixed');
  colorMode(HSB, 360, 100, 100);
  
  
  pacman = createSprite(width/2, 500);
  pacman.rotateToDirection = true;
  //pacman.addImage(pacmanIMG);
  pacman.addAnimation('eating', pacmanIMG, pacmanclose)
  
  // pacman.setSpeed(4);
  start = false;
  // rectMode(CENTER);
  
  //creates ghosts 
  
  ghost_pink = createSprite(682, height/2);
  ghost_pink.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_pink.addImage(ghost_pinkIMG);
  curPINK = 0;
  
  
  
  
  
  
  ghost_red = createSprite(520, height/2);
  ghost_red.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_red.addImage(ghost_redIMG);
  curRED = 0;
  
  
  
  
  ghost_orange = createSprite(630, height/2);
  ghost_orange.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_orange.addImage(ghost_orangeIMG);
  curORANGE = 0;
  
  // ghost_pink.velocity.y = 4;
  
 
  
  ghost_blue = createSprite(575, height/2);
  ghost_blue.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_blue.addImage(ghost_blueIMG);
  curBLUE = 0;
  
  
    blueGhostIMG.resize(50,50);
    BLUEghost_red = createSprite(ghost_red.position.x, ghost_red.position.y);
    BLUEghost_red.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_red.addImage(blueGhostIMG);
    BLUEcurRED = 0;




    BLUEghost_orange = createSprite(ghost_orange.position.x, ghost_orange.position.y);
    BLUEghost_orange.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_orange.addImage(blueGhostIMG);
    BLUEcurORANGE = 0;

    // ghost_pink.velocity.y = 4;

    BLUEghost_blue = createSprite(ghost_blue.position.x, ghost_blue.position.y);
    BLUEghost_blue.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_blue.addImage(blueGhostIMG);
    BLUEcurBLUE = 0;
    
    BLUEghost_pink = createSprite(ghost_pink.position.x, ghost_pink.position.y);
    BLUEghost_pink.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_pink.addImage(blueGhostIMG);
    BLUEcurPINK = 0;
  
  
  // ghost_blue.delay(10);
  // pacman_logo = createSprite(width/2, height/2);
  // pacman_logo.addImage(pacman_logoIMG);
  
  //borders group created so food isn't on borders
  backgroundColor = 0;
  colorMode(HSB, 360, 100, 100);
  
  
  //this is how we can do the loading, game, and win pages!!!
  stage = 0;
  //load food image
  //text('word', 100, 300);
  
 
  
  //environmentArr = [];
  //environment
  //environment group created so food isn't on obstacles
  
  if (levelCounter == 1 ){
    env = new Group()
    environmentArr = [];
    for (let i = 0; i < level1.length; i++) {
      level1[i].y += 50;
      obstacles = createSprite(level1[i].x, level1[i].y, level1[i].w, level1[i].h);
      obstacles.shapeColor = color(217, 200, 53);
      environmentArr.push(obstacles);
      env.add(obstacles)

  }
  }
  // border array -> creates sprite borders
  
//   for (let i = 0; i < border.length; i++) {
//     border_lines = createSprite(border[i].x, border[i].y, border[i].w, border[i].h);
//     border_lines.shapeColor = color(200, 100, 100);
//   }
  

  
  
  //updated food code that makes a food group and displays the food (once) in the setup so there is no buffer
  
  foods = []
  //foodgroup created so food can be looped through to check if pacman has collided with it 
  foodgroup = new Group()
  let xfive = 5 * (width/12)
  let xsix = 6 * (width/12)
  let xseven = 7 * (width/12)
  let yfour = 5 * (height/10)
  let yfive = 6 * (height/10)
  //loop to create food 12 by 10 
   for(let i = width/12; i< width; i+= width/12){
    
    for(let j = height/10; j < height; j += height/10) {
      if(!(i == xfive && j === yfour || i == xfive && j == yfive || i == xsix && j == yfour || i == xsix && j == yfive || i == xseven && j == yfour || i == xseven && j == yfive)){
        food = new Food(i, j)
        foods.push(food)
       }
   }
    
   }
  //shows food by creating food sprites
  for(let i = 0; i < foods.length; i++){
     foods[i].show()
  }
  
  //creates cherry sprite at random location where already a food sprite is created(so then it won't show on top of any border)
  cherrygroup = new Group()
  let number = round(random(foodgroup.length))
  cherry = createSprite(foodgroup[number].position.x, foodgroup[number].position.y, 10,10)
  cherryimg.resize(50,50)
  cherry.addImage(cherryimg)
  cherrygroup.add(cherry)
 
 
  if (stage == 0) {
    introMusic.play();
  }
  flashydots = new Group()
  flash_dotLEFTTOP = createSprite(100,150);
  //flash_dotLEFTTOP.addImage(flash_dotIMG);
  flash_dotLEFTTOP.addAnimation('flashing',flashing)
  flashydots.add(flash_dotLEFTTOP)
  
  flash_dotLEFTBOTTOM = createSprite(100,height-75);
  //flash_dotLEFTBOTTOM.addImage(flash_dotIMG);
   flash_dotLEFTBOTTOM.addAnimation('flashing',flashing)
  flashydots.add(flash_dotLEFTBOTTOM)
  
  flash_dotRIGHTTOP = createSprite(width - 100,150);
  //flash_dotRIGHTTOP.addImage(flash_dotIMG);
  flash_dotRIGHTTOP.addAnimation('flashing',flashing)
  flashydots.add(flash_dotRIGHTTOP)
  
  
  flash_dotRIGHTBOTTOM = createSprite(width - 100,height-75);
 // flash_dotRIGHTBOTTOM.addImage(flash_dotIMG);
  flash_dotRIGHTBOTTOM.addAnimation('flashing',flashing)
  flashydots.add(flash_dotRIGHTBOTTOM)
  
  turnBlueBool = false;
  i = 0;
}

function draw() {
  if (stage == 0) {
    load();
  }
  if (stage == 1) {
    game();
  }
  if (stage == 2) {
    lose();
  }
  if(stage == 3){
    win()
    levelCounter++;
    return levelCounter;
  }
  if (stage == 4) {
    //console.log(stage)
    levelCounter = 2;
    setup();
    console.log(levelCounter)
    
    stage = 1;
    //game();
  }
  
  

//   text('lives: ' + lives, 40, 100)
  
//   //so score doesn't show up as -10 at the beginning of the game
//   if(score == -10){
//      text('score: ' + (score+ 10), 40,120)
//   }
//   //the score is updated later in the game
//  else {
//     text('score: ' + score, 40,120)
//  }
  
}

function deleteSprites() {
  pacman.remove();
  ghost_pink.remove();
  ghost_red.remove();
  ghost_blue.remove();
  ghost_orange.remove();
  console.clear()
}


function load() {
  background(backgroundColor);
  textSize(100);
  textFont(pacFont);
  fill(20, 100, 100)
  rect(342, 95, 520, 120, 20);
  stroke(0);
  strokeWeight(5);
  fill(38,100,100)
  rect(352, 105, 500, 100, 20);
  fill(46,0,100);
  text("pacman", 365,  195);
  fill(259,100,40);
  text("pacman", 375,  205);
  fill(56,100,100);
  text("pacman", 370,  200);
  
  image(pacGif, 360, 265);
  // gif_createImg.position(50, 350);
  
  textFont(pacSmallFont);
  textSize(50);
  text("PRESS SPACE!", 440,  300);
  textSize(20);
  text("PROGRAMMED BY NEROSO", 480,  550);
}

function lose() {
  background(backgroundColor);
  textSize(100);
  textFont(pacFont);
  fill(20, 100, 100)
  rect(342, 95, 520, 120, 20);
  stroke(0);
  strokeWeight(5);
  fill(38,100,100)
  rect(352, 105, 500, 100, 20);
  fill(46,0,100);
  text("pacman", 365,  195);
  fill(259,100,40);
  text("pacman", 375,  205);
  fill(56,100,100);
  text("pacman", 370,  200);
  
  image(pacGif, 360, 265);
  // gif_createImg.position(50, 350);
  
  textFont(pacSmallFont);
  textSize(50);
  text("YOU LOST!", 460,  300);
  textSize(30);
  text("Press SPACE to play again.", 385,  550);
  // if (keyCode == "x") {
  //   stage = 0;
  //   new Game();
    // lives === 3;
    // stage==0;
    // setup();
    // game();
    
  }




function game() {
  console.log(i);
  
  
  if (turnBlueBool) {
    i++;
    if (i < 800) {
      turnBlue();
      
    } else {
      turnBlueBool = false;
      i = 0;
    }
  }
  if (turnBlueBool == false) {
    ghost_pink.visible = true;
    ghost_red.visible = true;
    ghost_orange.visible = true;
    ghost_blue.visible = true;
  }
  // 
  frameRate(60);
  background(backgroundColor);
  //console.log(frameRate());
  
  fill(56,100,100);
  textFont(pacSmallFont);
  textSize(50);
  
  text(`SCORE: ${score}`, 20, 40);
  text(`LIVES: ${lives}`, 600, 40);
  pacmanIMG.resize(50, 50);
  pacmanclose.resize(50,50)
  ghost_pinkIMG.resize(50,50);
  ghost_redIMG.resize(55,55);
  ghost_orangeIMG.resize(50,50);
  ghost_blueIMG.resize(50,50);
  flash_dotIMG.resize(50,50);
  flash.resize(40,40)
  // pacman.shapeColor = color(200, 100, 100);
  
  if (turnBlueBool == false) {
    BLUEghost_pink.visible = false;
    BLUEghost_red.visible = false;
    BLUEghost_orange.visible = false;
    BLUEghost_blue.visible = false;
    // blueGhostIMG.resize(50,50);
  }
  
  if (start){
    ghost_pink.setSpeed(3, curPINK);
    ghost_red.setSpeed(3, curRED);
    ghost_orange.setSpeed(3, curORANGE);
    ghost_blue.setSpeed(3, curBLUE);
    
    BLUEghost_pink.setSpeed(3, BLUEcurPINK);
    BLUEghost_red.setSpeed(3, BLUEcurRED);
    BLUEghost_orange.setSpeed(3, BLUEcurORANGE);
    BLUEghost_blue.setSpeed(3, BLUEcurBLUE);
  }
  
  fill('white');
  // text('x coord is ' + mouseX, 40, 50);
  // text('y coord is ' + mouseY, 40, 70);
  //text(`Score: ${score}`, 40,120)
    
  
  for (let i = 0; i < environmentArr.length; i++) {
    pacman.collide(environmentArr[i]);
  }
  
    for (let i = 0; i < environmentArr.length; i++) {

      //to the left of wall
      if(ghost_pink.collide(environmentArr[i]) ) {
        x = Math.floor(Math.random() * 10);
        if (x < 5){
          curPINK-=90;
          BLUEcurPINK-=90;
        } else {
          curPINK+=90
          BLUEcurPINK+=90;
        }
        
        ghost_pink.setSpeed(3, curPINK);
        BLUEghost_pink.setSpeed(3, BLUEcurPINK);
        // ghost_pink.rotation += PI/2
      }
      ghost_pink.collide(environmentArr[i])
      BLUEghost_pink.collide(environmentArr[i])
      
      if(ghost_red.collide(environmentArr[i]) ) {
        x = Math.floor(Math.random() * 10);
        if (x < 5){
          curRED+=90;
          BLUEcurRED+=90;
        } else {
          curRED-=90
          BLUEcurRED-=90
        }
        
        ghost_red.setSpeed(3, curRED);
        ghost_red.setSpeed(3, BLUEcurRED);
        // ghost_pink.rotation += PI/2
      }
      ghost_red.collide(environmentArr[i])
      BLUEghost_red.collide(environmentArr[i])
      
      if(ghost_orange.collide(environmentArr[i]) ) {
        x = Math.floor(Math.random() * 10);
        if (x < 5){
          curORANGE+=90;
          BLUEcurORANGE+=90;
        } else {
          curORANGE-=90;
          BLUEcurORANGE-=90;
        }
        
        ghost_orange.setSpeed(3, curORANGE);
        ghost_orange.setSpeed(3, BLUEcurORANGE);
        // ghost_pink.rotation += PI/2
      }
      ghost_orange.collide(environmentArr[i])
      BLUEghost_orange.collide(environmentArr[i])
      
      if(ghost_blue.collide(environmentArr[i]) ) {
        x = Math.floor(Math.random() * 10);
        if (x < 5){
          curBLUE-=90;
          BLUEcurBLUE-=90;
        } else {
          curBLUE+=90
          BLUEcurBLUE+=90
        }
        
        ghost_blue.setSpeed(3, curBLUE);
        ghost_blue.setSpeed(3, BLUEcurBLUE);
        // ghost_pink.rotation += PI/2
      }
      ghost_blue.collide(environmentArr[i])
      BLUEghost_blue.collide(environmentArr[i])
      
      


    }
  

//   for (let i = 0; i < ghost_array.length; i++) {
//      pacman.collide(ghost_array[i], loseLife);

//   }

  
  if (turnBlueBool == false) {
    pacman.collide(ghost_red, loseLife);
    pacman.collide(ghost_orange, loseLife);
    pacman.collide(ghost_pink, loseLife);
    pacman.collide(ghost_blue, loseLife);
  } else {
    if (pacman.collide(ghost_red)) {
        score+= 200;
        ghost_red.position.x = 520
        ghost_red.position.y = height/2
        BLUEghost_red.position.x = 520
        BLUEghost_red.position.y = height/2
    }
    if (pacman.collide(ghost_orange)) {
        score+= 200;
        ghost_orange.position.x = 630
        ghost_orange.position.y = height/2
        BLUEghost_orange.position.x = 630
        BLUEghost_orange.position.y = height/2
    }
    if (pacman.collide(ghost_pink)) {
        score+= 200;
        ghost_pink.position.x = 682
        ghost_pink.position.y = height/2
        BLUEghost_pink.position.x = 682
        BLUEghost_pink.position.y = height/2
    }
    if (pacman.collide(ghost_blue)) {
        score+= 200;
        ghost_blue.position.x = 575
        ghost_blue.position.y = height/2
        BLUEghost_blue.position.x = 575
        BLUEghost_blue.position.y = height/2
    }
  }
  
  
  /*hit1 = pacman.collide(flash_dotLEFTTOP)
  if (hit1) {
    flash_dotLEFTTOP.remove()
    
    turnBlueBool = true;
  }
  
  hit2 = pacman.collide(flash_dotLEFTBOTTOM)
  if (hit2) {
    flash_dotLEFTBOTTOM.remove()
    
    turnBlueBool = true;
  }
  hit3 = pacman.collide(flash_dotRIGHTTOP)
  if (hit3) {
    flash_dotRIGHTTOP.remove()
    
    turnBlueBool = true;
  }
  hit4 = pacman.collide(flash_dotRIGHTBOTTOM)
  if (hit4) {
    flash_dotRIGHTBOTTOM.remove()
    turnBlueBool = true;
  } */

//   rect(level1[0].x, level1[0].y, level1[0].w, level1[0].h)
// ]
  //calls function for pacman to eat food
  eatFood()
  //calls function for pacman to eat cherry
  eatCherry()
  //calls function to check if food is still there
  checkFood()
  flashydotcollision()
  drawSprites();
}

function turnBlue() {
  BLUEghost_pink.visible = true;
  BLUEghost_red.visible = true;
  BLUEghost_orange.visible = true;
  BLUEghost_blue.visible = true;
  
  ghost_pink.visible = false;
  ghost_red.visible = false;
  ghost_orange.visible = false;
  ghost_blue.visible = false;
}

function charLocations() {
  
  pacman.remove();
  ghost_pink.remove();
  ghost_red.remove();
  ghost_blue.remove();
  ghost_orange.remove();
  
  
  pacman = createSprite(width/2, 500);
  pacman.rotateToDirection = true;
  //pacman.addImage(pacmanIMG);
  pacman.addAnimation('eating', pacmanIMG, pacmanclose)
  
  // pacman.setSpeed(4);
  start = false;
  // rectMode(CENTER);
  
  //creates ghosts 
  
  ghost_pink = createSprite(682, height/2);
  ghost_pink.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_pink.addImage(ghost_pinkIMG);
  curPINK = 0;
  
  
  
  ghost_red = createSprite(520, height/2);
  ghost_red.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_red.addImage(ghost_redIMG);
  curRED = 0;
  
  
  
  ghost_orange = createSprite(630, height/2);
  ghost_orange.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_orange.addImage(ghost_orangeIMG);
  curORANGE = 0;
  
  // ghost_pink.velocity.y = 4;
  
 
  
  ghost_blue = createSprite(575, height/2);
  ghost_blue.rotateToDirection = true;
  // pacman.shapeColor = color(200, 100, 100);
  ghost_blue.addImage(ghost_blueIMG);
  curBLUE = 0;
  
  blueGhostIMG.resize(50,50);
    BLUEghost_red = createSprite(ghost_red.position.x, ghost_red.position.y);
    BLUEghost_red.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_red.addImage(blueGhostIMG);
    BLUEcurRED = 0;




    BLUEghost_orange = createSprite(ghost_orange.position.x, ghost_orange.position.y);
    BLUEghost_orange.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_orange.addImage(blueGhostIMG);
    BLUEcurORANGE = 0;

    // ghost_pink.velocity.y = 4;

    BLUEghost_blue = createSprite(ghost_blue.position.x, ghost_blue.position.y);
    BLUEghost_blue.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_blue.addImage(blueGhostIMG);
    BLUEcurBLUE = 0;
    
    BLUEghost_pink = createSprite(ghost_pink.position.x, ghost_pink.position.y);
    BLUEghost_pink.rotateToDirection = true;
    // pacman.shapeColor = color(200, 100, 100);
    BLUEghost_pink.addImage(blueGhostIMG);
    BLUEcurPINK = 0;
  
    ghost_pink.visible = true;
    ghost_red.visible = true;
    ghost_orange.visible = true;
    ghost_blue.visible = true;
  
    BLUEghost_pink.visible = false;
    BLUEghost_red.visible = false;
    BLUEghost_orange.visible = false;
    BLUEghost_blue.visible = false;
}


function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    pacman.setSpeed(4, 0);
    start = true;
  }
  else if (keyCode == DOWN_ARROW) {
    pacman.setSpeed(4, 90);
    start = true;
  }
  else if (keyCode == LEFT_ARROW) {
    pacman.setSpeed(4, 180);
    start = true;
  }
  else if (keyCode == UP_ARROW) {
    pacman.setSpeed(4, 270);
    start = true;
  } else if (key == " ") {
    stage = 1;
  } else if (key == "x" || key == "X") {
    
      for (let i = 0; i < level2.length; i++) {
      
        level2[i].y += 50;
        obstacles = createSprite(level2[i].x, level2[i].y, level2[i].w, level2[i].h);
        obstacles.shapeColor = color(217, 200, 53);
        environmentArr.push(obstacles);
        env.add(obstacles)
    }
    
    stage = 4;
  }
  
}

function charDelete() {
  pacman.remove();
  ghost_pink.remove();
  ghost_red.remove();
  ghost_blue.remove();
  ghost_orange.remove();
  ghost_blue.remove();
  BLUEghost_red.remove();
  BLUEghost_orange.remove();
  BLUEghost_blue.remove();
  emptyobstacles();
}
//food class that creates food sprites where there are no rectangle boundaries

class Food {
   constructor(x,y){
     this.x = x;
     this.y = y;
    this.size = 5;
     
  }
  show(){
   
      let fooditem = createSprite(this.x, this.y, this.size,this.size);
       
       
        foodimg.resize(20,20)
       fooditem.addImage(foodimg)
       foodgroup.add(fooditem)
    
    
     
     if(fooditem.collide(env)){
        fooditem.remove()
     }
   }
  
  
 }

function eatFood(){
  for (x of foodgroup){
    let hit = pacman.collide(x)
    if(hit){
      score += 10
      x.remove()
      if (chomp.isPlaying() == false) {
        chomp.play();
      }
    }
  }
}

function reset() {
  lives = 3;
  stage = 0;
  // charLocations();
  env = new Group()
  environmentArr = [];
  
}



//loading images
function preload() {
  pacmanIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacman-image.png?v=1595718410897");
  ghost_pinkIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2F2469744-pinky.png?v=1595726676149");
  ghost_redIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacman-ghost-pink.png?v=1595719677726");
  ghost_orangeIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Forange_ghost.png?v=1595726957023");
  ghost_blueIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Finky_ghost.png?v=1595728018267");
  pacman_logoIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacman_logo.png?v=1595728484621");
  pacFont = loadFont("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2FPacFont%20Good.ttf?v=1595731122998");
  pacSmallFont = loadFont("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2FConnectionIi-2wj8.otf?v=1595731790670");
  
  pacGif = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacmangif.gif?v=1595732382130");
  // gif_createImg = createImg("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacman_gif.gif?v=1595732189463");
   pacmanclose = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacmanclosedmouth.png?v=1595996419100")
    foodimg = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Ffood.png?v=1595719511603")
  
   cherryimg = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fbrowncherry.png?v=1595820702629")
  
  //sound
  introMusic = loadSound("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacman_beginning.wav?v=1595878151728");
  chomp = loadSound("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2FChomp.mp3?v=1595879016687");
  deathSound = loadSound("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fpacman_death.wav?v=1595879380656");
  
  flash_dotIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2FMJJ0cY-circle-amazing-image-download.png?v=1596049546313");
  blueGhostIMG = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2Fbright_blue_ghost.png?v=1596049562047");
  flash = loadImage("https://cdn.glitch.com/12d72845-5581-4253-bd51-92a704b0dd8e%2FMJJ0cY-circle-amazing-image-download.png?v=1596049546313")
  flashing = loadAnimation(flash_dotIMG, flash)
}

// block level code
level2 = [
    //left side
    {x: 0, y:200, w:250, h:50},
    {x: 0, y:450, w:250, h:50},
    {x: 300, y:325, w:50, h:450},
    {x: 260, y:325, w:275, h:50},
    //ghost box
    // {x: 515, y:255, w:80, h:10},
    // {x: 685, y:255, w:80, h:10},
    {x: 600, y:400, w:250, h:10},
    {x: 480, y:325, w:10, h:140},
    {x: 720, y:325, w:10, h:140},
    //middle
    {x: 600, y:125, w:400, h:50},
    {x: 600, y:515, w:400, h:50},
    //right
    {x: 1200, y:200, w:250, h:50},
    {x: 1200, y:450, w:250, h:50},
    {x: 900, y:325, w:50, h:450},
    {x: 940, y:325, w:275, h:50},
    //border
    {x:600, y:15, w:1200, h:30},
    {x:15, y:325, w:30, h:650},
    {x:1185, y:325, w:30, h:650},
    {x:600, y:635, w:1200, h:30}
  ]

empty_array = [
  {x:0, y:0, w: 0, h:0}
]

// g logo code
level1 = [
    // border
    {x:600, y:15, w:1200, h:30},
    {x:15, y:325, w:30, h:650},
    {x:1185, y:325, w:30, h:650},
    {x:600, y:635, w:1200, h:30},
    // ghost box
    {x: 600, y:400, w:250, h:10},
    {x: 480, y:325, w:10, h:140},
    {x: 720, y:325, w:10, h:140},
  
    // left side
    {x:250, y:150, w:230, h:50},
    {x:150, y:322, w:50, h:395},
    {x:260, y:495, w:200, h:50},
    {x:335, y:425, w:50, h:130},
    {x:300, y:375, w:120, h:50},
  
    // right side
    {x:960, y:495, w:230, h:50},
    {x:1050, y:322, w:50, h:395},
    {x:950, y:150, w:200, h:50},
    {x:865, y:435, w:50, h:170},
    {x:900, y:375, w:120, h:50},
  
    // middle side
    {x:600, y:155, w:200, h:50},
    {x:600, y:500, w:200, h:50}
  
  ]

//function to remove food when pacman collides with it


//function to change cherry position after pacman eats cherry
function eatCherry(){
  for(x of cherrygroup){
    let collide = pacman.collide(x)
    if(collide){
      console.log('hit')
      score = score + 100
      let number = round(random(foodgroup.length))
      if(foodgroup.length > 10 && foodgroup[number] != undefined){
      cherry.position.x = foodgroup[number].position.x
      cherry.position.y = foodgroup[number].position.y
      }
      else {
        cherry.remove()
      }
      
    }
  }
}

//reduces lives when pacman hits a ghost

function loseLife() {
  lives--;
  //pacman.position(width/2, 500);
  if (lives > 0) {
    charLocations();
    deathSound.play();
    
  } else {
    text('YOU LOSE', 50, 50)
    lives = 3;
    score = -10;
    //eventually move to level 2
    stage = 2;
    //charLocations();
    //stage = 0;
    charLocations();
    restartFood();
    resetFlash();
    
  }
  
}

function deleteFood(){
  for (x of foodgroup){
    x.remove()
    
  }
  for(x of cherrygroup){
    x.remove()
    
  }
}


function restartFood(){
  for (x of foodgroup){
    x.remove()
    
  }
  for(x of cherrygroup){
    x.remove()
    
  }
  
  foods = []
   let xfive = 5 * (width/12)
  let xsix = 6 * (width/12)
  let xseven = 7 * (width/12)
  let yfour = 5 * (height/10)
  let yfive = 6 * (height/10)
  //foodgroup created so food can be looped through to check if pacman has collided with it 
  //foodgroup = new Group()
  
  //loop to create food 12 by 10 
   for(let i = width/12; i< width; i+= width/12){
    
    for(let j = height/10; j < height; j += height/10) {
        if(!(i == xfive && j === yfour || i == xfive && j == yfive || i == xsix && j == yfour || i == xsix && j == yfive || i == xseven && j == yfour || i == xseven && j == yfive)){
     
      food = new Food(i, j)
      foods.push(food)
        }
   }
    
   }
  //shows food by creating food sprites
  for(let i = 0; i < foods.length; i++){
     foods[i].show()
  }
  
  //creates cherry sprite at random location where already a food sprite is created(so then it won't show on top of any border)
  //cherrygroup = new Group()
  let number = round(random(foodgroup.length))
  cherry = createSprite(foodgroup[number].position.x, foodgroup[number].position.y, 10,10)
  cherryimg.resize(50,50)
  cherry.addImage(cherryimg)
  cherrygroup.add(cherry)
 
}
//keeps checking to see if food is gone
function checkFood(){
  if(foodgroup.length == 0){
    
   
    //eventually move to level 2
    stage = 3;
    
  }
}
//if all food is gone win screen is shown
function win(){
  background(backgroundColor);
  textSize(100);
  textFont(pacFont);
  fill(20, 100, 100)
  rect(342, 95, 520, 120, 20);
  stroke(0);
  strokeWeight(5);
  fill(38,100,100)
  rect(352, 105, 500, 100, 20);
  fill(46,0,100);
  text("pacman", 365,  195);
  fill(259,100,40);
  text("pacman", 375,  205);
  fill(56,100,100);
  text("pacman", 370,  200);
  
  image(pacGif, 360, 265);
  // gif_createImg.position(50, 350);
  
  textFont(pacSmallFont);
  textSize(50);
  text("YOU WIN!", 460,  300);
  
  textSize(20);
  text(`Score: ${score}`,100,100);
  text("Press x to go to the next level", 400,  550);
 
    //stage = 0;
    //new Game();
    // lives === 3;
    // stage==0;
    // setup();
    // game();
    
//     charLocations();
//     stage = 4;
//     levelCounter++;
    
  charDelete();
  emptyobstacles();
  deleteFood();
  

  
}

function flashydotcollision(){
  for(x of flashydots){
    hit = pacman.collide(x)
    if(hit){
      x.remove()
      turnBlueBool = true;
    }
  }
}

function emptyobstacles(){
  console.log('empty')
  for(x of env){
    x.remove()
  }
  environmentArr = []
 
  
  }

function resetFlash(){
  for(x of flashydots){
    x.remove()
}
   flashydots = new Group()
  
  flash_dotLEFTTOP = createSprite(100,150);
  //flash_dotLEFTTOP.addImage(flash_dotIMG);
  flash_dotLEFTTOP.addAnimation('flashing',flashing)
  flashydots.add(flash_dotLEFTTOP)
  
  flash_dotLEFTBOTTOM = createSprite(100,height-75);
  //flash_dotLEFTBOTTOM.addImage(flash_dotIMG);
  flash_dotLEFTBOTTOM.addAnimation('flashing',flashing)
  flashydots.add(flash_dotLEFTBOTTOM)
  
  flash_dotRIGHTTOP = createSprite(width - 100,150);
 //flash_dotRIGHTTOP.addImage(flash_dotIMG);
  flash_dotRIGHTTOP.addAnimation('flashing',flashing)
  flashydots.add(flash_dotRIGHTTOP)
  
  
  flash_dotRIGHTBOTTOM = createSprite(width - 100,height-75);
  //flash_dotRIGHTBOTTOM.addImage(flash_dotIMG);
  flash_dotRIGHTBOTTOM.addAnimation('flashing',flashing)
  flashydots.add(flash_dotRIGHTBOTTOM)
}