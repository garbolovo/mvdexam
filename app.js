const elements = {
  question: document.querySelector('#for-question'),
  answers: document.querySelector('#list-answers'),
  startButton: document.querySelector('#start-btn'),
  resetButton: document.querySelector('#giveup-btn'),
  totalQuestions: document.querySelector('#total-nums-quize-questions'),
  answeredQuestions: document.querySelector('#current-nums-user-answers'),
  currentQuestion: document.querySelector('#question-num-at-the-moment'),
  mistakes: document.querySelector('#current-mistakes-nums'),
  mistakesList: document.querySelector('#list'),
  mistakesSection: document.querySelector('#mistakes-section'),
  progress: document.querySelector('#progress-value'),
  progressTrack: document.querySelector('.progress-track'),
  questionLabel: document.querySelector('#question-label'),
  topicLinks: document.querySelectorAll('#quizes a'),
};

const topics = {
  pravo: {
    questions: questionsPravo,
    correctAnswers: correctAnswersPravo,
  },
  police: {
    questions: questionsPolice,
    correctAnswers: correctAnswersPolice,
  },
  sluzba: {
    questions: questionsSluzba,
    correctAnswers: correctAnswersSluzba,
  },
  npa: {
    questions: questionsNpa,
    correctAnswers: correctAnswersNpa,
  },
  ognev: {
    questions: questionsOgnev,
    correctAnswers: correctAnswersOgnev,
  },
};

const state = {
  topicId: null,
  currentIndex: -1,
  pendingAnswer: null,
  answers: [],
};

function getQuestionData(question) {
  const [text, ...answers] = Object.values(question);
  return { text, answers };
}

function getCurrentTopic() {
  return topics[state.topicId];
}

function getMistakes() {
  const topic = getCurrentTopic();

  if (!topic) {
    return [];
  }

  return state.answers.reduce((mistakes, answer, index) => {
    if (answer !== undefined && answer !== topic.correctAnswers[index]) {
      mistakes.push(index);
    }

    return mistakes;
  }, []);
}

function updateStats() {
  const topic = getCurrentTopic();
  const answeredCount = state.answers.filter(answer => answer !== undefined).length;
  const totalQuestions = topic ? topic.questions.length : 0;
  const progress = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  elements.totalQuestions.textContent = totalQuestions;
  elements.answeredQuestions.textContent = answeredCount;
  elements.currentQuestion.textContent = state.currentIndex + 1;
  elements.mistakes.textContent = getMistakes().length;
  elements.progress.style.width = `${progress}%`;
  elements.progressTrack.setAttribute('aria-valuenow', progress);
}

function renderMistakes() {
  const topic = getCurrentTopic();
  const mistakes = getMistakes();
  elements.mistakesList.replaceChildren();
  elements.mistakesSection.hidden = mistakes.length === 0;

  mistakes.forEach(questionIndex => {
    const question = topic.questions[questionIndex];
    const { text, answers } = getQuestionData(question);
    const item = document.createElement('ol');
    const title = document.createElement('button');

    title.type = 'button';
    title.classList.add('mistake-toggle');
    title.textContent = `${questionIndex + 1} - ${text}`;
    title.setAttribute('aria-expanded', 'false');
    title.addEventListener('click', () => {
      const isExpanded = title.getAttribute('aria-expanded') === 'true';
      title.setAttribute('aria-expanded', String(!isExpanded));
      item.querySelectorAll('li').forEach(answer => answer.classList.toggle('hide', isExpanded));
    });
    item.appendChild(title);

    answers.forEach((answer, answerIndex) => {
      const answerItem = document.createElement('li');
      answerItem.textContent = answer;
      answerItem.classList.add('hide');

      if (answerIndex + 1 === topic.correctAnswers[questionIndex]) {
        answerItem.classList.add('correct');
      }

      if (answerIndex + 1 === state.answers[questionIndex]) {
        answerItem.classList.add('user-wrong');
      }

      item.appendChild(answerItem);
    });

    elements.mistakesList.appendChild(item);
  });
}

