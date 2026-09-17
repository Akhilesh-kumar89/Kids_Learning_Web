/* ============================================================
   games.js
   Two lightweight mini-games: a number Memory Match and a
   Balloon Count game. Picking a game card swaps the active
   game inside #game-stage.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector("[data-game-stage]");
  const pickCards = document.querySelectorAll("[data-game-pick]");

  pickCards.forEach(card => {
    card.addEventListener("click", () => {
      pickCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const game = card.dataset.gamePick;
      if (game === "memory") renderMemoryGame();
      if (game === "balloon") renderBalloonGame();
      if (game === "shapes") renderShapeGame();
    });
  });

  // ---------- Game 1: Number Memory Match ----------
  function renderMemoryGame() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8];
    const deck = shuffle([...values, ...values]);

    let firstCard = null;
    let lock = false;
    let matches = 0;

    stage.innerHTML = `
      <div class="game-target">Same number wale do cards dhoondo!</div>
      <div class="memory-grid" role="grid" aria-label="Number memory match"></div>
    `;
    const grid = stage.querySelector(".memory-grid");

    deck.forEach((val, i) => {
      const cell = document.createElement("button");
      cell.className = "memory-card";
      cell.dataset.value = val;
      cell.dataset.index = i;
      cell.textContent = val;
      cell.addEventListener("click", () => flip(cell));
      grid.appendChild(cell);
    });

    function flip(cell) {
      if (lock || cell.classList.contains("flipped") || cell.classList.contains("matched")) return;
      cell.classList.add("flipped");

      if (!firstCard) {
        firstCard = cell;
        return;
      }

      if (firstCard.dataset.value === cell.dataset.value && firstCard !== cell) {
        firstCard.classList.add("matched");
        cell.classList.add("matched");
        Sound.play("correct");
        matches++;
        firstCard = null;
        if (matches === values.length) {
          Sound.play("complete");
          Storage.recordGameScore("memory", matches);
          Storage.addStars(1);
        }
      } else {
        lock = true;
        Sound.play("wrong");
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          cell.classList.remove("flipped");
          firstCard = null;
          lock = false;
        }, 700);
      }
    }
  }

  // ---------- Game 2: Balloon Count ----------
  function renderBalloonGame() {
    const target = Math.floor(Math.random() * 6) + 5; // 5-10
    let popped = 0;
    let totalBalloons = target + 6; // some decoys beyond target count visually, but we just count clicks

    stage.innerHTML = `
      <div class="game-target">Pop kar do bilkul <strong>${target}</strong> balloons!</div>
      <div class="balloon-field" data-field></div>
      <div class="row" style="justify-content:center;margin-top:16px;">
        <span class="feedback" data-balloon-feedback></span>
      </div>
    `;
    const field = stage.querySelector("[data-field]");
    const feedback = stage.querySelector("[data-balloon-feedback]");
    const colors = ["#FF6B6B", "#4AC6E0", "#6BCB77", "#FFC93C"];

    const positions = [];
    const cols = 4, rows = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          left: (c / cols) * 80 + Math.random() * 8,
          top: (r / rows) * 78 + Math.random() * 8
        });
      }
    }
    shuffleInPlace(positions);

    function spawnBalloon(pos) {
      const b = document.createElement("button");
      b.className = "balloon";
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.style.left = pos.left + "%";
      b.style.top = pos.top + "%";
      b.textContent = "🎈";
      b.addEventListener("click", () => {
        if (b.dataset.popped) return;
        b.dataset.popped = "1";
        b.style.transform = "scale(0)";
        b.style.opacity = "0";
        popped++;
        Sound.play("correct");
        checkResult();
      });
      field.appendChild(b);
    }

    function shuffleInPlace(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    for (let i = 0; i < 14; i++) spawnBalloon(positions[i]);

    function checkResult() {
      if (popped === target) {
        feedback.textContent = "Perfect counting! 🎉";
        feedback.className = "feedback correct";
        Sound.play("complete");
        Storage.recordGameScore("balloon", target);
        Storage.addStars(1);
      } else if (popped > target) {
        feedback.textContent = `Thoda zyada ho gaya. Target tha ${target}.`;
        feedback.className = "feedback wrong";
      } else {
        feedback.textContent = `${popped} pop ho gaye, ${target - popped} aur baaki.`;
        feedback.className = "feedback";
      }
    }
  }

  // ---------- Game 3: Shape Sort ----------
  function renderShapeGame() {
    const shapeNames = { circle: "Circle", square: "Square", triangle: "Triangle", star: "Star" };
    const colorNames = { "#FF6B6B": "Red", "#4AC6E0": "Blue", "#6BCB77": "Green", "#FFC93C": "Yellow" };
    const shapeKeys = Object.keys(shapeNames);
    const colorKeys = Object.keys(colorNames);

    let round = 0;
    let score = 0;
    const totalRounds = 6;

    stage.innerHTML = `
      <div class="game-target" data-shape-target>Loading...</div>
      <div class="shape-grid" data-shape-grid></div>
      <div class="row" style="justify-content:center;margin-top:16px;">
        <span class="feedback" data-shape-feedback></span>
      </div>
    `;
    const targetEl = stage.querySelector("[data-shape-target]");
    const grid = stage.querySelector("[data-shape-grid]");
    const feedback = stage.querySelector("[data-shape-feedback]");

    function svgFor(shape, color) {
      switch (shape) {
        case "circle": return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${color}"/></svg>`;
        case "square": return `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="12" fill="${color}"/></svg>`;
        case "triangle": return `<svg viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="${color}"/></svg>`;
        case "star": return `<svg viewBox="0 0 100 100"><polygon points="50,5 61,38 96,38 68,59 79,92 50,72 21,92 32,59 4,38 39,38" fill="${color}"/></svg>`;
      }
    }

    function nextRound() {
      if (round >= totalRounds) {
        targetEl.innerHTML = `Khel khatam! Score: <strong>${score} / ${totalRounds}</strong>`;
        grid.innerHTML = "";
        Storage.recordGameScore("shapes", score);
        if (score === totalRounds) Storage.addStars(1);
        Sound.play("complete");
        return;
      }
      round++;
      feedback.textContent = "";
      feedback.className = "feedback";

      const targetShape = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
      const targetColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      targetEl.innerHTML = `Round ${round}/${totalRounds}: <strong style="color:${targetColorKey}">${colorNames[targetColorKey]} ${shapeNames[targetShape]}</strong> par click karo!`;

      // build a shuffled set of tiles including the correct one exactly once
      const tiles = [{ shape: targetShape, color: targetColorKey, correct: true }];
      while (tiles.length < 8) {
        const s = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
        const c = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        if (s === targetShape && c === targetColorKey) continue; // avoid duplicate correct tile
        tiles.push({ shape: s, color: c, correct: false });
      }
      shuffleInPlace(tiles);

      grid.innerHTML = "";
      tiles.forEach(t => {
        const btn = document.createElement("button");
        btn.className = "shape-tile";
        btn.innerHTML = svgFor(t.shape, t.color);
        btn.addEventListener("click", () => {
          if (t.correct) {
            score++;
            Sound.play("correct");
            feedback.textContent = "Sahi choose kiya! 🎉";
            feedback.className = "feedback correct";
          } else {
            Sound.play("wrong");
            feedback.textContent = "Galat tha, dhyan se dekho!";
            feedback.className = "feedback wrong";
          }
          setTimeout(nextRound, 700);
        });
        grid.appendChild(btn);
      });
    }

    function shuffleInPlace(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    nextRound();
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // default game on load
  renderMemoryGame();
});
