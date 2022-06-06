//  1. user clicks start
//  2. first question is displayed
//  3. timer starts
//  4. user chooses answer, correct or wrong prompt
//  5. final page displays user's score, user inputs intials
//  6. score saved to local storage
//  7. highscores are rendered from local storage to show highscores page.

var startEl = document.getElementById("startBtn");
var timerEl = document.getElementById('countdown');
var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var submitButton = document.querySelector("#submitBtn");

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0
var timeLeft = 75;
let availableQuestions = []

let questions = [
    {
        question: 'commonly used data types do not include:',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 3,
    },
    {
        question: 'the condition in an if/else statement is enclosed within ___.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parentheses',
        choice4: 'square brackets',
        answer: 3,
    },
    {
        question: 'arrays in javascript can be used to store ___.',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: 'string values must be enclosed within ___ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parentheses',
        answer: 3,
    },
    {
        question: 'a very useful tool used during development and debugging for printing current content to the debugger is:',
        choice1: 'javascript',
        choice2: 'terminal/bash',
        choice3: 'for loops',
        choice4: 'console.log',
        answer: 4,
    },
]

var score_points = 20
var max_questions = 4

function startGame(){
    questionCount = 0
    score = 0
    availableQuestions = [...questions]
    newQuestion()
}

function newQuestion(){
    if(availableQuestions.length === 0 || questionCount > max_questions){
        localStorage.setItem('recentScore', score);
        hideAnswer();
        showEnd();
    }
    questionCount++

    var questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions [questionIndex];
    question.innerHTML = currentQuestion.question
    

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.textContent = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice =>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === true){
            incrementScore(score_points)
        } 
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            newQuestion()
        }, 1000)
    })
})



function hideHome(){
    document.querySelector("#startContainer").style.display = "none";
};

function showAnswer(){
    document.querySelector("#questionContainer").style.display = "flex";

}
function hideAnswer(){
    document.querySelector("#questionContainer").style.display = "none";
}

function showEnd(){
    document.querySelector(".end-container").style.display = "flex";
}

function hideEnd(){
    document.querySelector(".end-container").style.display = "none";
}

// function showHighScores(){
// }

function countdown(){
    
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
        hideAnswer();
        showEnd()
    } 
}, 1000);
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    var initials = document.querySelector("#initials").value;
    
  
    if (initials === "") {
      alert("Initials cannot be left blank.");
    } 
      localStorage.setItem("initials", initials);
    //   renderHighScore();
    }
  );




startEl.addEventListener("click", function() {
    console.log("this works");
    hideHome();
    showAnswer();
    countdown();
  });

  startGame()



