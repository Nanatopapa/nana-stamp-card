let stampHistory = JSON.parse(localStorage.getItem("stampHistory")) || [];
let gachaTickets = Number(localStorage.getItem("gachaTickets")) || 0;
let collection = JSON.parse(localStorage.getItem("collection")) || [];
let totalStamps = Number(localStorage.getItem("totalStamps")) || 0;
let totalTickets = Number(localStorage.getItem("totalTickets")) || 0;

const cards = [
  { name: "E5はやぶさ", file: "e5.webp" },
  { name: "E6こまち", file: "e6.webp" },
  { name: "E7かがやき", file: "e7.webp" },
  { name: "H5はやぶさ", file: "H5.webp" },
  { name: "ドクターイエロー", file: "doctor.webp" },
  { name: "ひかりレールスター", file: "railstar.webp" },
  { name: "N700Sのぞみ", file: "n700s.webp" },
  { name: "0系ひかり", file: "zero.webp" },
  { name: "800系つばめ", file: "tsubame800.webp" },
  { name: "N700Sかもめ", file: "kamome.webp" },
  { name: "ALFA-X", file: "alfax.webp" },
  { name: "500こだま", file: "500kodama.webp" },
  { name: "E3つばさ", file: "e3tsubasa.webp" }
];

const secretCard = {
  name: "ブラックシンカリオン",
  file: "black.webp"
};

const homeScreen = document.getElementById("homeScreen");
const stampScreen = document.getElementById("stampScreen");
const gachaScreen = document.getElementById("gachaScreen");
const gachaAnimationScreen = document.getElementById("gachaAnimationScreen");
const resultScreen = document.getElementById("resultScreen");
const collectionScreen = document.getElementById("collectionScreen");

const stampGrid = document.getElementById("stampGrid");
const ticketCount = document.getElementById("ticketCount");
const ticketCountGacha = document.getElementById("ticketCountGacha");
const collectionGrid = document.getElementById("collectionGrid");

const totalStampsDisplay = document.getElementById("totalStamps");
const totalTicketsDisplay = document.getElementById("totalTickets");

const gachaProgress = document.getElementById("gachaProgress");
const collectionProgress = document.getElementById("collectionProgress");

const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const gachaPreview = document.getElementById("gachaPreview");
const capsule = document.getElementById("capsule");
const flash = document.getElementById("flash");
const gachaStageText = document.getElementById("gachaStageText");

const messagePopup = document.getElementById("messagePopup");
const messageText = document.getElementById("messageText");

const goStampButton = document.getElementById("goStamp");
const goGachaButton = document.getElementById("goGacha");
const goCollectionButton = document.getElementById("goCollection");

const backHomeFromStamp = document.getElementById("backHomeFromStamp");
const backHomeFromGacha = document.getElementById("backHomeFromGacha");
const backHomeFromCollection = document.getElementById("backHomeFromCollection");
const backGachaFromResult = document.getElementById("backGachaFromResult");
const goCollectionFromResult = document.getElementById("goCollectionFromResult");

const drawGachaButton = document.getElementById("drawGacha");
const stampOptions = document.querySelectorAll(".stamp-option");

let selectedCard = null;

function saveData() {
  localStorage.setItem("stampHistory", JSON.stringify(stampHistory));
  localStorage.setItem("gachaTickets", gachaTickets);
  localStorage.setItem("collection", JSON.stringify(collection));
  localStorage.setItem("totalStamps", totalStamps);
  localStorage.setItem("totalTickets", totalTickets);
}

function showOnly(screen) {
  homeScreen.classList.add("hidden");
  stampScreen.classList.add("hidden");
  gachaScreen.classList.add("hidden");
  gachaAnimationScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  collectionScreen.classList.add("hidden");

  screen.classList.remove("hidden");
}

function showMessage(text, callback) {
  messageText.textContent = text;
  messagePopup.classList.remove("hidden");

  setTimeout(() => {
    messagePopup.classList.add("hidden");
    if (callback) callback();
  }, 1300);
}

function updateDisplay() {
  stampGrid.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const cell = document.createElement("div");
    cell.classList.add("stamp-cell");
    cell.textContent = stampHistory[i] || "";
    stampGrid.appendChild(cell);
  }

  ticketCount.textContent = gachaTickets;
  ticketCountGacha.textContent = gachaTickets;
  totalStampsDisplay.textContent = totalStamps;
  totalTicketsDisplay.textContent = totalTickets;
}

function updateProgress() {
  const total = cards.length + 1;
  const got = collection.length;
  const remaining = total - got;

  if (remaining <= 0) {
    gachaProgress.innerHTML = "🎉 コンプリート！！ 🎉";
    collectionProgress.innerHTML = "🏆 コンプリート！！";
    gachaProgress.classList.add("complete");
    collectionProgress.classList.add("complete");
  } else {
    gachaProgress.innerHTML = `🚄 コレクション ${got} / ${total}<br>あと${remaining}しゅるい！`;
    collectionProgress.innerHTML = `いまは ${got} / ${total}<br>あと${remaining}しゅるい！`;
    gachaProgress.classList.remove("complete");
    collectionProgress.classList.remove("complete");
  }
}

