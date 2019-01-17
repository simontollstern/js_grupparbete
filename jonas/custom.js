// COOKIES
var cookies = document.cookie.split("; ");
var cookie = {};

for(var c of cookies){
  var objects = c.split("=");

  cookie[objects[0]] = objects[1];
}

//JS spel Frågor men inga svar.

//Objekt för vinst meddelande och poäng.
var game = {
  score: 0,
  winAlert: function(){
    alert('You won!');
  },
  lostAlert: function(){
    alert('You lost!');
  },
  myAge: function() {
    return 2018-1994;
  },
  productionYear: function() {
    return 2018;
  }
}



//Loggar ur mitt namn som developer för spelet.
var developer = [
  [{
    developer: "Jonas Forsberg",
  }]
];
console.log(developer);

developer.push(game.myAge());
developer.push(game.productionYear());

//globala variabler
var questionCounter = 1;
var questionIndex = 0;


//Titel på spelet.
var topElement = document.querySelector(".maincontent");
var titleOfGame = document.createElement("h1");
titleOfGame.textContent = "Frågor men inga svar.";
titleOfGame.style.textAlign = "center";
titleOfGame.style.marginTop = "50px";
document.body.appendChild(titleOfGame);
document.body.insertBefore(titleOfGame, topElement);

//Namn på spelare
var name = cookie.user;
var userName = document.createElement("p");
userName.style.textAlign = "center";
userName.style.marginTop = "20px";
document.body.appendChild(userName);
document.body.insertBefore(userName, topElement);
userName.innerHTML = "Spelare: " + name;

//Array med frågor och array metoder.
//Skapar en tom array.
var questions = [];
//använder unshift för att lägga till en fråga på index 0.
var question1 = "vad är ett äpple?";
questions.unshift(question1);
//Använder push för att lägga in en fråga "sist" i arrayen.
var question2 = "Vilken färg har en banan?";
questions.push(question2);
//Använder index # för placering av dessa frågor i arrayen.
questions[2] = "Vad blir '1' + '1' i JS?";
questions[3] = "Vad heter utvecklaren av detta spel?";
questions[4] = "Hur många frågor har du svarat på?";

//2d-Array med svar.
var answersArray = [
  ["En frukt", "En bil-modell", "En telefon", "Ett programmerings språk"],
  ["Röd", "Grön", "Gul", "Blå"],
  ["11", "2", "'1' '1'", "'2'"],
  ["Jonas", "Richard", "Nordin", "Forsberg"],
  ["6", "5", "4", "7"]
]

// console.log(questions, questionOneAnswers, questionTwoAnswers, questionThreeAnswers, questionFourAnswers, questionFiveAnswers);

function questionOne() {
  //Titel på frågan.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  //Frågan från en array.
  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  //Knapp för svar från en array.

  //Knapp med svar nr1
  answer = document.querySelector("#btn1")
  answer.innerHTML = answersArray[0][0];
  answer.addEventListener('click', rightAnswer);

  //Knapp med svar nr2
  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = answersArray[0][1];
  answer2.addEventListener('click', wrongAnswer);

  //Knapp med svar nr3
  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = answersArray[0][2];
  answer3.addEventListener('click', wrongAnswer);

  //Knapp med svar nr4
  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = answersArray[0][3];
  answer4.addEventListener('click', wrongAnswer);


}

