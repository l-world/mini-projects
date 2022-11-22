/* const submitBtn = document.querySelector('.submit'),
      answerListEl = document.querySelector('.answer-list'),
      questionEl = document.querySelector('.question');

const questionList = [
    {
        title:"Which language runs in a web browser?",
        questions:['Java','JavaScript','Rust','Python'],
        rightAnswer:'JavaScript'
    },
    {
        title:"What does CSS stand for?",
        questions:['Central Style Sheets','Cascading Style Sheets','Cascading Simple Sheets',' Cars SUVs Sailboats'],
        rightAnswer:'Cascading Style Sheets'
    },
    {
        title:"What does HTML stand for?",
        questions:['Hypertext Markup Language','Hypertext Markdown Language','Hypertext Markdown Language','Hypertext Markdown Language'],
        rightAnswer:'Hypertext Markup Language'
    },
    {
        title:"What year was JavaScript launched?",
        questions:['1996','1995','1994','none of the above'],
        rightAnswer:'1995'
    },
]

createQuestion();

let rightAnswer = [],
    index = 0;

submitBtn.addEventListener('click', e =>{
    const answerEls = answerListEl.querySelectorAll('input');
    answerEls.forEach( radio => {
        if(radio.checked){
            if(index > 3){
                rightAmount();
                const reloadBtn = document.querySelector('.reload');
                reloadBtn.addEventListener('click', e =>{
                    answerListEl.style.display = 'block';
                    setTimeout( createQuestion(),5000)
                })
            }else{
                index ++;
                rightAnswer.push(radio.nextElementSibling.innerText);
                createQuestion(questionList[index])
            }
        }
    })
});

function createQuestion(data){
    const finalData = data || questionList[0];
    answerListEl.innerHTML = '';
    questionEl.innerText = finalData.title;
    finalData.questions.forEach( (item,idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="radio" id="answer${idx+1}" name="answer">
            <label for="answer${idx+1}">${item}</label>
        `
        answerListEl.appendChild(li);
    })
}

function rightAmount(){
    let num = 0;
    console.log(rightAnswer);
    rightAnswer.forEach( (item,index) =>{
        if(item == questionList[index].rightAnswer){
            num ++;
        }
    })
    const result = `You answered ${num}/4 questions correctly`;
    questionEl.innerHTML = result;
    answerListEl.style.display = 'none';
    submitBtn.className = 'reload';
    submitBtn.innerText = 'Reload';
}
 */

const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.querySelector('.container')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.querySelector('.question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.querySelector('.submit')

let currentQuizIndex = 0
let score = 0

loadQuiz();
function loadQuiz(){
    resetSelect();
    const currentQuiz = quizData[currentQuizIndex];
    questionEl.innerText = currentQuiz.question
    a_text.innerText = currentQuiz.a
    b_text.innerText = currentQuiz.b
    c_text.innerText = currentQuiz.c
    d_text.innerText = currentQuiz.d
}

function getSeleted(){
    let answer;
    answerEls.forEach( ele => {
        if(ele.checked){
            answer = ele.id
        }
    })
    return answer;
}

function resetSelect(){
    answerEls.forEach( ele => ele.checked = false)
}

submitBtn.addEventListener('click', e => {
    const answer = getSeleted();
    if(answer){
        if(answer === quizData[currentQuizIndex].correct){
            score ++;
        }
        currentQuizIndex ++;
        if(currentQuizIndex < quizData.length){
            loadQuiz();
        }else{
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button class="reload" onclick="location.reload()">Reload</button>
            `
        }
    }
})