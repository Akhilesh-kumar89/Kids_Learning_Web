/* ============================================================
   result.js
   Shows the outcome of the quiz the user just finished, read
   from sessionStorage (set by quiz.js right before redirecting
   here).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const raw = sessionStorage.getItem("lastQuizResult");
  const scoreEl = document.querySelector("[data-result-score]");
  const messageEl = document.querySelector("[data-result-message]");
  const subjectEl = document.querySelector("[data-result-subject]");
  const trophyImg = document.querySelector("[data-result-trophy]");

  if (!raw) {
    scoreEl.textContent = "--";
    messageEl.textContent = "Koi quiz result nahi mila. Pehle ek quiz khelo!";
    return;
  }

  const { subject, score, total } = JSON.parse(raw);
  const percent = Math.round((score / total) * 100);

  const subjectLabels = {
    maths: "Maths Quiz",
    gk: "General Knowledge Quiz",
    science: "Science Quiz",
    english: "English Quiz"
  };

  scoreEl.textContent = `${score} / ${total}`;
  if (subjectEl) subjectEl.textContent = subjectLabels[subject] || "Quiz";

  let message;
  if (percent === 100) message = "Bahut badhiya! Full marks! 🏆";
  else if (percent >= 70) message = "Shandaar performance! Aise hi karte raho. 🌟";
  else if (percent >= 40) message = "Achha try! Thoda aur practice karo. 💪";
  else message = "Koi baat nahi, dubara try karo — practice se sab aata hai. 🙂";

  messageEl.textContent = message;
  if (trophyImg && percent < 40) trophyImg.style.opacity = "0.35";
});
