/* ============================================================
   maths.js
   Powers the free-practice arithmetic page: pick an operation
   and a level, then answer auto-generated sums one at a time.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    operation: "add",     // add | sub | mul | div
    level: 1,             // 1, 2, 3
    current: null,        // { a, b, answer }
    correctCount: 0,
    answeredCount: 0,
    streak: 0
  };

  const sumEl = document.querySelector("[data-sum]");
  const inputEl = document.querySelector("[data-answer-input]");
  const feedbackEl = document.querySelector("[data-feedback]");
  const checkBtn = document.querySelector("[data-check-btn]");
  const nextBtn = document.querySelector("[data-next-btn]");
  const scoreEl = document.querySelector("[data-score]");
  const streakEl = document.querySelector("[data-streak]");
  const opButtons = document.querySelectorAll("[data-op]");
  const levelButtons = document.querySelectorAll("[data-level]");

  const ranges = {
    1: { max: 10 },
    2: { max: 25 },
    3: { max: 100 }
  };

  function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function generateProblem() {
    const { max } = ranges[state.level];
    let a, b, answer, symbol;

    switch (state.operation) {
      case "add":
        a = randInt(max); b = randInt(max);
        answer = a + b; symbol = "+";
        break;
      case "sub":
        a = randInt(max); b = randInt(max);
        if (b > a) [a, b] = [b, a]; // keep result non-negative
        answer = a - b; symbol = "−";
        break;
      case "mul": {
        const mulMax = state.level === 1 ? 5 : state.level === 2 ? 10 : 12;
        a = randInt(mulMax); b = randInt(mulMax);
        answer = a * b; symbol = "×";
        break;
      }
      case "div": {
        const divMax = state.level === 1 ? 5 : state.level === 2 ? 10 : 12;
        b = randInt(divMax) || 1;
        answer = randInt(divMax);
        a = b * answer; symbol = "÷";
        break;
      }
    }

    state.current = { a, b, answer, symbol };
  }

  function renderProblem() {
    generateProblem();
    const { a, b, symbol } = state.current;
    sumEl.textContent = `${a} ${symbol} ${b} = ?`;
    inputEl.value = "";
    inputEl.focus();
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    checkBtn.hidden = false;
    nextBtn.hidden = true;
  }

  function updateStats() {
    scoreEl.textContent = `${state.correctCount} / ${state.answeredCount}`;
    streakEl.textContent = state.streak;
  }

  function checkAnswer() {
    const given = parseInt(inputEl.value, 10);
    if (Number.isNaN(given)) {
      feedbackEl.textContent = "Ek number likho pehle! 🙂";
      feedbackEl.className = "feedback";
      return;
    }

    state.answeredCount++;

    if (given === state.current.answer) {
      state.correctCount++;
      state.streak++;
      Storage.recordMathsStreak(state.streak);
      Sound.play("correct");
      feedbackEl.textContent = "Sahi jawaab! Shabaash! 🎉";
      feedbackEl.className = "feedback correct";
      if (state.streak > 0 && state.streak % 5 === 0) {
        Storage.addStars(1);
      }
    } else {
      state.streak = 0;
      Sound.play("wrong");
      feedbackEl.textContent = `Thoda sa galat. Sahi jawaab tha ${state.current.answer}.`;
      feedbackEl.className = "feedback wrong";
    }

    updateStats();
    checkBtn.hidden = true;
    nextBtn.hidden = false;
    nextBtn.focus();

    Storage.recordMathsSession({
      operation: state.operation,
      level: state.level,
      correct: given === state.current.answer ? 1 : 0,
      total: 1
    });
  }

  opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      opButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.operation = btn.dataset.op;
      renderProblem();
    });
  });

  levelButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      levelButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.level = parseInt(btn.dataset.level, 10);
      renderProblem();
    });
  });

  checkBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", renderProblem);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (!checkBtn.hidden) checkAnswer();
      else renderProblem();
    }
  });

  renderProblem();
  updateStats();
});
