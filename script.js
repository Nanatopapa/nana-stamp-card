let stampHistory = JSON.parse(localStorage.getItem("stampHistory")) || [];
let gachaTickets = Number(localStorage.getItem("gachaTickets")) || 0;
let totalStamps = Number(localStorage.getItem("totalStamps")) || 0;
let totalTickets = Number(localStorage.getItem("totalTickets")) || 0;

// 旧データ対応：前の collection があれば train に引き継ぐ
let collections = JSON.parse(localStorage.getItem("collections")) || null;
if (!collections) {
  const oldCollection = JSON.parse(localStorage.getItem("collection")) || [];
  collections = {
    train: oldCollection,
    dino: []
  };
}

const gachaData = {
  train: {
    title: "しんかんせん<br>ガチャ",
    label: "🚄 コレクション",
    collectionTitle: "しんかんせん<br>コレクション",
    windowImage: "gacha-window_train.webp",
    folder: "cards",
    hasSecret: true,
    secretRate: 0.05,
    unownedRateEnd: 0.75, // 5%シークレット + 70%未所持 = 75%
    cards: [
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
    ],
    secretCard: { name: "ブラックシンカリオン", file: "black.webp" }
  },

  dino: {
    title: "きょうりゅう<br>ガチャ",
    label: "🦖 コレクション",
    collectionTitle: "きょうりゅう<br>コレクション",
    windowImage: "gacha-window_dino.webp",
    folder: "cards_dino",
    hasSecret: false,
    secretRate: 0,
    unownedRateEnd: 0.70, // 70%未所持 / 30%全体
    cards: [
      { name: "ティラノサウルス", file: "tyranno.webp" },
      { name: "ステゴサウルス", file: "stego.webp" },
      { name: "プテラノドン", file: "pteranodon.webp" },
      { name: "トリケラトプス", file: "triceratops.webp" },
      { name: "アンキロサウルス", file: "ankylo.webp" },
      { name: "モササウルス", file: "mosa.webp" },
      { name: "パラサウロロフス", file: "parasauro.webp" },
      { name: "スピノサウルス", file: "spino.webp" },
      { name: "ブラキオサウルス", file: "brachio.webp" },
      { name: "ヴェロキラプトル", file: "velociraptor.webp" },
      { name: "ケツァルコアトルス", file: "quetzal.webp" },
      { name: "パキケファロサウルス", file: "pachy.webp" }
    ],
    secretCard: null
  }
};

let currentGacha = "train";
let currentCollection = "train";
let selectedCard = null;

const homeScreen = document.getElementById("homeScreen");
const stampScreen = document.getElementById("stampScreen");
const gachaSelectScreen = document.getElementById("gachaSelectScreen");
const gachaScreen = document.getElementById("gachaScreen");
const gachaAnimationScreen = document.getElementById("gachaAnimationScreen");
const resultScreen = document.getElementById("resultScreen");
const collectionSelectScreen = document.getElementById("collectionSelectScreen");
const collectionScreen = document.getElementById("collectionScreen");

const stampGrid = document.getElementById("stampGrid");
const ticketCount = document.getElementById("ticketCount");
const ticketCountGacha = document.getElementById("ticketCountGacha");
const collectionGrid = document.getElementById("collectionGrid");

const totalStampsDisplay = document.getElementById("totalStamps");
const totalTicketsDisplay = document.getElementById("totalTickets");

const gachaTitle = document.getElementById("gachaTitle");
const gachaWindowImage = document.getElementById("gachaWindowImage");
const gachaProgress = document.getElementById("gachaProgress");

const collectionTitle = document.getElementById("collectionTitle");
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
const goGachaSelectButton = document.getElementById("goGachaSelect");
const goCollectionSelectButton = document.getElementById("goCollectionSelect");

const backHomeFromStamp = document.getElementById("backHomeFromStamp");
const backHomeFromGachaSelect = document.getElementById("backHomeFromGachaSelect");
const backGachaSelectFromGacha = document.getElementById("backGachaSelectFromGacha");
const backHomeFromCollectionSelect = document.getElementById("backHomeFromCollectionSelect");
const backCollectionSelectFromCollection = document.getElementById("backCollectionSelectFromCollection");

const backGachaFromResult = document.getElementById("backGachaFromResult");
const goCollectionFromResult = document.getElementById("goCollectionFromResult");

const drawGachaButton = document.getElementById("drawGacha");
const stampOptions = document.querySelectorAll(".stamp-option");
const gachaSelectButtons = document.querySelectorAll("[data-gacha]");
const collectionSelectButtons = document.querySelectorAll("[data-collection]");

