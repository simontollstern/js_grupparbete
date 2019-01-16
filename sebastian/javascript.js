// COOKIES
var cookies = document.cookie.split("; ");
var cookieObjs = [];

for(var cookie of cookies){
  var objects = cookie.split("=");

  cookieObjs.push({
    [objects[0]]: objects[1]
  });
}

/* intro */

// Byter ut muspekaren till ett sikte
document.body.style.cursor = "crosshair";

var introImg = document.querySelector('#introImg');
var startButton = document.querySelector('#play');
startButton.style.display = 'none';

var welcomeText = document.querySelector('#welcomeText');
var maleChar = document.querySelector('#maleChar');
var femaleChar = document.querySelector('#femaleChar');

/* valda karaktärer */
function maleCharacterTransform() {
    maleChar.style.transform = 'scale(1.2)';
    femaleChar.style.transform = 'scale(1)';
    startButton.style.display = 'block';

    var maleSound = new Audio('Laugh_To_Self.mp3');
    // tortureSound.play();
    var malePromise = maleSound.play()


    if (malePromise !== null) {
        malePromise.catch(() => { /* discard runtime error */ })
    }

}

function femaleCharacterTransform() {
    femaleChar.style.transform = 'scale(1.2)';
    maleChar.style.transform = 'scale(1)';
    startButton.style.display = 'block';

    var femaleSound = new Audio('femaleVoice.mp3');
    // tortureSound.play();

    var femalePromise = femaleSound.play()
    if (femalePromise !== null) {
        femalePromise.catch(() => { /* discard runtime error */ })
    }
};




//Splet börjar

