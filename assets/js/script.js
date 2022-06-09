//  1. user clicks start
//  2. first question is displayed
//  3. timer starts
//  4. user chooses answer, correct or wrong prompt
//  5. final page displays user's score, user inputs intials
//  6. score saved to local storage
//  7. highscores are rendered from local storage to show highscores page.
var startButton = document.getElementById("startBtn");
var submitButton = document.querySelector("#submitBtn");
var clearButton = document.querySelector("#clearBtn");
var backButton = document.querySelector("#backBtn");
var highscoreButton = document.querySelector("#highscoresBtn");
var userInitialsSpan = document.querySelector("#userDet");
var userResultSpan = document.querySelector("#end-result");

var timerEl = document.getElementById('countdown');
var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));

var remainingTime = 75;
var scorePoints = 20;
var qMax = 4;

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0
let availableQuestions = []


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
    var userScore = localStorage.getItem("recentScore");
    userInitialsSpan.textContent = userInitials + " scored " + userScore + " points";
}

// Function that starts the quiz, and resets the score and question index back to 0. Stores the questions array into the availableQuestions array.
function startQuiz(){
    questionCount = 0
    score = 0
    availableQuestions = [...questions]
    newQuestion()
}

// Function that generates questions and displays them on screen.
function newQuestion(){
    if(availableQuestions.length === 0 || questionCount > qMax){ // If there are no more questions to ask, display end screen.
        var userScore = localStorage.getItem("recentScore");
        userResultSpan.textContent = "Your final score is " + userScore;

        remainingTime = 0;
        hideAnswer();
        showEnd();
    }
    
    questionCount++

    // Chooses a random question from the array above and display in html id #question. When a question is answered, it is pushed into the availableQuestions array.
    var questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions [questionIndex];
    question.innerHTML = currentQuestion.question
    
    // For each question, display the possible answers as the text content of the html based on its predefined 'data-number'.
    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.textContent = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

// Determines wether the user has answered correctly or incorrectly.
choices.forEach(choice =>{
    choice.addEventListener('click', function(event) {
        if(!acceptingAnswers) return
        // Recognises wether the user clicks the correct or incorrect answer based on the selectedChoice.dataset where one of them is the answer.
        acceptingAnswers = false;
        var selectedChoice = event.target
        var selectedAnswer = selectedChoice.dataset['number']
        // If correct or wrong, style the button differently. My tutor helped me to incorporate the use of (?) conditional operator.

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === 'correct'){
            increaseScore();
            console.log(10 + scorePoints);
            
        } else if (classToApply === 'incorrect'){
            console.log("this works")
            remainingTime = remainingTime - 10;
        } 
        // Adds a class to the answer the user chose, the classes above can be applied.
        selectedChoice.parentElement.classList.add(classToApply)
        // Sets time between each question, so the user has time to notice wether they answered correctly or incorrectly.
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            newQuestion()
        }, 1000)
    })
})

// function that increases score by 20 & updates to local storage.
function increaseScore(){
    var score = parseInt(localStorage.getItem("recentScore"));
    localStorage.setItem("recentScore", score + scorePoints);
    
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
    if (remainingTime > 1) {
        timerEl.textContent = remainingTime;
        remainingTime--;
    } else if (remainingTime === 1) {
        timerEl.textContent = remainingTime;
        remainingTime--;
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
      return
    } 
      localStorage.setItem("initials", initials);
      hideEnd();
      showHigh();
      
    renderUserScore();
    }
  );

// When the 'clear highscores' button is clicked, text content is set to " ".
  clearButton.addEventListener("click", function(event){
        userInitialsSpan.textContent = "";
  });

// Function that shows highscores page
highscoreButton.addEventListener("click", function(event){
    event.preventDefault();

        showHigh()
        hideHome()
        hideAnswer()
    
})

// Function that takes the user back to the home screen when the back button is clicked.
backButton.addEventListener("click", function(event){
event.preventDefault();
hideHigh();
showHome();
})

// Function that starts the quiz; timer starts, home screen hidden & question screen shown, score in local storage is reset.
startButton.addEventListener("click", function() {
    console.log("this works");
    localStorage.setItem("recentScore", score);
    hideHome();
    showAnswer();
    countdown();
});

  startQuiz();



