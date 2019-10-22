// list of wrong items
function gettingList(items, element, questions, rightAnswers) {
  
  element.innerHTML = '';
  items.forEach(item => { // item - question object
    let itemEntries = Object.entries(item);
    let elem = document.createElement('ol');  //  wrong question answered section
    console.log(elem);
    
    elem.addEventListener('click', (e) => {

      // console.dir(e.target.parentElement.childNodes);

      e.target.parentElement.childNodes.forEach(child => { // iteration for all 'elem' DOM items
          if(child.nodeName === 'LI') {
              child.classList.toggle('hide'); // hide answers
          }
      })
     });

    elem.innerHTML = `<p>${questions.indexOf(item) + 1} - ${item[itemEntries[0][0]]}</p>`;
    // question = question's num (i.e index) - objectName[propertyName] aka user[name]
    // if  let user = {name: 'John'}
    // remember: this are dot notation and brackets notation to look inside an Object

    element.appendChild(elem);
    let itemKeys = Object.keys(item);
    console.log(itemKeys);
    itemKeys.forEach((k, i) => {
        if(i > 0) {
            let liProduct = document.createElement('li');
            liProduct.innerHTML = `${item[k]}`;
            liProduct.classList.add('hide'); // ? optional
            if( i === rightAnswers[questions.indexOf(item)]) { // find correct answer
                liProduct.classList.add('correct'); // light correct answer
            }
            elem.appendChild(liProduct);

        }

        console.log(i, rightAnswers[questions.indexOf(item) + 1]);

    })
  });
}
// getting quiz length (total numbers of questions)
let quizLength = questions => questions.length;

// remove listeners
function removeOurListener() {
  pravo.removeEventListener('click', funPravo);
  police.removeEventListener('click', funPolice);
  sluzba.removeEventListener('click', funSluzba);
  npa.removeEventListener('click', funNpa);
  ognev.removeEventListener('click', funOgnev)

}

// functions topics
const funPravo = (e) => {
    totalNumsQuizeQuestionsEl.textContent = quizLength(questionsPravo);
  // Highliting Topic Button(link)
  // console.log(e.target); 
  // let someVar = e.target;
  // console.dir(someVar)
  startBtn.textContent = 'Начать зачет';
  e.target.style = "background: #33C3F0; color: #fff; padding: 3px 8px; border-radius: 5px";
  appFunc(questionsPravo, correctAnswersPravo);
  removeOurListener();
};

const funPolice = (e) => {
  totalNumsQuizeQuestionsEl.textContent = quizLength(questionsPolice);
  startBtn.textContent = 'Начать зачет';
  e.target.style = "background: #33C3F0; color: #fff; padding: 3px 8px; border-radius: 5px";
  appFunc(questionsPolice, correctAnswersPolice);
  removeOurListener();

};

const funSluzba = (e) => {
  totalNumsQuizeQuestionsEl.textContent = quizLength(questionsSluzba);
  startBtn.textContent = 'Начать зачет';
  e.target.style = "background: #33C3F0; color: #fff; padding: 3px 8px; border-radius: 5px";
  appFunc(questionsSluzba, correctAnswersSluzba);
  removeOurListener();

};

const funNpa = (e) => {
  totalNumsQuizeQuestionsEl.textContent = quizLength(questionsNpa);
  startBtn.textContent = 'Начать зачет';
  e.target.style = "background: #33C3F0; color: #fff; padding: 3px 8px; border-radius: 5px";
  appFunc(questionsNpa, correctAnswersNpa);
  removeOurListener();

};

const funOgnev = (e) => {
  totalNumsQuizeQuestionsEl.textContent = quizLength(questionsOgnev);
  startBtn.textContent = 'Начать зачет';
  e.target.style = "background: #33C3F0; color: #fff; padding: 3px 8px; border-radius: 5px";
  appFunc(questionsOgnev, correctAnswersOgnev);
  removeOurListener();

};

