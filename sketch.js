var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var time;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFeed=database.ref('feedTime');
  lastFeed.on("value",readLastFed);

  feed=createButton("feedTheDog")
  feed.position(600,95)
  feed.mousePressed(feedDog)

  ghanta=hour()
  console.log(ghanta)


  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

     textSize(20)
     fill("white")
     if(lastFeed>12){
     text("Last Feed: "+lastFeed+" P.M",500,350)
         }
     else if(lastFeed<12){
          text("Last Feed: "+lastFeed+" A.M",500,350)
              }
      else if(lastFeed===0){
                text("Last Feed :12 A.M",500,350)
                    }
  drawSprites();


}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}

function readLastFed(data){
  lastFeed=data.val();

     }



function feedDog(){
  if(foodS>0){
   dog.addImage(happyDog);
   foodS--;
   database.ref('/').update({
   Food:foodS,
   feedTime:ghanta
   
      })
      
    }

  }

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

