var timeLeft = 60;
var currentIndex = 0
var startButton = document.querySelector(".start-button")
var pushButton = document.querySelector(".push-button")
var questionHeading = document.querySelector(".question-heading")
var questionContainer = document.querySelector(".question-container")
var answerContainer = document.querySelector(".answer-container")
var timerEl = document.querySelector(".timer")

var questions = [
    {
        question: "question one",
        choices: ["choice one", "choice two", "choice three"],
        answer: "choice one"
    },
    {
        question: "question two",
        choices: ["choice two", "choice three"],
        answer: "choice three"
    },
    {
        question: "question three",
        choices: ["choice three", "choice four"],
        answer: "choice four"
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
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
      }
    }, 1000);
  }

function startQuiz() {
    countDown()
    pushButton.setAttribute("class", "hidden")
    showQuestion()
}


function showQuestion() {
    answerContainer.innerHTML = ""
    var currentQuestion = questions[currentIndex]
    questionHeading.textContent = currentQuestion.question
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var element = currentQuestion.choices[i];
        var button = document.createElement("button")
        button.textContent = element
        button.setAttribute("value", element)
        button.onclick=checkAnswer
        answerContainer.appendChild(button)
        console.log(element)
    }
}

function checkAnswer() {
    console.log(this.value)
    if (this.value === questions[currentIndex].answer){
        console.log("this is correct!")
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

// create a timer of 60 seconds that 
startButton.addEventListener("click", startQuiz);