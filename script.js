// GIVEN I am taking a code quiz
// WHEN I click the start button   DONE
// THEN a timer starts and I am presented with a question   DONE
// WHEN I answer a question    DONE
// THEN I am presented with another question    DONE
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0   DONE
// THEN the game is over    DONE
// WHEN the game is over
// THEN I can save my initials and set my score on the board

var quizQuestions = [{
    question: "which is used to style a webpage?",
    choiceA: "html",
    choiceB: "css",
    choiceC: "javascript",
    choiceD: "python",
    answer: "b" },
{
    question: "what does JSON.parse do?",
    choiceA: "turn an object to a string",
    choiceB: "adds a click event",
    choiceC: "turns a string into an object",
    choiceD: "nothing",
    answer: "c" },
{
    question: "what does append do?",
    choiceA: "gives a parent element to an orphan child element",
    choiceB: "nothing",
    choiceC: "creates a new element",
    choiceD: "changes the background color of the page",
    answer: "a" },
{
    question: "which item cannot be stored in an array?",
    choiceA: "string",
    choiceB: "number",
    choiceC: "another array",
    choiceD: "background color",
    answer: "d" },
{
    question: "what does === mean?",
    choiceA: "equal to",
    choiceB: "not equal to",
    choiceC: "sometimes equal to",
    choiceD: "something else",
    answer: "a" },
];


var startButton = document.getElementById("startbtn");
var questionEl = document.getElementById("question");
var quizAnswers = document.getElementById("answer");
var start = document.getElementById("startpage");
var quiz = document.getElementById("Quiz");
var quizTimer = document.getElementById("quiztimer");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var finalScoreEl = document.getElementById("finalscore");
var endQuiz = document.getElementById("end");
var initialsEl = document.getElementById("initials")
var submitBtn = document.getElementById("submit")
var highscoreName = document.getElementById("highscore-name")
var highscoreScore = document.getElementById("highscore-score")
var highscoreEl = document.getElementById("highscore")

var timeLeft = 70;
var timerInterval;
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var score = 0;
var correct;

endQuiz.style.display = "none"
startButton.addEventListener("click", startQuiz)


function startQuiz(){
    start.style.display = "none";
    quiz.style.display = "block";
    endQuiz.style.display = "none";

    generateQuizQuestion();
        // Sets interval in variable
     timerInterval = setInterval(function() {
          timeLeft--;
          quizTimer.textContent = "time remaining " + timeLeft;
      
          if(timeLeft === 0) {
            // clearInterval(timerInterval);
            showScore();
            endQuiz.style.display = "block";
          }
      
        }, 1000);
      }


function generateQuizQuestion(){
    // endQuiz.style.display = "none"
    if(currentQuestionIndex === finalQuestionIndex){
        // console.log(timeLeft)
        clearInterval(timerInterval);
        return showScore()
        }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
}
    
      
function Answer(answer){
    correct = quizQuestions[currentQuestionIndex].answer;
    
    if (answer === correct){
        score++;
        alert("Correct!")
        currentQuestionIndex++;
        generateQuizQuestion();
    }
    else if (answer !== correct){
        timeLeft = timeLeft - 10;
        alert("Incorrect");
        currentQuestionIndex++;
        generateQuizQuestion();
    }
    else {
        showScore()
    }

}

function saveScore() {
    var initials = initialsEl.value.trim();
    if(initials !== " "){
        var highScores = JSON.parse(window.localStorage.getItem("highscores"))|| [];
        var newScore = {
            finalScoreEl: score, 
            initials: initials
        };
        highScores.push(newScore)
        window.localStorage.setItem("highscores", JSON.stringify(highScores))
    };
    console.log(highScores);
};
submitBtn.addEventListener("click", saveScore)

function showScore() {
    quiz.style.display = "none";
    endQuiz.style.display = "block";
    finalScoreEl.innerHTML = "Your Score Is " + score;
    initialsEl.value = "";
    highscoreEl.style.display = "block";
    generateHighscores();
    submitBtn.style.display = "block";
} 

function generateHighscores(){
    highscoreName.innerHTML = "";
    highscoreScore.innerHTML = "";
    var Scores = JSON.parse(localStorage.getItem("highscores")) || [];
    for (i=0; i<Scores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = Scores[i].initials;
        newScoreSpan.textContent = Scores[i].score;
        highscoreName.appendChild(newNameSpan);
        highscoreScore.appendChild(newScoreSpan);
    }
}


function restartQuiz(){
    start.style.display = "flex";
    endQuiz.style.display = "none";
    timeLeft = 70;
    score = 0;
    currentQuestionIndex = 0;
}



//add commas after question and each answer,//
// var quizQuestions = [{
//     question: "which is used to style a webpage?",
//     choiceA: "html",
//     choiceB: "css",
//     choiceC: "javascript",
//     choiceD: "python",
//     answer: "b" },
// {
//     question: "what does JSON.parse do?",
//     choiceA: "turn an object to a string",
//     choiceB: "adds a click event",
//     choiceC: "turns a string into an object",
//     choiceD: "nothing",
//     answer: "c" },
// {
//     question: "what does append do?",
//     choiceA: "gives a parent element to an orphan child element",
//     choiceB: "nothing",
//     choiceC: "creates a new element",
//     choiceD: "changes the background color of the page",
//     answer: "a" },
// {
//     question: "which item cannot be stored in an array?",
//     choiceA: "string",
//     choiceB: "number",
//     choiceC: "another array",
//     choiceD: "background color",
//     answer: "d" },
// {
//     question: "what does === mean?",
//     choiceA: "equal to",
//     choiceB: "not equal to",
//     choiceC: "sometimes equal to",
//     choiceD: "something else",
//     answer: "a" },
// ];



