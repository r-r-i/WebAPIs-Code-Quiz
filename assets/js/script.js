//  1. user clicks start
//  2. first question is displayed
//  3. timer starts
//  4. user chooses answer, correct or wrong prompt
//  5. final page displays user's score, user inputs intials
//  6. score saved to local storage
//  7. highscores are rendered from local storage to show highscores page.

var startEl = document.getElementById("startBtn");
// var home = document.getElementById("#startContainer");
var timerEl = document.getElementById('countdown');

function hideHome(){
    document.querySelector("#startContainer").style.display = "none";
};

function showAnswer(){
    document.querySelector("#questionContainer").style.display = "flex";

}

function countdown(){
    var timeLeft = 75;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
    } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
    }
}, 1000);
}


startEl.addEventListener("click", function() {
    console.log("this works");
    hideHome();
    showAnswer();
    countdown();
  });



