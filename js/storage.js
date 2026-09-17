/* ============================================================
   storage.js
   Small helper library that wraps localStorage so every page
   reads/writes progress data the same way.
   ============================================================ */

const Storage = (() => {
  const KEY = "kidsLearningHub.v1";

  const defaultData = () => ({
    settings: {
      sound: true
    },
    maths: {
      totalAnswered: 0,
      totalCorrect: 0,
      bestStreak: 0,
      history: []          // { date, operation, level, correct, total }
    },
    quiz: {
      attempts: []          // { date, subject, score, total }
    },
    games: {
      bestScores: {}        // { memory: 8, balloon: 12 }
    },
    stars: 0
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultData();
      const parsed = JSON.parse(raw);
      // merge with defaults so new fields don't break old saves
      return { ...defaultData(), ...parsed };
    } catch (e) {
      console.warn("Storage load failed, resetting.", e);
      return defaultData();
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage save failed.", e);
    }
  }

  function get() {
    return load();
  }

  function update(mutatorFn) {
    const data = load();
    mutatorFn(data);
    save(data);
    return data;
  }

  function reset() {
    save(defaultData());
    return defaultData();
  }

  function addStars(n) {
    return update(d => { d.stars = Math.max(0, (d.stars || 0) + n); });
  }

  function recordMathsSession({ operation, level, correct, total }) {
    return update(d => {
      d.maths.totalAnswered += total;
      d.maths.totalCorrect += correct;
      d.maths.history.unshift({
        date: new Date().toISOString(),
        operation, level, correct, total
      });
      d.maths.history = d.maths.history.slice(0, 20);
    });
  }

  function recordMathsStreak(streak) {
    return update(d => {
      if (streak > d.maths.bestStreak) d.maths.bestStreak = streak;
    });
  }

  function recordQuizAttempt({ subject, score, total }) {
    return update(d => {
      d.quiz.attempts.unshift({
        date: new Date().toISOString(),
        subject, score, total
      });
      d.quiz.attempts = d.quiz.attempts.slice(0, 20);
    });
  }

  function recordGameScore(gameId, score) {
    return update(d => {
      const best = d.games.bestScores[gameId] || 0;
      if (score > best) d.games.bestScores[gameId] = score;
    });
  }

  function setSound(on) {
    return update(d => { d.settings.sound = on; });
  }

  function isSoundOn() {
    return load().settings.sound;
  }

  return {
    get, update, reset, addStars,
    recordMathsSession, recordMathsStreak,
    recordQuizAttempt, recordGameScore,
    setSound, isSoundOn
  };
})();
