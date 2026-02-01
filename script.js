/********************
  GLOBAL PAGE CONTROL
*********************/
let currentPage = 1;

function goToPage(page) {
  document.getElementById("page" + currentPage).classList.remove("active");
  document.getElementById("page" + page).classList.add("active");
  currentPage = page;

  // trigger page 4 animation
  if (page === 4) {
    setTimeout(onPage4Open, 200);
  }
}

/********************
  BACKGROUND MUSIC (BROWSER SAFE)
*********************/
function enableMusicOnFirstClick() {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  const startMusic = () => {
    music.volume = 1;
    music.play().catch(() => {});
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  };

  document.addEventListener("click", startMusic);
  document.addEventListener("touchstart", startMusic);
}

/********************
  PAGE 1 : COUNTDOWN
*********************/
window.onload = () => {
  enableMusicOnFirstClick(); // waits for first click/tap

  let count = 5;
  const countdownEl = document.getElementById("countdown");

  const timer = setInterval(() => {
    countdownEl.textContent = count;
    count--;

    if (count < 0) {
      clearInterval(timer);
      countdownEl.textContent = "🎉";
      launchConfetti();

      setTimeout(() => {
        goToPage(2);
      }, 1500);
    }
  }, 1000);
};

/********************
  CONFETTI
*********************/
function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background =
      ["#a855f7", "#7c3aed", "#c084fc"][Math.floor(Math.random() * 3)];
    c.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(c);
  }
}

/********************
  PAGE 3 : MAIL LOGIC
*********************/
let yesClicks = 0;
let yesScale = 1;
let noScale = 1;

const yesTexts = [
  "I don’t think it’s worth opening 😶",
  "No no… don’t open it 😬",
  "Seriously… stop clicking 😭",
  "Last warning 👀",
  "Okay… you’re still here 😳"
];

function yesClick() {
  yesClicks++;

  // 15% shrink / grow
  yesScale *= 0.85;
  noScale *= 1.15;

  document.getElementById("yesBtn").style.transform = `scale(${yesScale})`;
  document.getElementById("noBtn").style.transform = `scale(${noScale})`;

  if (yesClicks <= 5) {
    document.getElementById("mailText").innerText =
      yesTexts[yesClicks - 1];
  }

  if (yesClicks === 6) {
    document.getElementById("mailText").innerText =
      "Okay okay 😭 if you’re this eager, I’ll open it for you 💌";

    document.getElementById("mailIcon").style.display = "none";
    document.getElementById("mailImg").style.display = "block";
    document.querySelector(".btn-row").style.display = "none";
    document.getElementById("openNextBtn").style.display = "block";
  }
}

function noClick() {
  document.getElementById("page3").innerHTML = `
    <h2>😔💔</h2>
    <p>
      You are the worst…<br>
      I did not expect this from you 😞<br>
      I hate you 😭
    </p>
  `;
}

/********************
  PAGE 4 : IMAGE SLIDE
*********************/
function onPage4Open() {
  const img = document.getElementById("slideImage");
  const btn = document.getElementById("finalNextBtn");

  img.classList.add("slide-in");

  setTimeout(() => {
    img.classList.add("fade-out");
  }, 5000);

  setTimeout(() => {
    img.style.display = "none";
    btn.style.display = "block";
  }, 6500);
}