function selectAnswer(answerIndex) {
  state.pendingAnswer = answerIndex + 1;

  elements.answers.querySelectorAll('li').forEach((answer, index) => {
    answer.classList.toggle('selected-lis', index === answerIndex);
    answer.setAttribute('aria-checked', String(index === answerIndex));
  });

  elements.startButton.textContent = 'Следующий вопрос';
  elements.startButton.classList.remove('quiz-warning');
}

function renderQuestion(index) {
  const topic = getCurrentTopic();
  const { text, answers } = getQuestionData(topic.questions[index]);

  state.currentIndex = index;
  state.pendingAnswer = null;
  elements.questionLabel.textContent = `Вопрос ${index + 1} из ${topic.questions.length}`;
  elements.question.textContent = text;
  elements.question.style.display = 'block';
  elements.answers.replaceChildren();

  answers.forEach((answer, answerIndex) => {
    const answerItem = document.createElement('li');
    answerItem.textContent = answer;
    answerItem.classList.add('answer-option');
    answerItem.setAttribute('role', 'radio');
    answerItem.setAttribute('tabindex', '0');
    answerItem.setAttribute('aria-checked', 'false');
    answerItem.addEventListener('click', () => selectAnswer(answerIndex));
    answerItem.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectAnswer(answerIndex);
      }
    });
    elements.answers.appendChild(answerItem);
  });

  elements.startButton.textContent = 'Ответьте на вопрос';
  elements.startButton.classList.remove('quiz-warning');
  updateStats();
}

function selectTopic(topicId, selectedLink) {
  state.topicId = topicId;
  state.currentIndex = -1;
  state.pendingAnswer = null;
  state.answers = [];

  elements.topicLinks.forEach(link => link.classList.toggle('topic-active', link === selectedLink));
  elements.question.style.display = 'none';
  elements.question.textContent = '';
  elements.answers.replaceChildren();
  elements.mistakesList.replaceChildren();
  elements.mistakesSection.hidden = true;
  elements.questionLabel.textContent = 'Нажмите «Начать зачет»';
  elements.startButton.disabled = false;
  elements.startButton.textContent = 'Начать зачет';
  elements.startButton.classList.remove('quiz-warning');
  updateStats();
}

function handleNextQuestion() {
  const topic = getCurrentTopic();

  if (!topic) {
    return;
  }

  if (state.currentIndex === -1) {
    renderQuestion(0);
    return;
  }

  if (state.pendingAnswer === null) {
    elements.startButton.textContent = 'Ответьте на вопрос';
    elements.startButton.classList.add('quiz-warning');
    return;
  }

  state.answers[state.currentIndex] = state.pendingAnswer;
  updateStats();
  renderMistakes();

  if (state.currentIndex === topic.questions.length - 1) {
    elements.startButton.textContent = 'Зачет завершен';
    elements.startButton.disabled = true;
    return;
  }

  renderQuestion(state.currentIndex + 1);
}

function resetQuiz() {
  state.topicId = null;
  state.currentIndex = -1;
  state.pendingAnswer = null;
  state.answers = [];

  elements.topicLinks.forEach(link => link.classList.remove('topic-active'));
  elements.question.style.display = 'none';
  elements.question.textContent = '';
  elements.answers.replaceChildren();
  elements.mistakesList.replaceChildren();
  elements.mistakesSection.hidden = true;
  elements.questionLabel.textContent = 'Выберите тему, чтобы начать';
  elements.startButton.disabled = true;
  elements.startButton.textContent = 'Выберите тему';
  elements.startButton.classList.remove('quiz-warning');
  updateStats();
}

elements.topicLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    selectTopic(link.parentElement.id, link);
  });
});

elements.startButton.addEventListener('click', handleNextQuestion);
elements.resetButton.addEventListener('click', resetQuiz);

resetQuiz();
