/* ============================================================
   progress.js
   Reads saved data from storage.js and renders the progress
   dashboard: stars, maths accuracy, quiz history, game bests.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const data = Storage.get();

  const starsEl = document.querySelector("[data-total-stars]");
  const mathsAccuracyEl = document.querySelector("[data-maths-accuracy]");
  const mathsAnsweredEl = document.querySelector("[data-maths-answered]");
  const mathsStreakEl = document.querySelector("[data-maths-streak]");
  const quizListEl = document.querySelector("[data-quiz-history]");
  const gameListEl = document.querySelector("[data-game-bests]");
  const resetBtn = document.querySelector("[data-reset-progress]");

  function render() {
    const d = Storage.get();

    if (starsEl) starsEl.textContent = d.stars || 0;

    if (mathsAccuracyEl) {
      const acc = d.maths.totalAnswered
        ? Math.round((d.maths.totalCorrect / d.maths.totalAnswered) * 100)
        : 0;
      mathsAccuracyEl.textContent = `${acc}%`;
    }
    if (mathsAnsweredEl) mathsAnsweredEl.textContent = d.maths.totalAnswered || 0;
    if (mathsStreakEl) mathsStreakEl.textContent = d.maths.bestStreak || 0;

    if (quizListEl) {
      quizListEl.innerHTML = "";
      if (!d.quiz.attempts.length) {
        quizListEl.innerHTML = `<li class="empty">Abhi tak koi quiz nahi khela. Chalo shuru karte hain!</li>`;
      } else {
        const subjectLabels = { maths: "Maths", gk: "GK", science: "Science", english: "English" };
        d.quiz.attempts.slice(0, 8).forEach(a => {
          const li = document.createElement("li");
          const date = new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
          const label = subjectLabels[a.subject] || a.subject;
          li.textContent = `${label} — ${a.score}/${a.total} (${date})`;
          quizListEl.appendChild(li);
        });
      }
    }

    if (gameListEl) {
      gameListEl.innerHTML = "";
      const entries = Object.entries(d.games.bestScores || {});
      if (!entries.length) {
        gameListEl.innerHTML = `<li class="empty">Koi game score abhi record nahi hua.</li>`;
      } else {
        entries.forEach(([game, score]) => {
          const li = document.createElement("li");
          const gameLabels = { memory: "Memory Match", balloon: "Balloon Count", shapes: "Shape Sort" };
          const label = gameLabels[game] || game;
          li.textContent = `${label}: best ${score}`;
          gameListEl.appendChild(li);
        });
      }
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Pura progress reset karna hai? Ye wapas nahi hoga.")) {
        Storage.reset();
        render();
      }
    });
  }

  render();
});
