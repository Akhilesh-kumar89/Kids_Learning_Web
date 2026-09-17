/* ============================================================
   quiz.js
   Runs a multiple-choice quiz from the QuestionBank (questions.js)
   and, on completion, stores the result and redirects to
   result.html.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const subjectScreen = document.querySelector("[data-subject-screen]");
  const quizScreen = document.querySelector("[data-quiz-screen]");
  const subjectButtons = document.querySelectorAll("[data-subject]");

  const questionEl = document.querySelector("[data-question]");
  const optionsEl = document.querySelector("[data-options]");
  const progressFill = document.querySelector("[data-progress-fill]");
  const progressLabel = document.querySelector("[data-progress-label]");
  const nextBtn = document.querySelector("[data-quiz-next]");
  const timerFill = document.querySelector("[data-timer-fill]");
  const timerLabel = document.querySelector("[data-timer-label]");

  const TIME_PER_QUESTION = 15; // seconds
  let subject = null;
  let order = [];
  let index = 0;
  let score = 0;
  let answered = false;
  let timeLeft = TIME_PER_QUESTION;
  let timerId = null;

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startQuiz(subjectKey) {
    subject = subjectKey;
    order = shuffle(QuestionBank[subjectKey]).slice(0, 8);
    index = 0;
    score = 0;
    subjectScreen.hidden = true;
    quizScreen.hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    const q = order[index];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => selectAnswer(i, btn));
      optionsEl.appendChild(btn);
    });

    progressFill.style.width = `${(index / order.length) * 100}%`;
    progressLabel.textContent = `Sawaal ${index + 1} / ${order.length}`;
    nextBtn.hidden = true;
    startTimer();
  }

  function startTimer() {
    stopTimer();
    timeLeft = TIME_PER_QUESTION;
    updateTimerUI();
    timerId = setInterval(() => {
      timeLeft--;
      updateTimerUI();
      if (timeLeft <= 0) {
        stopTimer();
        timeUp();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function updateTimerUI() {
    if (!timerFill) return;
    const pct = Math.max(0, (timeLeft / TIME_PER_QUESTION) * 100);
    timerFill.style.width = `${pct}%`;
    timerFill.classList.toggle("low", timeLeft <= 5);
    if (timerLabel) timerLabel.textContent = `${Math.max(0, timeLeft)}s`;
  }

  function timeUp() {
    if (answered) return;
    answered = true;
    const q = order[index];
    const buttons = optionsEl.querySelectorAll(".quiz-option");
    buttons.forEach(b => b.disabled = true);
    buttons[q.answerIndex].classList.add("correct");
    Sound.play("wrong");
    nextBtn.hidden = false;
    nextBtn.focus();
  }

  function selectAnswer(choiceIndex, btnEl) {
    if (answered) return;
    answered = true;
    stopTimer();
    const q = order[index];
    const buttons = optionsEl.querySelectorAll(".quiz-option");
    buttons.forEach(b => b.disabled = true);

    if (choiceIndex === q.answerIndex) {
      score++;
      btnEl.classList.add("correct");
      Sound.play("correct");
    } else {
      btnEl.classList.add("incorrect");
      buttons[q.answerIndex].classList.add("correct");
      Sound.play("wrong");
    }

    nextBtn.hidden = false;
    nextBtn.focus();
  }

  function goNext() {
    index++;
    if (index >= order.length) {
      finishQuiz();
    } else {
      renderQuestion();
    }
  }

  function finishQuiz() {
    stopTimer();
    progressFill.style.width = "100%";
    Storage.recordQuizAttempt({ subject, score, total: order.length });
    if (score === order.length) Storage.addStars(2);
    else if (score >= order.length * 0.6) Storage.addStars(1);

    sessionStorage.setItem("lastQuizResult", JSON.stringify({
      subject, score, total: order.length
    }));
    Sound.play("complete");
    window.location.href = "result.html";
  }

  subjectButtons.forEach(btn => {
    btn.addEventListener("click", () => startQuiz(btn.dataset.subject));
  });

  nextBtn.addEventListener("click", goNext);
});
