/* ============================================================
   main.js
   Runs on every page: highlights the active nav link, wires the
   sound on/off toggle, and exposes a tiny helper to play sound
   effects that respects the user's sound preference.
   ============================================================ */

const Sound = (() => {
  const files = {
    correct: "assets/sounds/correct.mp3",
    wrong: "assets/sounds/wrong.mp3",
    complete: "assets/sounds/complete.mp3"
  };
  const cache = {};

  function play(name) {
    if (!Storage.isSoundOn()) return;
    if (!files[name]) return;
    if (!cache[name]) {
      cache[name] = new Audio(files[name]);
    }
    // clone so rapid repeats don't cut each other off
    const node = cache[name].cloneNode();
    node.volume = 0.6;
    node.play().catch(() => {/* autoplay may be blocked before first click */});
  }

  return { play };
})();

const FunFacts = [
  "Ek octopus ke teen dil hote hain!",
  "Shahad kabhi kharab nahi hota — hazaaron saal purana shahad bhi khaane laayak hota hai.",
  "Insaan ki haddiyan steel se bhi zyada majboot hoti hain (unke wazan ke hisaab se).",
  "Ek din mein dil lagbhag 1,00,000 baar dhadakta hai.",
  "Sabse chhota haddi humare kaan mein hoti hai.",
  "Cheetah duniya ka sabse tez daudne wala jaanwar hai.",
  "Chand dheere-dheere Prithvi se door jaa raha hai.",
  "Ek sher ki dahaad 8 kilometer door tak suni ja sakti hai.",
  "Bees (madhumakhi) apne pankh 200 baar prati second hilati hain.",
  "Bharat mein duniya ki sabse zyada bhaashayein boli jaati hain."
];

document.addEventListener("DOMContentLoaded", () => {
  const factEl = document.querySelector("[data-fun-fact]");
  if (factEl) {
    factEl.textContent = FunFacts[Math.floor(Math.random() * FunFacts.length)];
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Highlight current page in nav
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const target = a.getAttribute("href");
    if (target === here) a.classList.add("active");
  });

  // Sound toggle button (present on every page)
  const toggle = document.querySelector("[data-sound-toggle]");
  if (toggle) {
    const render = () => {
      const on = Storage.isSoundOn();
      toggle.textContent = on ? "🔊" : "🔇";
      toggle.setAttribute("aria-label", on ? "Sound on. Tap to mute." : "Sound muted. Tap to unmute.");
    };
    render();
    toggle.addEventListener("click", () => {
      Storage.setSound(!Storage.isSoundOn());
      render();
    });
  }

  // Simple star badge in header, if present
  const starBadge = document.querySelector("[data-star-count]");
  if (starBadge) {
    starBadge.textContent = Storage.get().stars || 0;
  }
});
