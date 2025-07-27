//? quiz app ---------------------------------------------------------------------->

// let's create quiz question ------------------------------------->
const questions = [
    {
        question: 'What will the "console.log(typeof null)" code output?',
        answers: [
            {ans: 'null', correct: false},
            {ans: 'object', correct: true},
            {ans: 'undefined', correct: false},
            {ans: 'number', correct: false}
        ]
    },
    {
        question: 'Which method is used to convert a JSON string into a JavaScript object?',
        answers: [
            {ans: 'JSON.parse()', correct: true},
            {ans: 'JSON.stringify()', correct: false},
            {ans: 'JSON.convert()', correct: false},
            {ans: 'JSON.toObject()', correct: false}
        ]
    },
    {
        question: 'What does the "let" keyword do in JavaScript?',
        answers: [
            {ans: 'Declares a variable with global scope', correct: false},
            {ans: 'Declares a block-scoped variable', correct: true},
            {ans: 'Declares a constant variable', correct: false},
            {ans: 'Declares a function', correct: false}
        ]
    },
    {
        question: 'What will the "Boolean(0)" code return?',
        answers: [
            {ans: 'true', correct: false},
            {ans: 'false', correct: true},
            {ans: '0', correct: false},
            {ans: 'undefined', correct: false}
        ]
    }
];

// let's access dom element --------------------------------------->
const questionText = document.getElementById('question');
const answerContainer = document.getElementById('answer-box');
const nextBtn = document.getElementById('next-btn');

// score and current question ------------------------------------->
let currQuesIndex = 0;
let score = 0;

// event listener ------------------------------------------------->
nextBtn.addEventListener('click', () => {
    if (currQuesIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    };
});

// create modular function ---------------------------------------->
function startQuiz() {
    currQuesIndex = 0;
    score = 0;
    showQuestion();
};

function showQuestion() {
    resetState();

    let currQues = questions[currQuesIndex];
    let quesNo = currQuesIndex + 1;
    questionText.innerHTML = `${quesNo}. ${currQues?.question}`;

    currQues.answers.forEach((answer) => {

        let createDivEle = document.createElement('div');
        let createParaEle = document.createElement('p');
    
        createDivEle.classList.add(`w-full`, `py-4`, `pl-4`, `rounded-md`, `bg-gray-100`, `border-[2px]`, `border-gray-100`, `cursor-pointer`, `select-none`, `transition-all`, `ease-in`, `duration-75`, `hover:bg-purple-500/10`, `hover:border-purple-500/30`);
        createParaEle.classList.add(`text-[16px]`, `font-medium`, `text-slate-900`, `pointer-events-none`);
        createParaEle.innerHTML = answer?.ans;

        createDivEle.appendChild(createParaEle);
        answerContainer.appendChild(createDivEle);

        if (answer?.correct) {
            createDivEle.dataset.correct = answer?.correct;
        };

        createDivEle.addEventListener('click', selectAnswer);
    });
};

function resetState() {
    nextBtn.disabled = true;
    while(answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    };
};

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrectAnswer = selectedBtn.dataset.correct === 'true';

    if (isCorrectAnswer) {
        selectedBtn.classList.remove(`transition-all`, `ease-in`, `duration-75`, `hover:bg-purple-500/10`, `hover:border-purple-500/30`)
        selectedBtn.classList.add(`bg-green-500/10`, `border-green-500/30`);
        score++;
    } else {
        selectedBtn.classList.remove(`transition-all`, `ease-in`, `duration-75`, `hover:bg-purple-500/10`, `hover:border-purple-500/30`)
        selectedBtn.classList.add(`bg-red-500/10`, `border-red-500/30`);
    };

    Array.from(answerContainer.children).forEach((ansBtn) => {
        if (ansBtn.dataset.correct === 'true') {
            ansBtn.classList.remove(`transition-all`, `ease-in`, `duration-75`, `hover:bg-purple-500/10`, `hover:border-purple-500/30`)
            ansBtn.classList.add(`bg-green-500/10`, `border-green-500/30`);
        };
        ansBtn.classList.remove(`cursor-pointer`, `hover:bg-purple-500/10`, `hover:border-purple-500/30`);
        ansBtn.classList.add(`cursor-no-drop`);
    });

    nextBtn.disabled = false;
};

function showScore() {
    resetState();
    questionText.textContent = `Your score is ${score} out of ${questions.length}!`;
    nextBtn.textContent = 'Play Again';
    nextBtn.disabled = false;
};

function nextQuestion() {
    currQuesIndex++;
    if (currQuesIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    };
};

// function call here ---------------------------------------------->
startQuiz();