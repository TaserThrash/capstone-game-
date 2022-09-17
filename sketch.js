var player,ground,trees,apples,enemys,arrows,bow;
var score=0;
var alive=true;
var arrowI,treeI,appleI,groundI,armI,playerA;

function preload(){
  arrowI=loadImage("arrow.png");
  treeI=loadImage("tree.png");
  appleI=loadImage("apple.png");
  groundI=loadImage("ground.png");
  armI=loadImage("arm.png");
  playerA=loadAnimation("player.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight-20);
  player=createSprite(100,height-100,20,40);
  ground=createSprite(width/2,height-20,width*800,20);
  bow=createSprite(player.x,player.y,80,4);
  bow.addImage(armI);
  trees=createGroup();
  apples=createGroup();
  arrows=createGroup();
  enemys=createGroup();
  ground.addImage(groundI);
  ground.velocityX=-1;
  player.addAnimation("run",playerA);
}

function draw(){
  background("#ffffff");

  player.velocityY+=0.05;
  if(alive){
    if(keyDown("space") && player.collide(ground)){
      player.velocityY=-3;
    }
    if(keyDown(RIGHT_ARROW)){
      bow.rotation+=2;
    }
    if(keyDown(LEFT_ARROW)){
      bow.rotation-=2;
    }
    if(keyWentDown(UP_ARROW)){
      let arrow=createSprite(player.x,player.y,5,5);
      arrow.rotation=bow.rotation-90;
      arrow.velocityX=-sin(bow.rotation-90)*8;
      arrow.velocityY=-cos(bow.rotation+90)*8;
      arrows.add(arrow);
    }
    for(let i in arrows){
      arrows[i].velocityY+=0.05;
    }
    if(player.isTouching(enemys)){
      alive=false;
    }
    bow.rotation+=90;
    drawSprites();
    bow.rotation-=90;
  }
  else{
    text("DEAD!!!!!!!!!    space to restart",0,height/2);
    if(keyDown("space") && player.collide(ground)){
      alive=true;
      score=0;
    }
    apples.destroyEach();
    enemys.destroyEach();
    trees.destroyEach();
  }
  text(score,width/2,20);
  arrows.collide(ground,killArrow);
  player.collide(ground);
  arrows.collide(apples,eat);
  bow.y=player.y;
  createArrow();
  createTree();
  if(ground.x<500){
    ground.x=2000
  }
}

function killArrow(arrow){
  arrow.destroy();
}

function eat(rock,apple){
  rock.destroy();
  apple.destroy();
  score++;
}

var tsla=0;
var trnd=100;

function createTree(){
  tsla++;
  if(tsla>trnd){
    tsla=0;
    trnd=random(100,300);
    var tree=createSprite(width+40,height-70,40,100);
    tree.velocityX=-1;
    tree.lifetime=width * 2;
    var r=random(0,20);
    var rr=random(0,360);
    var apple=createSprite(tree.x+sin(rr)*r,tree.y-25+cos(rr)*r,5,5);
    apple.velocityX=-1;
    apple.lifetime=width * 2;
    apple.shapeColor="#ff0000";
    apples.add(apple);
    tree.addImage(treeI)
    trees.add(tree);
    apple.addImage(appleI);
    //tree.visible=false;
    player.depth=tree.depth+1;
    bow.depth=player.depth+5;
  }
}

function createArrow(){
  if(frameCount%(500/score)<1 && Math.round(random(0,5))==0){
    var arrow=createSprite(width+40,height-50,10,2);
    arrow.velocityX=-(score/60+1);
    arrow.lifetime=1000;
    arrow.addImage(arrowI);
    enemys.add(arrow);
  }
}
