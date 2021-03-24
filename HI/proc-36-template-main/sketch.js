var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var form;
var feed,fedTime,lastFed 


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
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.5;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  feed=createButton("FeedDog");
  feed.position(1000,95);
  feed.mousePressed(feedDog);
  var input = createInput("Name of dog");
  var button = createButton('SUBMIT');
  var input1 = createInput("Name of dog's owner");
  var button1 = createButton('SUBMIT');
  input1.position(350, 160);
  button1.position(500, 200);
  input.position(130, 160);
  button.position(250, 200);
  button.mousePressed(function(){
    input.hide();
    button.hide();
    

    var name = input.value();
   
    
    var greeting = createElement('h3');
    greeting.html("Hello " + name )
    greeting.position(130, 160)
   
  });
  button1.mousePressed(function(){
    input1.hide();
    button1.hide();
    var name1 = input1.value();
    
    var greeting1 = createElement('h4');
    
    greeting1.html("Hello " + name1 )
    

    greeting1.position(350, 160)
  });

}

function draw() {
  background(46,139,87);
  foodObj.display();
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})
fill("red");
textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed %12 + "PM",350,30);
  //write code to read fedtime value from the database 
}else if(lastFed ==0){

  text("Last Feed : 12 AM",350,30);

}else{
  text("Last Feed: " +lastFed + "AM",350,30);
 
  //write code to display text lastFed time here
}

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
dog.scale=0.3;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedObj:hour()

  })

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