function gamePlay() {
    calc();
    introImg.style.display = 'none';
    var scoreCounter = 0;
    var secondsCountDown = 4;
    var lifeFunc;
    var points;
    var playerScore;
    var player = {
        playerLife: 4,
        ammo: function () {
            if (bulletArray.length === 0) {
                for (var i = 1; i < 7; i++) {
                    var ammo = i;
                    bulletArray.push(ammo);
                    bulletPrint();
                    var gunShotReloadSound = new Audio('shotgun-reload.mp3');
                    gunShotReloadSound.play();
                }
            }
        }
    };
    var shots = 0;
    var highScore = [];
    var bulletArray = [];
    var random2dArray = [
        [],
        [],
        [{
            developer: "Sebastian Persson Ec utb made this game"
        }],
    ];


    // Se ditt liv från början i consolen, func med object
    lifeFunctionObject(player);

    function lifeFunctionObject(object) {
        life = object.playerLife;
        return console.log('You read this in the console, you will start with: ' + life + ' life');
    }
    //Function med object slutar

    buttonPlay = document.querySelector('.playAgainYes');
    buttonQuit = document.querySelector('.playAgainNo');

    var playerName = cookieObjs[1].user;
    random2dArray[0].push(playerName);


    var playerLastName = prompt('Enter your lastname, hunter.');
    random2dArray[1].push(playerLastName);
    alert('Good luck ' + random2dArray[0] + ' ' + random2dArray[1] + ' here is your gun.');

    // Laddar geväret första rundan
    for (var i = 1; i < 8; i++) {
        var ammo = i;
        bulletArray.push(ammo);
    }


    // window.onclick function börjar - Skott avlossas var man än klickar
    window.onclick = function () {

        bulletArray.pop();
        var gunShotSound = new Audio('Shotgun_Blast.mp3');
        gunShotSound.play();

        player.ammo();
        bulletPrint();
        shots++;

    }
    // window.onclick function slutar


    // kallar på nedanstående function
    bulletPrint();
    // bulletPrint function börjar
    function bulletPrint() {
        document.querySelector('#bullets').textContent = 'Ammo: ' + bulletArray.length + ' / 6';
        document.querySelector('#bullets').style.fontSize = '50px';
        document.querySelector('#bullets').style.color = 'white';
        document.querySelector('#bullets').style.marginLeft = '200px';
    }
    // bulletPrint function slutar

    // Click funktion till player objektet för omladdning
    document.querySelector('#raptor').addEventListener('click', player.ammo);


    // calc function börjar som räknar in skärmens bredd/höjd samt raptor bilden och hur mycket yta som finns kvar
    function calc() {

        // Lägger in browserns height och width i en variabel
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;

        // Lägger bildens höjd och bredd i en variabel
        imgRaptor = document.querySelector('#raptor');
        raptorHeight = imgRaptor.clientHeight;
        raptorWidth = imgRaptor.clientWidth;

        // Uträkning på hur mycket fri yta det finns kvar på browsern
        spaceLeftHeight = screenHeight - raptorHeight;
        spaceLeftWidth = screenWidth - raptorWidth;

        var randomHeight = Math.round(Math.random() * spaceLeftHeight);
        var randomWidth = Math.round(Math.random() * spaceLeftWidth);

        // Lägger det slumpade pixel numret mellan upp ner och left right eftersom bilden är fixed
        imgRaptor.style.top = randomHeight + 'px';
        imgRaptor.style.left = randomWidth + 'px';
    }
    // bulletPrint function slutar

    // uträkning för utrymme som raptorn kan röra sig i
    document.querySelector('#raptor').addEventListener('click', calc);


    // Beräknar missade skott
    function calcMiss() {
        return shots - scoreCounter;
    }


    // imgMoving function börjar Uträkning för var bilden ska hamna på browsern
    function imgMoving() {
        // Resetar tiden för varje klick på raptorn
        secondsCountDown = 3;
        secondText.innerText = secondsCountDown;

        // Dessa if satser byter bakgrund efter ett visst antal poäng
        if (scoreCounter >= 4 && scoreCounter < 10) {
            secondsCountDown = 2;
            secondText.innerText = secondsCountDown;

            document.querySelector('#background2').style.display = 'block';

        }

        if (scoreCounter >= 9 && scoreCounter < 15) {
            secondsCountDown = 2;
            secondText.innerText = secondsCountDown;
            document.querySelector('#background3').style.display = 'block';
        }

        if (scoreCounter >= 14 && scoreCounter < 20) {
            secondsCountDown = 2;
            secondText.innerText = secondsCountDown;
            document.querySelector('#background4').style.display = 'block';
        }

        if (scoreCounter >= 19 && scoreCounter < 25) {
            secondsCountDown = 2;
            secondText.innerText = secondsCountDown;
            document.querySelector('#background5').style.display = 'block';
        }
    }
    // bulletPrint function slutar

    // Event som kallar på en rörelse function för raptorn
    document.querySelector('#raptor').addEventListener('click', imgMoving);



    // Visar scoren i browsern
    points = document.querySelector('#score');
    points.textContent = 'Score: 0 / 25';

    // scoreFunc function börjar - för varje klick på raptorn ökar poängen och skrivs ut på nytt i browsern
    function scoreFunc() {
        scoreCounter++
        points.textContent = 'Score: ' + scoreCounter + ' / 25';

        // vid 25 klicks
        if (scoreCounter === 1) {
            alert('Congratulation you won by reaching 25 points! Your score was ' + scoreCounter + ' and you shot ' + shots + ' bullets and missed the target ' + calcMiss() + ' times.');
            clearInterval(cancel);
            document.querySelector('#raptor').removeEventListener('click', imgMoving);
            //document.querySelector('#raptor').removeEventListener('click', window.onclick);
            document.querySelector('#raptor').removeEventListener('click', scoreFunc);


            // Vid vinst visas vinstsidan upp. tar fram bakgrund, text och knappar
            var wonBackground = document.querySelector('#background8');
            wonBackground.style.display = 'block';
            wonBackground.style.zIndex = '7';

            var wonText = document.querySelector('#wonText');

            wonText.style.fontSize = '100px';
            wonText.style.color = 'white';
            wonText.style.textTransform = 'uppercase';
            wonText.style.marginLeft = '40.5%';
            //wonText.style.marginTop = '15%';
            wonText.style.zIndex = '7';

            wonBackground.appendChild(wonText);

            buttonPlay.style.display = 'block';
            buttonPlay.style.zIndex = '7';
            buttonPlay.style.position = 'absolute';
            buttonPlay.style.marginLeft = '37%';
            // buttonPlay.style.marginTop = '25%';
            wonBackground.appendChild(buttonPlay);

            buttonQuit.style.display = 'block';
            buttonQuit.style.zIndex = '7';
            buttonQuit.style.position = 'absolute';
            buttonQuit.style.marginLeft = '48%';
            // buttonQuit.style.marginTop = '25%';
            wonBackground.appendChild(buttonQuit);

            // Go to next game
            nextGame = document.querySelector('.nextGame');
            nextGame.style.display = 'block';
            nextGame.style.zIndex = '7';
            nextGame.style.position = 'absolute';
            nextGame.style.marginLeft = '59%';
            // buttonQuit.style.marginTop = '25%';
            wonBackground.appendChild(nextGame);


            //Applause vid vinst
            var applauseSound = new Audio('applause.mp3');
            // tortureSound.play();

            var applausePromise = applauseSound.play()

            if (applausePromise !== null) {
                applausePromise.catch(() => { /* discard runtime error */ })
            }
        }
    }
    // scoreFunc function slutar

    // Click event som kallar på score funktionen
    document.querySelector('#raptor').addEventListener('click', scoreFunc);




    //  lifeFunc function börjar - Function for life countdown
    lifeFunc = function playerLifeFunc() {
        life.textContent = 'Life: ' + player.playerLife;
    }
    // lifeFunc function slutar

    // Life text på browsern
    var life = document.querySelector('#life');
    document.querySelector('#life').style.fontSize = '50px';
    document.querySelector('#life').style.color = 'white';

    life.textContent = 'Life: ' + player.playerLife;




    // Ligger ute för att visa texten på browsern från början när sidan laddas
    var secondText = document.querySelector('#second-Counter');

    // decrementSeconds function börjar - Life countdown
    function decrementSeconds() {
        // Räknar ner per sekund och stylar texten
        secondsCountDown -= 1;
        document.querySelector('#second-Counter').style.fontSize = '50px';
        document.querySelector('#second-Counter').style.color = 'yellow';
        secondText.innerText = secondsCountDown;

        // Om sekunder är 0 eller mindre än 0 dras ett liv,
        if (secondsCountDown === 0 || secondsCountDown < 0) {

            player.playerLife--;

            if (player.playerLife <= 2) {
                document.querySelector('#life').style.color = 'red';
            }

            // Kallar på lifeFunc som har koll på livet
            lifeFunc();
            secondsCountDown = 4; // sekunder som återställs efter att sekunderna har varit nere på 0

        }

        // Game over - Tar fram ny bakgrundsbild med knappar och styling + ljud
        if (player.playerLife === 0) {
            alert('Your score was ' + scoreCounter + ', you shot ' + shots + ' bullets and missed the target ' + calcMiss() + ' times and had ' + player.playerLife + ' left.');
            clearInterval(cancel);
            document.querySelector('#background6').style.display = 'block';

            document.querySelector('#background6').style.zIndex = '4';
            document.querySelector('.playAgainYes').style.display = 'block';
            document.querySelector('.playAgainNo').style.display = 'block';

            document.querySelector('#bonusButton').style.display = 'block';
            document.querySelector('#bonusButton').style.marginLeft = '';


            var tortureSound = new Audio('torture.mp3');
            var playPromise = tortureSound.play()

            if (playPromise !== null) {
                playPromise.catch(() => { /* discard runtime error */ })
            }

            // Pushar in spelarens namn från en 2d array och poäng in i en vanlig array
            playerScore = scoreCounter;
            highScore.push(random2dArray[0] + ': ' + playerScore);
            console.log(highScore[0]);
            return;
        }
    }
    // decrementSeconds function slutar

    // 1 sekunds intervall i beräkning sek neråt
    var cancel = setInterval(decrementSeconds, 1000);


};

