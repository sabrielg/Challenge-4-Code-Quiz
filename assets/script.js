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
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else if (timeLeft < 1) {
          alert("you've run out of time!")
          clearInterval(timeInterval);
          return
      }
    //   else {
    //     // Once `timeLeft` gets to 0, set `timerEl` to an empty string
    //     timerEl.textContent = '';
    //     // Use `clearInterval()` to stop the timer
    //     clearInterval(timeInterval);
    //   }
    }, 1000);
  }

function startQuiz() {
    countDown();
    pushButton.setAttribute("class", "hidden");
    showQuestion();
}


function showQuestion() {
    answerContainer.innerHTML = ""
    if (currentIndex === questions.length) {
    alert("the quiz is finished!"); 
    mainDiv.classList.add("hidden");
    highscoreDiv.classList.remove("hidden");
return }
    
    var currentQuestion = questions[currentIndex]
    questionHeading.textContent = currentQuestion.question;
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var element = currentQuestion.choices[i];
        var button = document.createElement("button");
        button.textContent = element
        button.setAttribute("value", element);
        button.setAttribute("class", "answer-container")
        button.onclick=checkAnswer
        answerContainer.appendChild(button);
        console.log(element);
    }
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

var highscores = []
if(localStorage.getItem("high scores")) {
    highscores = JSON.parse(localStorage.getItem("high scores"))
    for (let i = 0; i < highscores.length; i++) {
        var li = document.createElement("li");
        li.innerText = `${highscores[i].initials}: ${highscores[i].score}`
        list.appendChild(li)
    }
}
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
}); 