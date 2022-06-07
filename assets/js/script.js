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
var highscoreButton = document.querySelector("#highscoresBtn");
var backButton = document.querySelector("#backBtn");
var userInitialsSpan = document.querySelector("#userDet");

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0
var timeLeft = 75;
let availableQuestions = []
var scorePoints = 20;
var maxQuestions = 4;

// Questions and Answers are stored within an array that we pull from later.
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
// Function that puts the user's initials onto the highscores page.
function renderUserScore(){
    var userInitials = localStorage.getItem("initials");
    userInitialsSpan.textContent = userInitials;
}

// Function that starts the quiz, and resets the score and question index back to 0. Stores the questions array into the availableQuestions array.
function startQuiz(){
    questionCount = 0
    score = 0
    availableQuestions = [...questions]
    newQuestion()
}

// Function that generates a new question randomly. When there are no more questions to ask, hide question screen and display end screen.
function newQuestion(){
    if(availableQuestions.length === 0 || questionCount > maxQuestions){
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
    choice.addEventListener('click', function(event) {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        var selectedChoice = event.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct'){
            increaseScore();
            console.log(10 + score);
            
        } 
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            newQuestion()
        }, 1000)
    })
})

function increaseScore(){
    var score = (localStorage.getItem('recentScore', score));
    localStorage.setItem('recentScore', score + scorePoints);
    
}

// Functions for buttons that change between screens.
function showHome(){
    document.querySelector("#startContainer").style.display = "flex";
};

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

function showHigh(){
    document.querySelector(".highscore").style.display = "flex";
    
}

function hideHigh(){
    document.querySelector(".highscore").style.display = "none";
}


// Function that starts the timer. If the timer runs out, hide question page and display end screen.
function countdown(){
    
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
    } else if (availableQuestions.length === 0){
        timerEl.textContent = '';
        clearInterval(timeInterval);
    } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        hideAnswer();
        showEnd()
    } 
}, 1000);
}

// Stores the user's initials in local storage. If the user does not input anything, they are prompted to do so.
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    var initials = document.querySelector("#initials").value;
    
  
    if (initials === "") {
      alert("Initials cannot be left blank.");
    } 
      localStorage.setItem("initials", initials);
      hideEnd();
      showHigh();
      
    renderUserScore();
    }
  );

// Function that shows highscores page
highscoreButton.addEventListener("click", function(event){
    event.preventDefault();
    showHigh();
    hideHome();
})

// Function that takes the user back to the home screen when the back button is clicked.
backButton.addEventListener("click", function(event){
event.preventDefault();
hideHigh();
showHome();
})



// Function that starts the quiz; timer starts, home screen hidden & question screen shown.
startEl.addEventListener("click", function() {
    console.log("this works");
    hideHome();
    showAnswer();
    countdown();
});

  startQuiz();



