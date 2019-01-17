// ------------------ COOKIES ------------------ //
// This piece of code is identical on every game but needs to be in all js files

// document.cookie is a string, turn it into an array (["example=example", ..])
var cookies = document.cookie.split("; ");
// Create an object in which to store the cookies
var cookie = {};
// Loop through the cookies
for(var c of cookies){
  // Split the cookie strings and turn them into arrays (["example", "example"], ..)
  var objects = c.split("=");
  // Add the first value to the cookie object as a key and the other as a value
  cookie[objects[0]] = objects[1];
  // This means that cookies with the value "true" are strings and not booleans, but I can't be bothered to fix it
}

// --------- SOME GENERAL INFORMATION ---------- //
// The array which keeps track of the position of things
// is referred to as "the grid". The grid can have 3
// values: 0 - Empty space, 1 - Occupied space and 2 -
// the current shape.
// The table on which the game is drawn is referred to
// as "the table".

// Also all the setTimeouts with 0 delay feels really
// hacky and is only used for A E S T H E T I C S

// -------------- GLOBAL VARIABLES ------------- //
// The grid, explained above
var grid = [],
// An array with object for all the available shapes
shapes = [
  {
    color: "hsl(0, 50%, 50%)",
    blocks: [
      [1, 1],
      [1, 1]
    ]
  },
  {
    color: "hsl(42, 50%, 50%)",
    blocks: [
      [1],
      [1],
      [1],
      [1]
    ]
  },
  {
    color: "hsl(84, 50%, 50%)",
    blocks: [
      [0, 1, 0],
      [1, 1, 1]
    ]
  },
  {
    color: "hsl(126, 50%, 50%)",
    blocks: [
      [0, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    color: "hsl(168, 50%, 50%)",
    blocks: [
      [1, 0, 0],
      [1, 1, 1]
    ]
  },
  {
    color: "hsl(210, 50%, 50%)",
    blocks: [
      [1, 1, 0],
      [0, 1, 1]
    ]
  },
  {
    color: "hsl(252, 50%, 50%)",
    blocks: [
      [0, 1, 1],
      [1, 1, 0]
    ]
  },
],
// Becomes a random number to select a random shape
randomShape,
// Becomes the nextShape and is controlled by the player
currentShape,
// Becomes one of the available shapes
nextShape,
// Keeps track of the score
score = 0,
// Keeps track of the currentShape's horizontal position
shapePosition,
// Keeps track of wether a shape is active or not
shapeActive = false,
// Keeps track of the currentShape's vertical position
currentRow = 0,
// The speed at which the shapes move
interval = 200,
// The speed at which the shapes move while the player presses the down key
fastInterval = 30,
// Keep track of wether the game is running or not
gameOver = false,
// Same as above, kinda
pause = true,
// The name of the setInterval (requires a name to clearInterval)
speed;

// ----------------- FUNCTIONS ----------------- //
function drawGrid(rows, columns){
  // Fill the grid with the specified amounts of rows and columns
  for(var i = 0; i < rows; i++){
    grid[i] = new Array(columns).fill(0);
  }

  // Create tr's in the table for every row in the grid array
  for(var row in grid){
    document.querySelector("table").appendChild(document.createElement("tr"));
  }

  // Create td's in the table for every column in the grid array
  for(var row in grid){
    for(var column in grid[row]){
      document.querySelectorAll("tr")[row].appendChild(document.createElement("td"));
    }
  }

  // Set the spawn position for shapes to the middle of the grid
  shapePosition = Math.floor(grid[0].length / 2)

  // I don't really know where to put this, but get the user's name from the cookie and add it to the page
  document.querySelector(".score-container p").innerHTML = cookie.user;
}

function startScreen(){
  // Set the title in the overlay's opacity to 1 after a 0ms delay to trigger the transition
  setTimeout(function(){
    document.querySelector(".overlay h1").style.opacity = "1";
  }, 0);
  // Set the button in overlay's opacity to 1 after 200ms
  setTimeout(function(){
    document.querySelector(".overlay a").style.opacity = "1";
  }, 200);

  // Add mouseenter and mouseleave events that changes border color to the button
  document.querySelector(".overlay a").addEventListener("mouseenter", function(){
    this.style.borderColor = "red";
  });
  document.querySelector(".overlay a").addEventListener("mouseleave", function(){
    this.style.borderColor = "#ccc";
  });

  // Add a click event that displays the UI and starts the game to the button
  document.querySelector(".overlay a").addEventListener("click", function(){
    // Show UI
    document.querySelector(".right").style.opacity = "1";
    document.querySelector(".right").style.marginLeft = "60px";
    document.querySelector(".right-bottom").style.boxShadow = "0 5px 10px 2px rgba(0,0,0,0.3)";

    // Hide overlay
    document.querySelector(".overlay h1").style.opacity = "0";
    setTimeout(function(){
      document.querySelector(".overlay a").style.opacity = "0";
    }, 200);
    // After all transitions are finished
    setTimeout(function(){
      // Remove elements from the overlay
      while(document.querySelector(".overlay").childNodes[0]){
        document.querySelector(".overlay").removeChild(document.querySelector(".overlay").childNodes[0]);
      }

      // Start the game
      pause = false;
      // Set the interval at which rate the shapes move
      speed = setInterval(step, interval);
    }, 700);
  });
}

function checkFirstRow(){
  // Check if the first row is full of 1's
  if(grid[0].includes(1)){
    // Clear the current interval
    clearInterval(speed);
    // Set gameOver to true to prevent further actions
    gameOver = true;
    // Display the game over screen
    endScreen();
  }
}

function equalArray(array){
  // Returns true if all values in an array is equal to the first one
  return array.every(function(el){
    return el === array[0];
  });
}

function removeFullRows(){
  // Get number of hidden rows
  var hiddenRows = document.querySelectorAll('.temp-tr').length;
  // Keep track of which rows to remove
  var rowsToRemove = [];
  for(var row in grid){
    // Check if the row is full of 1's (non-active blocks)
    if(equalArray(grid[row]) && grid[row][0] == 1){
      // If it is, add that row to the array with rows to remove
      rowsToRemove.push(Number(row));
    }
  }

  // If any rows are to be removed
  if(rowsToRemove.length > 0){
    for (var row of rowsToRemove){
      // Remove the full row from the grid array
      grid.splice(row, 1);
      // And add a new one at the top
      grid.unshift(new Array(15).fill(0));

      // Brighten the colors and set some borders for the row that will be removed
      for(var block in grid[row]){
        document.querySelectorAll("tr")[row].querySelectorAll("td")[block].style.filter = "brightness(200%)";
        document.querySelectorAll("tr")[row].querySelectorAll("td")[block].style.borderTop = "0.5px solid #222";
        document.querySelectorAll("tr")[row].querySelectorAll("td")[block].style.borderBottom = "0.5px solid #222";

        document.querySelectorAll("tr")[row - 1].querySelectorAll("td")[block].style.borderBottom = "0.5px solid #222";

         if(document.querySelectorAll("tr")[row + 1].querySelectorAll("td")[block]){
           document.querySelectorAll("tr")[row + 1].querySelectorAll("td")[block].style.borderTop = "0.5px solid #222";
         }
      }

      // Pause the game for 1 second
      pause = true;
      setTimeout(function(){
        pause = false;

        // Add a new row at the top of the table
        document.querySelector("table").insertBefore(document.createElement("tr"), document.querySelectorAll("tr")[0]);

        // Fill the new row with columns with 0 height
        for(var block in grid[row]){
          var newBlock = document.createElement("td");
          document.querySelectorAll("tr")[0].appendChild(newBlock);
        }

        // Remove the row
        document.querySelector("table").removeChild(document.querySelector("table").childNodes[row + 1]);

        // Decrease the interval between steps
        interval -= interval / 10;
        // ..and set a new one with the new interval
        clearInterval(speed);
        speed = setInterval(step, interval);
      }, 1000);
    }

    // Increase the score by 100
    score += 100 * rowsToRemove.length;
    // Replace the old score in the document with the new one
    document.querySelectorAll(".score-container p")[1].innerHTML = score;

    // If score requirement is exceeded, replace the red X with a green checkmark
    if(score >= 500){
      document.querySelector("span").innerHTML = "&#10004;";
      document.querySelector("span").style.color = "hsl(168, 50%, 50%)";
    }

    // Return true to make sure nothing happens while the game is paused
    if(pause){
      rowsToRemove = [];
      return true;
    }
  }
}

function createShape(){
  // Set the row the shape will be drawn on to the first row
  currentRow = 0;
  // Set the column the shape will drawn on to the centremost column
  shapePosition = Math.floor(grid[0].length / 2);
  // Generate a number to determine which shape object to draw
  randomShape = Math.floor(Math.random() * shapes.length);
  // IF the nextShape variable doesn't a value i.e. if it is the first frame of the game
  if(!nextShape){
    // Set the currentShape to a random shape object
    currentShape = Object.create(shapes[randomShape]);
    // Generate a new random number
    randomShape = Math.floor(Math.random() * shapes.length);
    // Set the nextShape to the new random shape object
    nextShape = Object.create(shapes[randomShape]);
  }else{
    // Set the currentShape to the nextShape
    currentShape = nextShape;
    // Generate a new nextShape
    nextShape = Object.create(shapes[randomShape]);
  }
  // Check how many extra rows there are
  var rowsToRemove = document.getElementsByClassName('temp-tr');
  // Remove extra rows
  while(rowsToRemove[0]){
    grid.shift();
    document.querySelector("table").removeChild(rowsToRemove[0]);
  }
  for(var i = 0; i < currentShape.blocks.length - 1; i++){
    // Add extra rows to the array
    grid.unshift(new Array(15).fill(0));

    // And to the table
    var newRow = document.createElement("tr");
    newRow.setAttribute("class", "temp-tr");
    document.querySelector("table").insertBefore(newRow, document.querySelectorAll("tr")[0]);

    // And fill the rows with invisible columns
    for(var block in grid[i]){
      var tempBlock = document.createElement("td");
      tempBlock.setAttribute("class", "temp-td");
      document.querySelectorAll("tr")[0].appendChild(tempBlock);
    }
  }
  // Draw the shape
  drawShape();
  // Keep track of when a shape is active
  shapeActive = true;

  // Remove all child nodes from the table that displays the nextShape
  while (document.querySelector(".right-bottom table").firstChild){
    document.querySelector(".right-bottom table").removeChild(document.querySelector(".right-bottom table").firstChild);
  }

  // Create tr's in the table for every row in the nextShape.blocks array
  for(var row in nextShape.blocks){
    document.querySelector(".right-bottom table").appendChild(document.createElement("tr"));
  }

  // Create td's in the table for every column in the nextShape.blocks array
  for(var row in nextShape.blocks){
    for(var column in nextShape.blocks[row]){
      document.querySelectorAll(".right-bottom table tr")[row].appendChild(document.createElement("td"));
    }
  }

  // Draw the nextShape on the nextShape table the same way we do with the currentShape on the grid
  for(var row in nextShape.blocks){
    for(var block in nextShape.blocks[row]){
      if(nextShape.blocks[row][block] == 1){
        document.querySelectorAll(".right-bottom table tr")[row].querySelectorAll("td")[block].style.backgroundColor = nextShape.color;
      }
    }
  }
}

function drawShape(){
  for(var row in currentShape.blocks){
    for(var block in currentShape.blocks[row]){
      // Loop through the currentShape and create it in the grid array
      if(currentShape.blocks[row][block] == 1){
        grid[currentRow + Number(row)][shapePosition + Number(block)] = 2;
      }
      // Also, create the shape in the table and give it borders its sides
      if(currentShape.blocks[row][block] == 1){
        document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.backgroundColor = currentShape.color;

        if(currentShape.blocks[row][block - 1] != 1){
          document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.borderLeft = "0.5px solid #222";
        }
        if(currentShape.blocks[row][Number(block) + 1] != 1){
          document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.borderRight = "0.5px solid #222";
        }
        if(row == 0 || currentShape.blocks[row - 1][block] != 1){
          document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.borderTop = "0.5px solid #222";
        }
        if(row == currentShape.blocks.length - 1 || currentShape.blocks[Number(row) + 1][block] != 1){
          document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.borderBottom = "0.5px solid #222";
        }
      }
    }
  }
}

function clearShape(){
  for(var row in currentShape.blocks){
    for(var block in currentShape.blocks[row]){
      // Loop through the grid on the blocks where the shape is
      switch(grid[currentRow + Number(row)][shapePosition + Number(block)]){
        case 2:
          // Clear the blocks that contain the currentShape
          grid[currentRow + Number(row)][shapePosition + Number(block)] = 0;
          break;
      }
      // Also remove the shape from the table
      if(currentShape.blocks[row][block] == 1){
        document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.backgroundColor = "#222";
        document.querySelectorAll("tr")[currentRow + Number(row)].querySelectorAll("td")[shapePosition + Number(block)].style.border = "none";
      }
    }
  }
}

function nextStep(){
  // Remove the currentShape from the grid and table
  clearShape();
  // Move currentRow to the next row
  currentRow++;
  // Draw the currentShape on the new row
  drawShape();
}

function checkCollision(direction){
  // Create an array that will store information about collision
  var collisionArray = [];

  for(var row in currentShape.blocks){
    for(var block in currentShape.blocks[row]){

      if(direction == "down"){
        // Check if the shape is at the bottom row OR if any of the shape's blocks has a non-active block on the next row
        if(currentRow == grid.length - currentShape.blocks.length || currentShape.blocks[row][block] == 1 && grid[currentRow + Number(row) + 1][shapePosition + Number(block)] == 1){
          // If it does - push true to the array
          collisionArray.push(true);
        }else{
          // If not - push false
          collisionArray.push(false);
        }
      }

      if(direction == "left"){
        // Check if any of the shape's blocks has a non-active block to their left
        if(currentShape.blocks[row][block] == 1 && grid[currentRow + Number(row)][shapePosition + Number(block) - 1] == 1){
          // If it does - push true to the array
          collisionArray.push(true);
        }else{
          // If not - push false
          collisionArray.push(false);
        }
      }

      if(direction == "right"){
        // Check if any of the shape's blocks has a non-active block to their right
        if(currentShape.blocks[row][block] == 1 && grid[currentRow + Number(row)][shapePosition + Number(block) + 1] == 1){
          // If it does - push true to the array
          collisionArray.push(true);
        }else{
          // If not - push false
          collisionArray.push(false);
        }
      }
    }
  }
  // Return true or false depending on if any of the shape's blocks has pushed true
  if(collisionArray.includes(true)){
    return true;
  }else{
    return false;
  }
}

function endScreen(){
  // Change the background-color of the overlay
  document.querySelector(".overlay").style.backgroundColor = "rgba(0,0,0,0.75)";

  // Hide the UI
  document.querySelector(".right").style.marginLeft = "-195px";
  document.querySelector(".right").style.opacity = "0";
  document.querySelector(".right-bottom").style.boxShadow = "none";

  // Create some text and buttons
  var gameoverText = document.createElement("p");
  gameoverText.innerHTML = "game over";
  var endScore = document.createElement("h1");
  endScore.innerHTML = score;
  var restartButton = document.createElement("a");
  restartButton.innerHTML = "restart";
  var nextGameButton = document.createElement("a");
  if(score >= 500){
    nextGameButton.innerHTML = "next game";
  }else if(cookie.extraLife == "true"){
    nextGameButton.innerHTML = "use your extra life";
  }

  var overlay = document.querySelector(".overlay");

  // Append the text and the buttons to the overlay
  overlay.appendChild(gameoverText);
  overlay.appendChild(endScore);
  overlay.appendChild(restartButton);
  if(score >= 500 || cookie.extraLife == "true"){
    overlay.appendChild(nextGameButton);
  }

  // Change the opacity after a delay (again, to trigger the transitions)
  setTimeout(function(){
    gameoverText.style.opacity = "1";
  }, 1000);

  setTimeout(function(){
    endScore.style.opacity = "1";
  }, 1100);

  setTimeout(function(){
    restartButton.style.opacity = "1";
  }, 1200);

  if(score >= 500 || cookie.extraLife == "true"){
    setTimeout(function(){
      nextGameButton.style.opacity = "1";
    }, 1300);
  }

  // Find the amount of loops to do depending on the number of buttons
  var loops = score >= 500 || cookie.extraLife == "true" ? 2 : 1;

  // Loop through the new buttons and add event listeners to them
  for(var i = 0; i < loops; i++){
    document.querySelectorAll("a")[i].addEventListener("mouseover", function(){
      this.style.borderColor = "red";
    });
    document.querySelectorAll("a")[i].addEventListener("mouseleave", function(){
      this.style.borderColor = "#ccc";
    });
    // Add different event listeners here depending on the button
    switch(i){
      case 0:
        document.querySelectorAll("a")[i].addEventListener("click", restart);
        break;
      case 1:
        document.querySelectorAll("a")[i].addEventListener("click", nextGame);
        break;
    }
  }

  function restart(){
    // Change the opacity after a delay (again, to trigger the transitions)
    gameoverText.style.opacity = "0";

    setTimeout(function(){
      endScore.style.opacity = "0";
    }, 100);

    setTimeout(function(){
      restartButton.style.opacity = "0";
    }, 200);

    setTimeout(function(){
      nextGameButton.style.opacity = "0";
    }, 300);

    setTimeout(function(){
      overlay.style.backgroundColor = "#222";
    }, 400);

    setTimeout(function(){
      // Reload the page
      location.reload();
    }, 1400)
  }

  function nextGame(){
    // If the extra life is used, set the cookie to false
    if(score < 500){
      document.cookie = "extraLife=false; path=/";
    }

    // Go to the next game
    location.href = "../michele";
  }
}

// --------------- THE MAIN LOOP --------------- //
drawGrid(30, 15);
startScreen();

function step(){
  // End the game if the first row is full
  checkFirstRow();
  // Remove any full rows
  removeFullRows();

  // If the game isn't paused
  if(!removeFullRows() && !pause){
    if(!shapeActive){
      // If there is no active shape, create a new one
      createShape();
    }else{
      // If the active shape is colliding with something
      if(checkCollision("down")){
        // Deactivate it
        shapeActive = false;
        for(var row in grid){
          for(var block in grid[row]){
            // Convert it from 2 (active) on the grid to 1 (non-active)
            if(grid[row][block] == 2){
              grid[row][block] = 1;
            }
          }
        }
      }else{
        // Move downwards
        nextStep();
      }
    }
  }
}

// -------------- EVENT LISTENERS -------------- //
// Keep track of whether S/ArrowDown is pressed or not
var keyDownPressed = false;

window.addEventListener("keydown", function(e){
  // If the game is running
  if(!gameOver && !pause){
    // Prevents error messages when keys are pressed before the first shape is created
    if(currentShape != undefined){
      // If A or Arrow Left is pressed
      if(e.code == "KeyA" || e.code == "ArrowLeft"){
        if(shapePosition > 0 && !checkCollision("left")){
          // Remove the currentShape from the grid and table
          clearShape();
          // Move the currentShape one step to the left
          shapePosition--;
          // Draw the currentShape on the new position
          drawShape();
        }
      }
      // If D or Arrow right is pressed
      if(e.code == "KeyD" || e.code == "ArrowRight"){
        if(shapePosition + currentShape.blocks[0].length < grid[0].length && !checkCollision("right")){
          // Remove the currentShape from the grid and table
          clearShape();
          // Move currentRow one step to the right
          shapePosition++;
          // Draw the currentShape on the new position
          drawShape();
        }
      }
      // If W or Arrow up is pressed
      if(e.code == "KeyW" || e.code == "ArrowUp"){
        // Create a temporary array to store the rotated shape
        var tempArray = [];

        // Remove the currentShape from the grid and table
        clearShape();

        // Make the temporary array the right size for the currentShape
        for(var block in currentShape.blocks[0]){
          tempArray[block] = [];
        }

        // Unshift blocks from the currentShape into the tempArray so that it rotates clockwise
        for(var row in currentShape.blocks){
          for(var block in currentShape.blocks[row]){
            tempArray[block].unshift(currentShape.blocks[row][block]);
          }
        }

        // Check if the rotated shape would fit within the grid
        if(tempArray[0].length + shapePosition <= grid[0].length && tempArray.length + currentRow <= grid.length){
          // Variable to store if it fits or not
          var blockFits = true;
          for(var row in tempArray){
            for(var block in tempArray[row]){
              // Check if the rotated shape would collide with something
              if(tempArray[row][block] == 1 && grid[currentRow + Number(row)][shapePosition + Number(block)] == 1){
                // If it would, don't rotate it
                blockFits = false;
              }
            }
          }
          // If it would fit, rotate it
          if(blockFits){
            // Give the currentShape the new, rotated array
            currentShape.blocks = tempArray;
            // Set the new height of the currentShape
            currentShape.blocks.length = currentShape.blocks.length;
          }
        }

        // Draw the currentShape on the new position
        drawShape();

        // Reset the tempArray
        tempArray = [];
      }
    }
    // Only run this once per keydown, otherwise it will keep clearing and setting the interval
    if(!keyDownPressed){
      // If S or Arrow down is pressed
      if(e.code == "KeyS" || e.code == "ArrowDown"){
        // Clear the current interval
        clearInterval(speed);
        // And set a faster one
        speed = setInterval(step, fastInterval);
      }

      // Keep track of the pressed key
      keyDownPressed = true;
    }
  }
});

window.addEventListener("keyup", function(e){
  // If the game is running
  if(!gameOver && !pause){
    // If S or Arrow down is released
    if(e.code == "KeyS" || e.code == "ArrowDown"){
      // Clear the faster interval
      clearInterval(speed);
      // And set the regular one
      speed = setInterval(step, interval);
    }

    // Keep track of the pressed key
    keyDownPressed = false;
  }
});

// ------------------- EXTRAS ------------------ //
// The things below are not relevant to the game,
// but they are required for this assignment

// Create an object with 3 methods
var creator = {
  name: "Simon Tollstern",
  print: function(){
    console.log(this.name);
  },
  printUpperCase: function(){
    console.log(this.name.toUpperCase());
  },
  printLowerCase: function(){
    console.log(this.name.toLowerCase());
  }
}

// Function that takes an object and a callback
function printCreator(object, callback){
  console.log(object);
  callback();
}

// This is the callback
function callMethods(){
  creator.print();
  creator.printUpperCase();
  creator.printLowerCase();
}

// Run it
printCreator(creator, callMethods);