function saveData() {
  localStorage.setItem("stampHistory", JSON.stringify(stampHistory));
  localStorage.setItem("gachaTickets", gachaTickets);
  localStorage.setItem("totalStamps", totalStamps);
  localStorage.setItem("totalTickets", totalTickets);
  localStorage.setItem("collections", JSON.stringify(collections));
}

function showOnly(screen) {
  homeScreen.classList.add("hidden");
  stampScreen.classList.add("hidden");
  gachaSelectScreen.classList.add("hidden");
  gachaScreen.classList.add("hidden");
  gachaAnimationScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  collectionSelectScreen.classList.add("hidden");
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

function getAllCards(type) {
  const data = gachaData[type];
  if (data.hasSecret && data.secretCard) {
    return [...data.cards, data.secretCard];
  }
  return [...data.cards];
}

function getCardPath(type, card) {
  return `${gachaData[type].folder}/${card.file}`;
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

function updateGachaScreen() {
  const data = gachaData[currentGacha];

  gachaTitle.innerHTML = data.title;
  gachaWindowImage.src = data.windowImage;
  updateProgress(currentGacha, gachaProgress, data.label);
  ticketCountGacha.textContent = gachaTickets;
}

function updateProgress(type, element, label) {
  const got = collections[type].length;
  const total = getAllCards(type).length;
  const remaining = total - got;

  if (remaining <= 0) {
    element.innerHTML = "🎉 コンプリート！！ 🎉";
    element.classList.add("complete");
  } else {
    element.innerHTML = `${label} ${got} / ${total}<br>あと${remaining}しゅるい！`;
    element.classList.remove("complete");
  }
}

function updateCollection() {
  const data = gachaData[currentCollection];
  const owned = collections[currentCollection];
  const allCards = getAllCards(currentCollection);

  collectionTitle.innerHTML = data.collectionTitle;
  updateProgress(currentCollection, collectionProgress, `いまは`);

  collectionGrid.innerHTML = "";

  allCards.forEach(card => {
    const item = document.createElement("div");
    item.classList.add("collection-item");

    if (owned.includes(card.file)) {
      const img = document.createElement("img");
      img.src = getCardPath(currentCollection, card);

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
}

function chooseCard(type) {
  const data = gachaData[type];
  const owned = collections[type];
  const unownedNormalCards = data.cards.filter(card => !owned.includes(card.file));
  const roll = Math.random();

  if (data.hasSecret && data.secretCard && roll < data.secretRate) {
    return data.secretCard;
  }

  if (roll < data.unownedRateEnd && unownedNormalCards.length > 0) {
    return unownedNormalCards[Math.floor(Math.random() * unownedNormalCards.length)];
  }

  const allCards = getAllCards(type);
  return allCards[Math.floor(Math.random() * allCards.length)];
}

function showResult() {
  const owned = collections[currentGacha];
  const isNew = !owned.includes(selectedCard.file);

  if (isNew) {
    owned.push(selectedCard.file);
  }

  saveData();
  updateCollection();

  resultCard.src = getCardPath(currentGacha, selectedCard);

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
  updateGachaScreen();

  selectedCard = chooseCard(currentGacha);

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
    gachaPreview.src = getCardPath(currentGacha, selectedCard);
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

gachaSelectButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentGacha = button.dataset.gacha;
    updateGachaScreen();
    showOnly(gachaScreen);
  });
});

collectionSelectButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCollection = button.dataset.collection;
    updateCollection();
    showOnly(collectionScreen);
  });
});

goStampButton.addEventListener("click", () => showOnly(stampScreen));
goGachaSelectButton.addEventListener("click", () => showOnly(gachaSelectScreen));
goCollectionSelectButton.addEventListener("click", () => showOnly(collectionSelectScreen));

backHomeFromStamp.addEventListener("click", () => showOnly(homeScreen));
backHomeFromGachaSelect.addEventListener("click", () => showOnly(homeScreen));
backGachaSelectFromGacha.addEventListener("click", () => showOnly(gachaSelectScreen));
backHomeFromCollectionSelect.addEventListener("click", () => showOnly(homeScreen));
backCollectionSelectFromCollection.addEventListener("click", () => showOnly(collectionSelectScreen));

backGachaFromResult.addEventListener("click", () => {
  updateGachaScreen();
  showOnly(gachaScreen);
});

goCollectionFromResult.addEventListener("click", () => {
  currentCollection = currentGacha;
  updateCollection();
  showOnly(collectionScreen);
});

drawGachaButton.addEventListener("click", drawCard);

updateDisplay();
updateGachaScreen();
updateCollection();
