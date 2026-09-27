// Practice Engine Logic
let currentQuestionIndex = 0;
let currentFlashcardIndex = 0;
let isFlashcardFlipped = false;
let score = parseInt(localStorage.getItem('pydantic_score')) || 0;
let streak = parseInt(localStorage.getItem('pydantic_streak')) || 0;
let answeredQuestions = new Set(JSON.parse(localStorage.getItem('pydantic_answered') || '[]'));

// DOM Elements
const scoreDisplay = document.getElementById('score-display');
const streakDisplay = document.getElementById('streak-display');
const masteryDisplay = document.getElementById('mastery-display');

const questionCategory = document.getElementById('question-category');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const explanationBox = document.getElementById('explanation-box');
const explanationHeader = document.getElementById('explanation-header');
const explanationText = document.getElementById('explanation-text');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    btn.classList.add('active');
    const tabId = btn.dataset.tab + '-tab';
    document.getElementById(tabId).classList.remove('hidden');
  });
});

// Update Stats UI
function updateStats() {
  scoreDisplay.innerText = score;
  streakDisplay.innerText = `🔥 ${streak}`;
  const masteryPercent = Math.round((answeredQuestions.size / questionBank.length) * 100);
  masteryDisplay.innerText = `${masteryPercent}%`;

  localStorage.setItem('pydantic_score', score);
  localStorage.setItem('pydantic_streak', streak);
  localStorage.setItem('pydantic_answered', JSON.stringify(Array.from(answeredQuestions)));
}

// Load Question
function loadQuestion() {
  const current = questionBank[currentQuestionIndex];
  
  questionCategory.innerText = current.category;
  questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${questionBank.length}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / questionBank.length) * 100}%`;
  questionText.innerText = current.question;

  optionsContainer.innerHTML = '';
  explanationBox.classList.add('hidden');
  nextBtn.classList.add('hidden');

  current.options.forEach((optText, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.innerText = optText;
    button.onclick = () => selectOption(index);
    optionsContainer.appendChild(button);
  });
}

// Option Selection
function selectOption(selectedIndex) {
  const current = questionBank[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll('.option-btn');

  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === current.correct) {
    buttons[selectedIndex].classList.add('correct');
    explanationHeader.innerText = "✅ Correct!";
    explanationBox.className = "explanation-box correct-bg";
    
    if (!answeredQuestions.has(current.id)) {
      score += 10;
      streak += 1;
      answeredQuestions.add(current.id);
    }
  } else {
    buttons[selectedIndex].classList.add('incorrect');
    buttons[current.correct].classList.add('correct');
    explanationHeader.innerText = "❌ Incorrect";
    explanationBox.className = "explanation-box incorrect-bg";
    streak = 0;
  }

  explanationText.innerText = current.explanation;
  explanationBox.classList.remove('hidden');
  nextBtn.classList.remove('hidden');

  updateStats();
}

// Next Button Handler
nextBtn.addEventListener('click', () => {
  currentQuestionIndex = (currentQuestionIndex + 1) % questionBank.length;
  loadQuestion();
});

// Reset Button Handler
resetBtn.addEventListener('click', () => {
  if (confirm("Reset all score and mastery progress?")) {
    score = 0;
    streak = 0;
    answeredQuestions.clear();
    localStorage.clear();
    updateStats();
    currentQuestionIndex = 0;
    loadQuestion();
  }
});

// Flashcard Handler
const flashcard = document.getElementById('flashcard');
const cardTitle = document.getElementById('card-title');
const cardBody = document.getElementById('card-body');
const cardIndicator = document.getElementById('card-indicator');

function loadFlashcard() {
  const card = flashcardBank[currentFlashcardIndex];
  cardTitle.innerText = card.title;
  cardBody.innerHTML = card.body;
  cardIndicator.innerText = `Card ${currentFlashcardIndex + 1} of ${flashcardBank.length}`;
  
  isFlashcardFlipped = false;
  flashcard.querySelector('.flashcard-front').classList.remove('hidden');
  flashcard.querySelector('.flashcard-back').classList.add('hidden');
}

flashcard.addEventListener('click', () => {
  isFlashcardFlipped = !isFlashcardFlipped;
  if (isFlashcardFlipped) {
    flashcard.querySelector('.flashcard-front').classList.add('hidden');
    flashcard.querySelector('.flashcard-back').classList.remove('hidden');
  } else {
    flashcard.querySelector('.flashcard-front').classList.remove('hidden');
    flashcard.querySelector('.flashcard-back').classList.add('hidden');
  }
});

document.getElementById('prev-card').addEventListener('click', () => {
  currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcardBank.length) % flashcardBank.length;
  loadFlashcard();
});

document.getElementById('next-card').addEventListener('click', () => {
  currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcardBank.length;
  loadFlashcard();
});

// Initialize Engine
updateStats();
loadQuestion();
loadFlashcard();
