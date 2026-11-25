// 1. Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: "color"
    },
    {
        question: "Which JavaScript method is used to select an HTML element by its ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClass()",
            "document.findElement()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            "<javascript>",
            "<js>",
            "<scripting>",
            "<script>"
        ],
        answer: "<script>"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "//",
            "/* */",
            "<!-- -->",
            "#"
        ],
        answer: "//"
    }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let selectedOption = null;
let shuffledQuestions = [];

// DOM Elements
const quizSection = document.getElementById("quiz-section");
const scoreFooter = document.getElementById("score-footer");
const questionCounter = document.getElementById("question-counter");
const timerDisplay = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackSection = document.getElementById("feedback-section");
const feedbackText = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const finalScoreDisplay = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// 2. shuffleQuestions(): Randomly shuffles the questions array
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. startTimer(): Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Helper function when timer reaches 0
function handleTimeOut() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Disable all options and highlight the right answer
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSection.className = "feedback incorrect-msg";
    feedbackText.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;
    feedbackSection.classList.remove("hidden");

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. displayQuestion(): Displays the current question and answer options
function displayQuestion() {
    // Reset UI state
    selectedOption = null;
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    feedbackSection.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionText.textContent = currentQuestion.question;

    // Create option buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });
}

// Helper function to track user selection before submission
function selectOption(button, option) {
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    selectedOption = option;
    submitBtn.disabled = false;
}

// 5. checkAnswer(): Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    clearInterval(timer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Disable all buttons after submission
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption) {
            btn.classList.add("incorrect");
        }
    });

    // Validate answer and update score
    if (selectedOption === currentQuestion.answer) {
        score++;
        feedbackSection.className = "feedback correct-msg";
        feedbackText.textContent = "Correct! Well done.";
    } else {
        feedbackSection.className = "feedback incorrect-msg";
        feedbackText.textContent = `Incorrect! The correct answer is: ${currentQuestion.answer}`;
    }

    feedbackSection.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 6. nextQuestion(): Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        // End of quiz: display final score in footer
        quizSection.classList.add("hidden");
        scoreFooter.classList.remove("hidden");
        finalScoreDisplay.textContent = `Your Final Score: ${score} / ${shuffledQuestions.length}`;
    }
}

// 7. startQuiz(): Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    scoreFooter.classList.add("hidden");
    quizSection.classList.remove("hidden");

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Event Listeners
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Initialize quiz on page load
startQuiz();