function questionTwo() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = answersArray[1][0];
  answer.addEventListener('click', wrongAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = answersArray[1][1];
  answer2.addEventListener('click', wrongAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = answersArray[1][2];
  answer3.addEventListener('click', rightAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = answersArray[1][3];
  answer4.addEventListener('click', wrongAnswer);


}

function questionThree() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = answersArray[2][0];
  answer.addEventListener('click', rightAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = answersArray[2][1];
  answer2.addEventListener('click', wrongAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = answersArray[2][2];
  answer3.addEventListener('click', wrongAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = answersArray[2][3];
  answer4.addEventListener('click', wrongAnswer);


}

function questionFour() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = answersArray[3][0];
  answer.addEventListener('click', rightAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = answersArray[3][1];
  answer2.addEventListener('click', rightAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = answersArray[3][2];
  answer3.addEventListener('click', rightAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = answersArray[3][3];
  answer4.addEventListener('click', rightAnswer);


}

function questionFive() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = answersArray[4][0];
  answer.addEventListener('click', wrongAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = answersArray[4][1];
  answer2.addEventListener('click', wrongAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = answersArray[4][2];
  answer3.addEventListener('click', rightAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = answersArray[4][3];
  answer4.addEventListener('click', wrongAnswer);

}

function gameEnd() {
  var i = 0;
  while (questions.length > 0) {
    questions.pop(i);
    i++;
  }

  //En ifsats som kollar om du har mer än 3 poäng för att avgöra om du kommer vidare eller ej.
  if (game.score >= 3) {

    //Alert för vinst.
    game.winAlert();
    //Funktion för avslutande av spel.
    var questionTitle = document.querySelector("#questionTitle");
    questionTitle.innerHTML = "Grattis, du är nu klar med spelet";

    //Räknare som visar poäng från frågor.
    var firstQuestion = document.querySelector("#pQuestion");
    firstQuestion.innerHTML = "Du fick " + game.score + " av 5 poäng!";

    //Tar bort knappar med svar.
    answer = document.querySelector("#btn1");
    answer.remove();

    answer2 = document.querySelector("#btn2");
    answer2.remove();

    answer3 = document.querySelector("#btn3");
    answer3.remove();

    answer4 = document.querySelector("#btn4");
    answer4.innerHTML = "Till slutsidan.";
    answer4.style.marginTop = "0px";
    answer4.addEventListener("click", function () {
      location.href = "../";
    })

    //Ändrar CSS på rutan som frågorna stod i.
    mainWindow = document.querySelector(".question");
    mainWindow.style.height = "250px";
    mainWindow.style.marginBottom = "0px";

  } else {

    //Alert för förlust.
    game.lostAlert();
    //Funktion för avslutande av spel.
    var questionTitle = document.querySelector("#questionTitle");
    questionTitle.innerHTML = "Tyvärr, du fick under 3 poäng.";

    //Räknare som visar poäng från frågor.
    var firstQuestion = document.querySelector("#pQuestion");
    firstQuestion.innerHTML = "Du fick " + game.score + " av 5 poäng!";

    //Tar bort knappar med svar.
    answer = document.querySelector("#btn1");
    answer.remove();

    answer2 = document.querySelector("#btn2");
    answer2.remove();

    answer3 = document.querySelector("#btn3");
    answer3.remove();

    if (cookie.extraLife == "true") {
      answer4 = document.querySelector("#btn4");
      answer4.innerHTML = "Hoppa över med extra liv.";
      answer4.style.marginTop = "0px";
      answer4.addEventListener("click", function() {
        document.cookie = "extraLife=false; path=/";
        location.href = "../endscreen.html";
      })
    } else {
      answer4 = document.querySelector("#btn4");
      answer4.innerHTML = "Försök igen.";
      answer4.style.marginTop = "0px";
      answer4.addEventListener("click", function() {
        location.reload();
      })
    }

    //Ändrar CSS på rutan som frågorna stod i.
    mainWindow = document.querySelector(".question");
    mainWindow.style.height = "250px";
    mainWindow.style.marginBottom = "0px";
  }
}

function rightAnswer() {

  //Funktion ifall man har svarat rätt på frågor.
  questionIndex++;
  questionCounter++;
  game.score += 1;

  //Går igenom alla knappar med en for-loop för att ta bort event lyssnare.
  for (var i = 0; i < 4; i++) {
    document.querySelectorAll("button")[i].removeEventListener("click", rightAnswer);
    document.querySelectorAll("button")[i].removeEventListener("click", wrongAnswer);
  }

  //Switch-sats för att gå vidare i spelet vid rätt gissning.
  switch (questionIndex) {
    case 1:
      questionTwo();
      break;
    case 2:
      questionThree();
      break;
    case 3:
      questionFour();
      break;
    case 4:
      questionFive();
      break;
    default:
      gameEnd();
      break;
  }
}

function wrongAnswer() {

  //Funktion ifall man har svarat fel på frågor.
  questionIndex++;
  questionCounter++;

  //Samma som ovan, loopar igenom knapparna och tar bort event lyssnare.
  for (var i = 0; i < 4; i++) {
    document.querySelectorAll("button")[i].removeEventListener("click", rightAnswer);
    document.querySelectorAll("button")[i].removeEventListener("click", wrongAnswer);
  }

  //Switch-sats för att gå vidare om man svarat fel.
  switch (questionIndex) {
    case 1:
      questionTwo();
      break;
    case 2:
      questionThree();
      break;
    case 3:
      questionFour();
      break;
    case 4:
      questionFive();
      break;
    default:
      gameEnd();
      break;
  }
}


//Startar spelet.
questionOne();





//Detta är en kommentar för att testa GIT i grupp.



//a
