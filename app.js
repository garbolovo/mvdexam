

let domQuestion = document.querySelector('#for-question');
let domAnswers = document.querySelector('#list-answers');
let startBtn = document.querySelector('#start-btn');
let giveUpBtn = document.querySelector('#giveup-btn');



// results dom elements
let result = document.getElementById('result'); // total result div
let totalNumsQuizeQuestionsEl = document.querySelector('#total-nums-quize-questions'); //1
let currentNumsUserAnswersEl = document.querySelector('#current-nums-user-answers'); //2
let questionNumAtTheMomentEl = document.querySelector('#question-num-at-the-moment'); //3
let currentMistakesNumsEl = document.querySelector('#current-mistakes-nums'); //4

let list = document.querySelector('#list');
let listOls = document.querySelectorAll('#list>ol');


let currentQuestion = 0;

// ===================== //
// DOM type of QUIZE
let pravo = document.querySelector('.container #quizes #pravo');
let police = document.querySelector('.container #quizes #police');
let sluzba = document.querySelector('.container #quizes #sluzba');
let npa = document.querySelector('.container #quizes #npa');
let ognev = document.querySelector('.container #quizes #ognev');

pravo.addEventListener('click', funPravo);
police.addEventListener('click', funPolice)
sluzba.addEventListener('click', funSluzba)
npa.addEventListener('click', funNpa)
ognev.addEventListener('click', funOgnev)



//===================================
// bindings from pravo.js (vars for all data)
let userAnswers = [];
let wrongAnswers = [];
let mistakesCounter = 0;
// ==================================

// totalNumsQuizeQuestionsEl.textContent = questions.length;
// totalNumsQuizeQuestionsEl.textContent = quizLenght(questions);

currentNumsUserAnswersEl.textContent = userAnswers.filter( answer => answer).length;
questionNumAtTheMomentEl.textContent = currentQuestion;
currentMistakesNumsEl.textContent = 0;




// ========================================================== //


// // generator 1 definition (for question)
// function* QuestionGenerator() {
//   for(let i = 0; i < questions.length; i++) {
//     currentQuestion = i + 1;
//     yield questions[i][`question${i + 1}`];
//   }
// }

// // iterator 1 definition
// const questionIterator = QuestionGenerator();

// // generator 2 definition (for CHOICES)
// function* ChoicesGenerator() {
//   for(let i = 0; i < questions.length; i++) {
//     let values = Object.keys(questions[i]).map(key => questions[i][key]);
//     values.shift();
//     yield values;
//   }
// }

// // iterator 2 definition
// const choiceIterator = ChoicesGenerator();

// // MAIN GENERATOR   
// startBtn.addEventListener('click', function() {

//   if (userAnswers.filter( answer => answer).length === currentQuestion) {
//     startBtn.textContent = 'NEXT QUESTION';
//     startBtn.style.color = '#555';

//     // question
//     let qs = questionIterator.next();
//     if (qs.done) {
//       console.log('No more questions');
//     }
//     domQuestion.setAttribute("style","display:block");
//     domQuestion.textContent = qs.value;
//     questionNumAtTheMomentEl.textContent = currentQuestion;

//     // answers  (choices)
//     domAnswers.innerHTML = '';
//     let ans = choiceIterator.next();

//     for (let i = 0; i < ans.value.length; i++) {
//       // lis created
//       let lis = document.createElement('li');
//       domAnswers.appendChild(lis);
//       lis.textContent = ans.value[i];

//       // lis colors change
//       lis.addEventListener('mouseenter', function () {
//         lis.style = 'background-color: #fcfcfc; border: khaki solid 1px';
//       });

//       lis.addEventListener('mouseleave', function () {
//         lis.style = 'background-color: #ffffff; border: solid 0px';
//       });
//       // ====================================

//       // choosing an answer
//       lis.addEventListener('click', function () {

//         console.log(i);

//         // button normal state
//         startBtn.textContent = 'NEXT QUESTION';
//         startBtn.style.color = '#555';
//         startBtn.style.border = '1px solid #bbb';
//         // startBtn.style.fontWeight = 'normal';

//         lis.style = 'background-color: #fff; border: blue solid 1px';
       
//         // ?
//         userAnswers[currentQuestion] = i + 1;
        
//         // обновление счетчика текущего вопроса
//         currentNumsUserAnswersEl.textContent = userAnswers.filter( answer => answer).length;
//       })


//       wrongAnswers = []; // Wrong Answers Nums
//       wrongQuestionsName = []; // Wrong Questions NAME
//       wrongQuestions = []; // Wrong Questions OBJ


//       userAnswers.filter(answer => answer).forEach((a, i) => {
//         if(a !== correctAnswers[i]) {
//           wrongAnswers.push(i); // wrong answers NUMs array building
//           wrongQuestions.push(questions[i]); // wrongQuestions building
//         }
//       });
      
//       currentMistakesNumsEl.textContent = wrongAnswers.length;
      
//     }

//     gettingList(wrongQuestions, list)


    

//   } else {
//     // button warning
//     startBtn.textContent = 'ANSWER THE QUESTION';
//     startBtn.style = 'color:#555; border: 1px solid red;';

//   }

// });



