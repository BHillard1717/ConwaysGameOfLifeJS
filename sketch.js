//Conway's Game of Life programmed in p5.js
//By: Brandon Hillard

//Arrays correspond to individual cells
let mainArray = [];
let nextArray = [];

var divFactor = 100;

function setup() {
  createCanvas(800, 800);
  background(220);
  
  //sets how many cells are possible based on a grid system
  //defaults each array index value to 0
  for (var x = 0; x < width; x += width / divFactor) {
		for (var y = 0; y < height; y += height / divFactor) {
			//stroke(0);
			//strokeWeight(1);
			//line(x, 0, x, height);
			//line(0, y, width, y);
            mainArray.push(0);
            nextArray.push(0);
		}
	}
  
  //get how many cells will be generated
  let initialCells = floor(100 + random( (divFactor*divFactor) - 100));
  console.log(initialCells);
  for(var i = 0; i < initialCells; i++){
    //set random cell as alive
    mainArray[floor(random(divFactor*divFactor))] = 1;
  }
  
  frameRate(10);
  
  //used to reset the game
  var button = createButton("New Game")
  button.mousePressed(resetSketch);
}

//used to generate a new game
function resetSketch(){
  background(220);
  
  //resets the array cells to dead state
  for(var i = 0; i < mainArray.length; i++){
    mainArray[i] = 0;
  }
  
  //get how many cells will be generated
  let initialCells = floor(100 + random( (divFactor*divFactor) - 100));
  console.log(initialCells);
  for(var i = 0; i < initialCells; i++){
    //set random cell as alive
    mainArray[floor(random(divFactor*divFactor))] = 1;
  }
  return;
}

function draw() {
  //loop through the array 
  for(var i = 0; i < mainArray.length; i++){
    //calculate where the cell is on the canvas
    var row = floor(i / divFactor);
    var column = i % divFactor;
    
    //set color based on current state
    //alive = white, dead = black
    var color = 255*(mainArray[i]);
    fill(color)
    
    //fill in the cell
    rect(column * width / divFactor, row * height / divFactor, width / divFactor, height / divFactor);
    
    //calculate the state of the cell next round
    let aliveNearby = 0;
    
    //check top squares
    if(i > (divFactor - 1) ){
      //check the top left
      if((i % divFactor != 0) && (mainArray[i-(divFactor+1)] === 1) ){
        aliveNearby++;
      }

      //check top
      if(mainArray[i-divFactor] === 1){
        aliveNearby++;
      }

      //check top right
      if((i % divFactor != (divFactor - 1)) && (mainArray[i-(divFactor-1)] === 1) ){
        aliveNearby++;
      }
    }
    
    //check left side
    if((i % divFactor != 0) && (mainArray[i-1] === 1) ){
      aliveNearby++;
    }
    
    //check right side
    if((i % divFactor != (divFactor-1)) && (mainArray[i+1] === 1) ){
      aliveNearby++;
    }
    
    //check bottom
    if(i < ((divFactor*divFactor) - divFactor) ){
      //check bottom left
      if((i % divFactor != 0) && (mainArray[i+(divFactor-1)] === 1) ){
        aliveNearby++;
      }
      
      //check bottom
      if(mainArray[i+divFactor] === 1){
        aliveNearby++;
      }
      
      //check bottom right
      if((i % divFactor != (divFactor-1)) && (mainArray[i+(divFactor+1)] === 1) ){
        aliveNearby++;
      }
    }
    
    //set the next generation
    //Each case based on the rules for Conway's Game of Life
    if(aliveNearby < 2 && mainArray[i] === 1){
      nextArray[i] = 0;
      
    }else if(aliveNearby < 4 && mainArray[i] === 1){
      nextArray[i] = 1;
            
    }else if(mainArray[i] === 1){
      nextArray[i] = 0;
             
    }else if(mainArray[i] === 0 && aliveNearby === 3){
      nextArray[i] = 1;
    }else{
      nextArray[i] = mainArray[i];
    }
  }
  
  
  //Set the next generation
  for(var i = 0; i < mainArray.length; i++){
    mainArray[i] = nextArray[i];
  }
}



//This code is unoptimized 
//A possible optimization include switching off between the array being drawn
//to cut down on the time it takes to write the nextArray into the main Array.