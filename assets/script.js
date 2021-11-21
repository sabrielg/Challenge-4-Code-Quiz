var timeLeft = 60;
var currentIndex = 0
var startButton = document.querySelector(".start-button");
var pushButton = document.querySelector(".push-button");
var questionHeading = document.querySelector(".question-heading")
var questionContainer = document.querySelector(".question-container")
var answerContainer = document.querySelector(".answer-container")
var timerEl = document.querySelector(".timer")
var highscoreDiv = document.getElementById("highscores")
var list = document.getElementById("list")
var initials = document.getElementById("initials")
var saveButton = document.getElementById("save")
var mainDiv = document.getElementById("main-div")
var userScore = 0
var highscores = []
var timeInterval;

var questions = [
    {
        question: "Chickens lay eggs:",
        choices: ["every day", "weekly", "depends on the time of year"],
        answer: "depends on the time of year"
    },
    {
        question: "Chickens are omnivores",
        choices: ["true", "false"],
        answer: "true"
    },
    {
        question: "Chicken eggs are only brown or white",
        choices: ["true", "false"],
        answer: "false"
    },
    {
        question: "Chickens are:",
        choices: ["friendly", "curious", "silly", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "Chickens do this when they lay an egg:",
        choices: ["sing a song", "hide it", "abandon it"],
        answer: "sing a song"
    }
]

function countDown() {
timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else if (timeLeft === 0) {
          alert("time's up!")
          mainDiv.classList.add('hidden');
          highscoreDiv.classList.remove("hidden")
          clearInterval(timeInterval);
        //   return
        console.log(timeInterval)
      }
      else if (currentIndex === questions.length) {
          return
      }
      else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
      }
    }, 1000);
  }

function startQuiz() {
    countDown();
    pushButton.setAttribute("class", "hidden");
    showQuestion();
}

function showQuestion() {
    answerContainer.innerHTML = "";
    if (timeLeft === 0 || currentIndex === questions.length) {
    alert("the quiz is finished!"); 
    clearInterval(timeInterval)
//    timeLeft = 0;
    mainDiv.classList.add("hidden");
    highscoreDiv.classList.remove("hidden");
    // move these lines to the function
return
    }
    
    var currentQuestion = questions[currentIndex]
    questionHeading.textContent = currentQuestion.question;
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var element = currentQuestion.choices[i];
        var button = document.createElement("button");
        button.textContent = element
        button.setAttribute("value", element);
        button.classList.add("answer-container")
        button.classList.add("answer-choice")
        button.onclick=checkAnswer
        answerContainer.appendChild(button);
        console.log(element);
    };
}

function checkAnswer() {
    console.log(this.value)
    if (this.value === questions[currentIndex].answer){
        console.log("this is correct!");
        userScore ++;
    }
    else {
        console.log("this is incorrect")
        timeLeft -=5
        // subtract time from the clock if answer is incorrect
    }
    currentIndex++
    // check to see if there are more questions. If not have an end quiz function
    showQuestion()

}

startButton.addEventListener("click", startQuiz);


// function endQuiz() {
//     clearInterval(timeInterval);
//     mainDiv.classList.add("hidden");
//     highscoreDiv.classList.remove("hidden");  

//     if(localStorage.getItem("high scores")) {
//         highscores = JSON.parse(localStorage.getItem("high scores"))
//         for (let i = 0; i < highscores.length; i++) {
//             var li = document.createElement("li");
//             li.innerText = `${highscores[i].initials}: ${highscores[i].score}`
//             list.appendChild(li)
//         }
// }


var highscores = []
// write the end quiz function with the below if statement 
if(localStorage.getItem("high scores")) {
    highscores = JSON.parse(localStorage.getItem("high scores"))
    for (let i = 0; i < highscores.length; i++) {
        var li = document.createElement("li");
        li.innerText = `${highscores[i].initials}: ${highscores[i].score}`
        list.appendChild(li)
    }
//     items.sort(function (a, b) {
//         return a.score - b.value;
// }
saveButton.addEventListener("click",function (){
    var object = {
        "initials": initials.value,
        "score": userScore
    }
    highscores.push(object);
    localStorage.setItem("high scores", JSON.stringify(highscores));
    var li = document.createElement("li");
    li.innerText = `${initials.value}: ${userScore}`
    list.appendChild(li)
    initials.value = ""
})};