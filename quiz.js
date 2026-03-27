const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const videoContainer = document.getElementById("video-container");
const usernameInput = document.getElementById("username");
const highscoresEl = document.getElementById("highscores");

let currentQuestion = 0;
let score = 0;

const questions = [
  {
    question: "Se video og svar:",
    video: "./video/odd2.mp4",
    options: ["Svar 1", "Svar 2", "Svar 3", "alle"],
    correct: 2
  },
  {
    question: "Hva måles i Ohm (Ω)?",
    options: ["Strøm", "Motstand", "Spenning", "Effekt"],
    correct: 1
  },
  {
    question: "Hva er normal kroppstemperatur hos mennesker?",
    options: ["35°C", "37°C", "39°C", "40°C"],
    correct: 1
  },
  {
    question: "Hva er kroppens viktigste energikilde under hard trening?",
    options: ["Protein", "Karbohydrater", "Vann", "Vitaminer"],
    correct: 1
  },
  {
    question: "Hva betyr HTML?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Media Link",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Hvilket styresett har Norge?",
    options: [
      "Republikk",
      "Militærstyre",
      "Konstitusjonelt monarki",
      "Diktatur"
    ],
    correct: 2
  }
];

function loadQuestion() {
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";
  videoContainer.innerHTML = "";

  let q = questions[currentQuestion];
  questionEl.textContent = q.question;


  if (q.video) {
    videoContainer.innerHTML = `
      <video controls width="350"> 
        <source src="${q.video}" type="video/mp4">
      </video>
    `;
  }

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = () => checkAnswer(index);

    answersEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  const correct = questions[currentQuestion].correct;

  if (index === correct) {
    feedbackEl.textContent = "Riktig!";
    score++;
  } else {
    feedbackEl.textContent = "Feil!";
  }

  Array.from(answersEl.children).forEach(btn => btn.disabled = true);
}

nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  const name = usernameInput.value || "Anonym";

  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  highscores.push({ name: name, score: score });

  highscores.sort((a, b) => b.score - a.score);
  highscores = highscores.slice(0, 5);

  localStorage.setItem("highscores", JSON.stringify(highscores));

  displayHighscores(highscores);
}

function displayHighscores(scores) {
  questionEl.textContent = "Highscore";
  answersEl.innerHTML = "";
  videoContainer.innerHTML = "";
  feedbackEl.textContent = "";

  highscoresEl.innerHTML = scores
    .map(s => `<p>${s.name}: ${s.score}</p>`)
    .join("");
}

loadQuestion();