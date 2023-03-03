import Questions from './questions.js'

const startbtn = document.querySelector("#start")
const startscreen = document.querySelector("#start-screen")
let questions = document.querySelector("#questions")
let time = document.querySelector("#time")
const feedback = document.querySelector("#feedback")
const endscreen = document.querySelector("#end-screen")

startbtn.addEventListener("click", () => {
    startscreen.classList.add("hide")
    questions.classList.remove("hide")
    feedback.classList.remove("hide")

    QuizBegin()
})

const questionTitle = document.querySelector("#question-title")
const choices = document.querySelector("#choices")

const finalscore = document.querySelector("#final-score")
const initials = document.querySelector("#initials")
const submit = document.querySelector("#submit")

function QuizBegin() {

    let timeCount = 60
    let score = 0

    function timeIntervalFunc() {
        time.textContent = timeCount
        if (timeCount > 0) {
            timeCount--
        } else {
            // End Quiz Game if time is finished
            QuizEnded()
            clearInterval(timeInterval)
        }
    }

    const timeInterval = setInterval(timeIntervalFunc, 1000)

    const clearIntervalFunc = () =>{
        clearInterval(timeInterval)
    }

    const _questions = new Questions()

    questionTitle.innerHTML = _questions.getQuestion()
    _questions.getQuestionOptions().forEach((choice, index) => {
        choices.innerHTML += `<button data-choice="${choice}">${index + 1}. ${choice}</button>`
    })

    choices.addEventListener("click", (e) => {
        if (e.target.dataset.choice) {
            if (e.target.dataset.choice === _questions.getQuestionAnswer()) {
                //Plays audio for correct answer chosen
                let audio = new Audio()
                audio.src = "correct.wav"
                audio.play()
                //Adds 20 to the score for correct answer chosen
                score += 20
                feedback.innerHTML = `<div class="success-color">Correct!</div>`
            } else {
                // deducts 10 secs from time
                timeCount -= 10
                //Plays audio for incorrect answer chosen
                let audio = new Audio()
                audio.src = "incorrect.wav"
                audio.play()
                feedback.innerHTML = `<div class="error-color">Wrong!</div>`
            }
            _questions.nextQuestion()
            updateQuiz()
        }
    })

    // Updates Quiz UI when Quiz is in progress
    function updateQuiz() {
        if (_questions.questionValid()) {
            questionTitle.innerHTML = _questions.getQuestion()
            document.querySelectorAll("#choices button").forEach((btn, index) => {
                btn.dataset.choice = _questions.getQuestionOptions()[index]
                btn.textContent = `${index + 1}. ${_questions.getQuestionOptions()[index]}`
            })
        }else{
            questions.classList.add("hide")
            endscreen.classList.remove("hide")

            QuizEnded()
            // Display final score
            finalscore.textContent = score
        }

    }

    function QuizEnded(){
        // clear timer when quiz ends
        clearIntervalFunc()
        // reset time to default, 0
        document.querySelector("#time").textContent = '0'
        questions.classList.add("hide")
        endscreen.classList.remove("hide")

        // Display final score
        finalscore.textContent = score
        
        submit.addEventListener("click", ()=>{
            
            // Quiz ended: get and save user initials 
            let user_initials = {
                name: initials.value,
                score: score
            }

            let user = localStorage.getItem("user_initials")
            if(user){
                let userParsed = JSON.parse(user)
                userParsed.push(user_initials)
                localStorage.setItem("user_initials", JSON.stringify(userParsed))
            }else{
                localStorage.setItem("user_initials", JSON.stringify([user_initials]))
            }
            // Go to highscores page
            window.location.href="highscores.html";
        })
    }


}