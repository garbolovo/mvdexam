function appFunc(questions, correctAnswers) {
  
  // generator 1 definition (for question)
function* QuestionGenerator() {
  for(let i = 0; i < questions.length; i++) {
    currentQuestion = i + 1;
    yield questions[i][`question${i + 1}`];
  }
}

// iterator 1 definition
const questionIterator = QuestionGenerator();

// generator 2 definition (for CHOICES)
function* ChoicesGenerator() {
  for(let i = 0; i < questions.length; i++) {
    let values = Object.keys(questions[i]).map(key => questions[i][key]);
    values.shift();
    yield values;
  }
}

// iterator 2 definition
const choiceIterator = ChoicesGenerator();

// MAIN GENERATOR   
startBtn.addEventListener('click', function() {
  startBtn.textContent = 'Ответьте на вопрос';
  if(userAnswers.length - 1 === questions.length) {
    startBtn.textContent = 'All Questions Answered';
    alert('ALL DONE ! RELOAD THE PAGE (Press F5)');
  }

  

  else if(userAnswers.filter( answer => answer).length === currentQuestion) {
    // startBtn.textContent = 'Следующий вопрос';
    // startBtn.style.color = '#555';

    // question
    let qs = questionIterator.next();
    if(qs.done) {
      console.log('No more questions');
    }
    domQuestion.setAttribute("style","display:block");
    domQuestion.textContent = qs.value;
    questionNumAtTheMomentEl.textContent = currentQuestion;

    // answers  (choices)
    domAnswers.innerHTML = '';
    let ans = choiceIterator.next();

    for (let i = 0; i < ans.value.length; i++) {
      // lis created
      let lis = document.createElement('li');
      domAnswers.appendChild(lis);
      lis.textContent = ans.value[i];

      // lis colors change
      lis.addEventListener('mouseenter', function () {
        lis.style = 'background-color: #fcfcfc; border: khaki solid 1px';
      });

      lis.addEventListener('mouseleave', function () {
        lis.style = 'background-color: #ffffff; border: solid 0px';
      });
      // ====================================

      // choosing an answer
      lis.addEventListener('click', function () {

        console.log(i);

        // button normal state
        startBtn.textContent = 'Следующий вопрос';
        startBtn.style.color = '#fff';
        startBtn.style.background = '#33C3F0';
        // startBtn.style.fontWeight = 'normal';

        lis.style = 'background-color: #fff; border: blue solid 1px';
       
        // ?
        userAnswers[currentQuestion] = i + 1;
        
        // обновление счетчика текущего вопроса
        currentNumsUserAnswersEl.textContent = userAnswers.filter( answer => answer).length;
      });


      wrongAnswers = []; // Wrong Answers Nums
      wrongQuestionsName = []; // Wrong Questions NAME
      wrongQuestions = []; // Wrong Questions OBJ


      userAnswers.filter(answer => answer).forEach((a, i) => {
        if(a !== correctAnswers[i]) {
          wrongAnswers.push(i); // wrong answers NUMs array building
          wrongQuestions.push(questions[i]); // wrongQuestions building
        }
      });
      
      currentMistakesNumsEl.textContent = wrongAnswers.length;
      
    }

    gettingList(wrongQuestions, list, questions, correctAnswers)


    

  } else {
    // button warning
    startBtn.textContent = 'Ответьте на вопрос';
    startBtn.style = 'background: pink; border: none';

  }

});

}

// GiveUp
giveUpBtn.addEventListener('click', function(e) {
  window.location.reload();
})