function updateCollection() {
  collectionGrid.innerHTML = "";
  const allCards = [...cards, secretCard];

  allCards.forEach(card => {
    const item = document.createElement("div");
    item.classList.add("collection-item");

    if (collection.includes(card.file)) {
      const img = document.createElement("img");
      img.src = `cards/${card.file}`;

      const name = document.createElement("div");
      name.classList.add("collection-name");
      name.textContent = card.name;

      item.appendChild(img);
      item.appendChild(name);
    } else {
      const locked = document.createElement("div");
      locked.classList.add("locked-card");
      locked.textContent = card.file === "black.webp" ? "SECRET" : "？？？";
      item.appendChild(locked);
    }

    collectionGrid.appendChild(item);
  });

  updateProgress();
}

function chooseCard() {
  const unownedNormalCards = cards.filter(card => !collection.includes(card.file));
  const roll = Math.random();

  if (roll < 0.05) return secretCard;

  if (roll < 0.80 && unownedNormalCards.length > 0) {
    return unownedNormalCards[Math.floor(Math.random() * unownedNormalCards.length)];
  }

  return [...cards, secretCard][Math.floor(Math.random() * (cards.length + 1))];
}

function showResult() {
  const isNew = !collection.includes(selectedCard.file);

  if (isNew) {
    collection.push(selectedCard.file);
  }

  saveData();
  updateCollection();

  resultCard.src = `cards/${selectedCard.file}`;

  if (selectedCard.file === "black.webp") {
    resultTitle.textContent = "シークレット！！";
    resultTitle.classList.add("secret-title");
  } else if (isNew) {
    resultTitle.textContent = `${selectedCard.name} ゲット！`;
    resultTitle.classList.remove("secret-title");
  } else {
    resultTitle.textContent = `ダブり！ ${selectedCard.name}`;
    resultTitle.classList.remove("secret-title");
  }

  showOnly(resultScreen);
}

function drawCard() {
  if (gachaTickets <= 0) {
    showMessage("ガチャけんがないよ！");
    return;
  }

  gachaTickets--;
  saveData();
  updateDisplay();

  selectedCard = chooseCard();

  capsule.classList.remove("hidden", "drop", "open");
  flash.classList.add("hidden");
  gachaPreview.classList.add("hidden");

  void capsule.offsetWidth;
  capsule.classList.add("drop");

  gachaStageText.textContent = "ガラガラ...";
  showOnly(gachaAnimationScreen);

  setTimeout(() => {
    gachaStageText.textContent = "カプセルをタップ！";
  }, 1000);
}

capsule.addEventListener("click", () => {
  if (capsule.classList.contains("hidden")) return;

  gachaStageText.textContent = "パカッ！";
  capsule.classList.remove("drop");
  capsule.classList.add("open");

  setTimeout(() => {
    flash.classList.remove("hidden");
    gachaStageText.textContent = "ピカーッ！";
  }, 350);

  setTimeout(() => {
    capsule.classList.add("hidden");
  }, 700);

  setTimeout(() => {
    flash.classList.add("hidden");
    gachaPreview.src = `cards/${selectedCard.file}`;
    gachaPreview.classList.remove("hidden");
    gachaStageText.textContent = "でた！！";
  }, 1700);

  setTimeout(() => {
    showResult();
  }, 3400);
});

stampOptions.forEach(button => {
  button.addEventListener("click", () => {
    const emoji = button.dataset.emoji;

    stampHistory.push(emoji);
    totalStamps++;

    saveData();
    updateDisplay();
    showOnly(homeScreen);

    if (stampHistory.length >= 10) {
      showMessage("10こたまったよ！\nガチャけん1まいゲット！", () => {
        gachaTickets++;
        totalTickets++;
        stampHistory = [];
        saveData();
        updateDisplay();
      });
    } else {
      showMessage("ゲット！");
    }
  });
});

goStampButton.addEventListener("click", () => showOnly(stampScreen));
goGachaButton.addEventListener("click", () => showOnly(gachaScreen));
goCollectionButton.addEventListener("click", () => {
  updateCollection();
  showOnly(collectionScreen);
});

backHomeFromStamp.addEventListener("click", () => showOnly(homeScreen));
backHomeFromGacha.addEventListener("click", () => showOnly(homeScreen));
backHomeFromCollection.addEventListener("click", () => showOnly(homeScreen));
backGachaFromResult.addEventListener("click", () => showOnly(gachaScreen));
goCollectionFromResult.addEventListener("click", () => {
  updateCollection();
  showOnly(collectionScreen);
});

drawGachaButton.addEventListener("click", drawCard);

updateDisplay();
updateCollection();