// refreshar sidan om man väljer play igen
function playAgain() {
    location.reload();
}

// functionen kallas på om man väljert quit
function exitGame() {
    //  Vid förlust, tar bort knapparna och visar en annan bakgrund
    document.querySelector('#background8').style.display = 'none';

    document.querySelector('#background6').style.display = 'none';
    document.querySelector('.playAgainYes').style.display = 'none';
    document.querySelector('.playAgainNo').style.display = 'none';

    document.querySelector('#background7').style.display = 'block';
    document.querySelector('#background7').style.zIndex = '5';

    var bloodSound = new Audio('Blood-Splatter.mp3');
    // tortureSound.play();

    // Spelar upp ljud vid game over
    var bloodPromise = bloodSound.play()

    if (bloodPromise !== null) {
        bloodPromise.catch(() => { /* discard runtime error */ })
    }
}


// BONUS IF YOU LOSE
// Extra spel vid förlust
function loserBonus() {
    var quizScoreArray = []; // collect the quizscore
    var quizScore = 0;
    var questions = 0; // questions for the while loop to work

    while (questions != 3) {
        alert('Welcome to the CHASED quiz, you just lost but don\'t worry, here is an easier game for you. You will get a couple of questions, each question will get you 1 point, good luck.');
        answer1 = prompt('Question 1, How many characters were you able to choose from in the beginning of this game?');

        switch (answer1) {
            case '2':
                alert('Correct, the answer was 2.')

                quizScore++;
                quizScoreArray.push(quizScore);
                questions++;
                break;
            default:
                alert('Incorrect, the answer was 2.')
                questions++;
        }

        answer2 = prompt('Question 2, How many points do you need to finish this game?');
        switch (answer2) {
            case '25':
                alert('Correct, the answer was 25.')
                quizScore++;
                quizScoreArray.push(quizScore);
                questions++;
                break;
            default:
                alert('Incorrect, the answer was 25.')
                questions++;
        }

        answer3 = prompt('Question 3, how many lifes did you start with?');
        switch (answer3) {
            case '5':
                alert('Correct, the answer was 5.')
                quizScore++;
                quizScoreArray.push(quizScore);
                questions++;
                break;

            default:
                alert('Incorrect, the answer was 5');
                questions++;
        }

        alert('You score: ' + quizScore + '/3');

        quizScoreArray.forEach(element => { // loopar genom min quizScoreArray
            console.log(element); // skriver ut antal frågor i consolen
        });


    }
}

function nextGameFunc() {
    location.href = "../jonas";

}
