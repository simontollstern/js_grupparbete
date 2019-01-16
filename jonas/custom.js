//JS spel Frågor men inga svar.

//globala variabler
var gameScore = 0;
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

//Array med frågor.
var questions = [];
questions[0] = "Vad är ett äpple?";
questions[1] = "Vilken färg har en banan?";
questions[2] = "Vad blir '1' + '1' i JS?";
questions[3] = "Vad heter utvecklaren av detta spel?";
questions[4] = "Hur många frågor har du svarat på?";

//Array med svar.
var questionOneAnswers = ["En frukt", "En bil-modell", "En telefon", "Ett programmerings språk"];
var questionTwoAnswers = ["Röd", "Grön", "Gul", "Blå"];
var questionThreeAnswers = ["11", "2", "'1' '1'", "'2'"];
var questionFourAnswers = ["Jonas", "Richard", "Nordin", "Forsberg"];
var questionFiveAnswers = ["6", "5", "4", "7"];

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
  answer.innerHTML = questionOneAnswers[0];
  answer.addEventListener('click', rightAnswer);

  //Knapp med svar nr2
  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = questionOneAnswers[1];
  answer2.addEventListener('click', wrongAnswer);

  //Knapp med svar nr3
  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = questionOneAnswers[2];
  answer3.addEventListener('click', wrongAnswer);

  //Knapp med svar nr4
  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = questionOneAnswers[3];
  answer4.addEventListener('click', wrongAnswer);


}

function questionTwo() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = questionTwoAnswers[0];
  answer.addEventListener('click', wrongAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = questionTwoAnswers[1];
  answer2.addEventListener('click', wrongAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = questionTwoAnswers[2];
  answer3.addEventListener('click', rightAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = questionTwoAnswers[3];
  answer4.addEventListener('click', wrongAnswer);


}

function questionThree() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = questionThreeAnswers[0];
  answer.addEventListener('click', rightAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = questionThreeAnswers[1];
  answer2.addEventListener('click', wrongAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = questionThreeAnswers[2];
  answer3.addEventListener('click', wrongAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = questionThreeAnswers[3];
  answer4.addEventListener('click', wrongAnswer);


}

function questionFour() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = questionFourAnswers[0];
  answer.addEventListener('click', rightAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = questionFourAnswers[1];
  answer2.addEventListener('click', rightAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = questionFourAnswers[2];
  answer3.addEventListener('click', rightAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = questionFourAnswers[3];
  answer4.addEventListener('click', rightAnswer);


}

function questionFive() {
  //Se kommentarer för frågor i första funktionen.
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.innerHTML = "Fråga nr: " + questionCounter;

  var firstQuestion = document.querySelector("#pQuestion");
  firstQuestion.innerHTML = questions[questionIndex];

  answer = document.querySelector("#btn1")
  answer.innerHTML = questionFiveAnswers[0];
  answer.addEventListener('click', wrongAnswer);

  answer2 = document.querySelector("#btn2")
  answer2.innerHTML = questionFiveAnswers[1];
  answer2.addEventListener('click', wrongAnswer);

  answer3 = document.querySelector("#btn3")
  answer3.innerHTML = questionFiveAnswers[2];
  answer3.addEventListener('click', rightAnswer);

  answer4 = document.querySelector("#btn4")
  answer4.innerHTML = questionFiveAnswers[3];
  answer4.addEventListener('click', wrongAnswer);

}

function gameEnd() {

  //En ifsats som kollar om du har mer än 3 poäng för att avgöra om du kommer vidare eller ej.
  if (gameScore >= 3) {
    //Funktion för avslutande av spel.
    var questionTitle = document.querySelector("#questionTitle");
    questionTitle.innerHTML = "Grattis, du är nu klar med spelet";

    //Räknare som visar poäng från frågor.
    var firstQuestion = document.querySelector("#pQuestion");
    firstQuestion.innerHTML = "Du fick " + gameScore + " av 5 poäng!";

    //Tar bort knappar med svar.
    answer = document.querySelector("#btn1");
    answer.remove();

    answer2 = document.querySelector("#btn2");
    answer2.remove();

    answer3 = document.querySelector("#btn3");
    answer3.remove();

    answer4 = document.querySelector("#btn4");
    answer4.innerHTML = "Next game."
    answer4.style.marginTop = "0px";

    //Ändrar CSS på rutan som frågorna stod i.
    mainWindow = document.querySelector(".question");
    mainWindow.style.height = "250px";
    mainWindow.style.marginBottom = "0px";

  } else {

    //Funktion för avslutande av spel.
    var questionTitle = document.querySelector("#questionTitle");
    questionTitle.innerHTML = "Tyvärr, du fick under 3 poäng.";

    //Räknare som visar poäng från frågor.
    var firstQuestion = document.querySelector("#pQuestion");
    firstQuestion.innerHTML = "Du fick " + gameScore + " av 5 poäng!";

    //Tar bort knappar med svar.
    answer = document.querySelector("#btn1");
    answer.remove();

    answer2 = document.querySelector("#btn2");
    answer2.remove();

    answer3 = document.querySelector("#btn3");
    answer3.remove();

    answer4 = document.querySelector("#btn4");
    answer4.innerHTML = "Restart game."
    answer4.style.marginTop = "0px";

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
  gameScore += 1;

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









//a
