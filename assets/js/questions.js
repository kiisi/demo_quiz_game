class Question {
    constructor(question, question_option, question_answer) {
        this.question = question
        this.question_option = question_option
        this.question_answer = question_answer
    }
}

export default class Questions {
    #question_number
    #question_store

    constructor() {
        this.#question_number = 0
        this.#question_store = [
            new Question("A very useful tool used during development and debugging for printing of content to the debugger is:", ["Javascript", "terminal/bash", "for loops", "console.log"], "console.log"),
            new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
            new Question("The condition in an if else statement is enclosed with _____________ .", ["quotes", "curly brackets", "parenthesis", "square brackets"], "parenthesis"),
            new Question("Arrays in Javascript can be used to store ____________ .", ["numbers and strings", "other arrays", "booleans", "all of the above"], "all of the above"),
            new Question("String values must be enclosed within ________ when been assigned to variables", ["commas", "curly brackets", "quotes", "parenthesis"], "quotes"),
        ]
    }

    questionValid = () => {
        if (this.#question_number < this.#question_store.length) {
            return true
        }
        return false
    }

    nextQuestion() {
        return this.#question_number++
    }

    getQuestion() {
        return this.#question_store[this.#question_number].question;
    }
    getQuestionOptions() {
        return this.#question_store[this.#question_number].question_option
    }
    getQuestionAnswer() {
        return this.#question_store[this.#question_number].question_answer
    }

}
