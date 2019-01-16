var user = prompt("Enter your name: ");

var container = document.querySelector("div");

var h1 = document.createElement("h1");
h1.innerHTML = `Welcome, ${user}!`;
document.body.insertBefore(h1, container);

var startGame = document.createElement("button");
startGame.innerHTML = "Start the first game!";
document.body.insertBefore(startGame, container);

startGame.addEventListener("click", function(){
  if(extraLife.checked == true){
    document.cookie = "extraLife=true";
  }else{
    document.cookie = "extraLife=false";
  }
  location.href = "simon";
});

var extraLife = document.createElement("input");
extraLife.setAttribute("type", "checkbox");
container.appendChild(extraLife);

var extraLifeText = document.createElement("p");
extraLifeText.innerHTML = "I want an extra life!";
container.appendChild(extraLifeText);

document.cookie = `user=${user}`;
