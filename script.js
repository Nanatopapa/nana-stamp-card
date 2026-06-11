let stampHistory = JSON.parse(localStorage.getItem("stampHistory")) || [];
let gachaTickets = Number(localStorage.getItem("gachaTickets")) || 0;
let totalStamps = Number(localStorage.getItem("totalStamps")) || 0;
let totalTickets = Number(localStorage.getItem("totalTickets")) || 0;

let collections = JSON.parse(localStorage.getItem("collections")) || null;
if (!collections) {
  const oldCollection = JSON.parse(localStorage.getItem("collection")) || [];
  collections = {
    train: oldCollection,
    dino: [],
    saikyo: []
  };
}

if (!collections.train) collections.train = [];
if (!collections.dino) collections.dino = [];
if (!collections.saikyo) collections.saikyo = [];
if (!collections.shinkalion) collections.shinkalion = [];

let cardCounts = JSON.parse(localStorage.getItem("cardCounts")) || {};
if (!cardCounts.train) cardCounts.train = {};
if (!cardCounts.dino) cardCounts.dino = {};
if (!cardCounts.saikyo) cardCounts.saikyo = {};
if (!cardCounts.shinkalion) cardCounts.shinkalion = {};

["train", "dino", "saikyo", "shinkalion"].forEach(type => {
  collections[type].forEach(file => {
    if (!cardCounts[type][file]) {
      cardCounts[type][file] = 1;
    }
  });
});

const gachaData = {
  train: {
    title: "しんかんせん<br>ガチャ",
    label: "🚄 コレクション",
    collectionTitle: "しんかんせん<br>コレクション",
    windowImage: "gacha-window_train.webp",
    folder: "cards",
    hasSecret: true,
    secretRate: 0.05,
    unownedRateEnd: 0.75,
    cards: [
      { name: "E5はやぶさ", file: "e5.webp" },
      { name: "E6こまち", file: "e6.webp" },
      { name: "E7かがやき", file: "e7.webp" },
      { name: "H5はやぶさ", file: "h5.webp" },
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
    unownedRateEnd: 0.70,
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
  },

  saikyo: {
    title: "最強王図鑑<br>ガチャ",
    label: "👑 コレクション",
    collectionTitle: "最強王図鑑<br>コレクション",
    windowImage: "gacha-window_saikyo.webp",
    folder: "cards-saikyo",
    hasSecret: true,
    secretRate: 0.05,
    unownedRateEnd: 0.75,
    cards: [
      { name: "ライオン", file: "lion.webp" },
      { name: "キリン", file: "giraffe.webp" },
      { name: "カバ", file: "hippo.webp" },
      { name: "シロクマ", file: "polarbear.webp" },
      { name: "ティタノボア", file: "titanoboa.webp" },
      { name: "インペリアルマンモス", file: "mammoth.webp" },
      { name: "オニヤンマ", file: "dragonfly.webp" },
      { name: "ヘラクレスオオカブト", file: "hercules.webp" },
      { name: "メガロドン", file: "megalodon.webp" },
      { name: "ダイオウイカ", file: "giantsquid.webp" },
      { name: "オオギワシ", file: "eagle.webp" },
      { name: "デスストーカー", file: "scorpion.webp" },
      { name: "オオスズメバチ", file: "hornet.webp" },
      { name: "ティラノサウルス", file: "trex.webp" },
      { name: "トリケラトプス", file: "triceratops.webp" },
      { name: "ステゴサウルス", file: "stego.webp" },
      { name: "スピノサウルス", file: "spino.webp" },
      { name: "ケツァルコアトルス", file: "quetzal.webp" }
    ],
    secretCard: { name: "ミスターモースト", file: "mrmoast.webp" }
  }
},

 shinkalion: {
    title: "シンカリオン<br>ガチャ",
    label: "🤖 コレクション",
    collectionTitle: "シンカリオン<br>コレクション",
    windowImage: "gacha-window_shinkalion.webp",
    folder: "cards_shinkalion",
    hasSecret: false,
    secretRate: 0,
    unownedRateEnd: 0.75,
    cards: [
      { name: "E5はやぶさ", file: "shinkalion_e5.webp" },
      { name: "E6こまち", file: "shinkalion_e6.webp" },
      { name: "E7かがやき", file: "shinkalion_e7.webp" },
      { name: "E3つばさ", file: "shinkalion_e3.webp" },
      { name: "500こだま", file: "shinkalion_500kodama.webp" },
      { name: "ドクターイエロー", file: "shinkalion_doctor.webp" },
      { name: "H5はやぶさ", file: "shinkalion_h5.webp" },
      { name: "800つばめ", file: "shinkalion_800tsubame.webp" },
      { name: "N700みずほ", file: "shinkalion_n700mizuho.webp" },
      { name: "700ひかりレールスター", file: "shinkalion_railstar.webp" },
      { name: "700のぞみ", file: "shinkalion_700nozomi.webp" },
      { name: "N700Aのぞみ", file: "shinkalion_n700a.webp" },
      { name: "ブラックシンカリオン", file: "shinkalion_black.webp" }
    ],
    secretCard: null
  }
;

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

const adminMenu = document.getElementById("adminMenu");
const closeAdminMenu = document.getElementById("closeAdminMenu");
const addTicket1 = document.getElementById("addTicket1");
const addTicket10 = document.getElementById("addTicket10");
const resetStampCard = document.getElementById("resetStampCard");
const resetTrainCollection = document.getElementById("resetTrainCollection");
const resetDinoCollection = document.getElementById("resetDinoCollection");
const resetSaikyoCollection = document.getElementById("resetSaikyoCollection");
const resetAll = document.getElementById("resetAll");

const undoStamp = document.getElementById("undoStamp");
const undoStampHome = document.getElementById("undoStampHome");

function saveData() {
  localStorage.setItem("stampHistory", JSON.stringify(stampHistory));
  localStorage.setItem("gachaTickets", gachaTickets);
  localStorage.setItem("totalStamps", totalStamps);
  localStorage.setItem("totalTickets", totalTickets);
  localStorage.setItem("collections", JSON.stringify(collections));
  localStorage.setItem("cardCounts", JSON.stringify(cardCounts));
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

function isSecretCard(type, card) {
  const data = gachaData[type];
  return data.secretCard && card.file === data.secretCard.file;
}

function getCardCount(type, file) {
  return cardCounts[type][file] || 0;
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
  updateProgress(currentCollection, collectionProgress, "いまは");

  collectionGrid.innerHTML = "";

  allCards.forEach(card => {
    const item = document.createElement("div");
    item.classList.add("collection-item");

    if (owned.includes(card.file)) {
      const img = document.createElement("img");
      img.src = getCardPath(currentCollection, card);

      const name = document.createElement("div");
      name.classList.add("collection-name");

      const count = getCardCount(currentCollection, card.file);
      name.innerHTML = `${card.name}<br>×${count}`;

      item.appendChild(img);
      item.appendChild(name);
    } else {
      const locked = document.createElement("div");
      locked.classList.add("locked-card");
      locked.textContent = isSecretCard(currentCollection, card) ? "SECRET" : "？？？";
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

  cardCounts[currentGacha][selectedCard.file] =
    (cardCounts[currentGacha][selectedCard.file] || 0) + 1;

  const count = cardCounts[currentGacha][selectedCard.file];

  saveData();
  updateCollection();

  resultCard.src = getCardPath(currentGacha, selectedCard);

  if (isSecretCard(currentGacha, selectedCard)) {
    if (count === 1) {
      resultTitle.innerHTML = "シークレット！！";
    } else {
      resultTitle.innerHTML = `シークレット！！<br>${count}まいめ！`;
    }
    resultTitle.classList.add("secret-title");
  } else if (isNew) {
    resultTitle.innerHTML = `${selectedCard.name}<br>ゲット！`;
    resultTitle.classList.remove("secret-title");
  } else {
    resultTitle.innerHTML = `${selectedCard.name}<br>${count}まいめ！`;
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

undoStampHome.addEventListener("click", () => {
  if (stampHistory.length === 0) {
    showMessage("スタンプがないよ！");
    return;
  }

  stampHistory.pop();

  if (totalStamps > 0) {
    totalStamps--;
  }

  saveData();
  updateDisplay();

  showMessage("ひとつもどしたよ！");
});

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

// 親メニュー
let adminTapCount = 0;
let adminTapTimer = null;

document.querySelector(".stats-box").addEventListener("click", () => {
  adminTapCount++;

  clearTimeout(adminTapTimer);
  adminTapTimer = setTimeout(() => {
    adminTapCount = 0;
  }, 1200);

  if (adminTapCount >= 5) {
    adminTapCount = 0;
    adminMenu.classList.remove("hidden");
  }
});

closeAdminMenu.addEventListener("click", () => {
  adminMenu.classList.add("hidden");
});

addTicket1.addEventListener("click", () => {
  gachaTickets += 1;
  saveData();
  updateDisplay();
  updateGachaScreen();
  showMessage("ガチャけん +1！");
});

addTicket10.addEventListener("click", () => {
  gachaTickets += 10;
  saveData();
  updateDisplay();
  updateGachaScreen();
  showMessage("ガチャけん +10！");
});

resetStampCard.addEventListener("click", () => {
  if (!confirm("スタンプカードだけリセットする？")) return;

  stampHistory = [];
  saveData();
  updateDisplay();
  showMessage("リセットしたよ！");
});

resetTrainCollection.addEventListener("click", () => {
  if (!confirm("新幹線コレクションをリセットする？")) return;

  collections.train = [];
  cardCounts.train = {};
  saveData();
  updateGachaScreen();
  updateCollection();
  showMessage("新幹線をリセット！");
});

resetDinoCollection.addEventListener("click", () => {
  if (!confirm("恐竜コレクションをリセットする？")) return;

  collections.dino = [];
  cardCounts.dino = {};
  saveData();
  updateGachaScreen();
  updateCollection();
  showMessage("恐竜をリセット！");
});

resetSaikyoCollection.addEventListener("click", () => {
  if (!confirm("最強王コレクションをリセットする？")) return;

  collections.saikyo = [];
  cardCounts.saikyo = {};
  saveData();
  updateGachaScreen();
  updateCollection();
  showMessage("最強王をリセット！");
});

resetAll.addEventListener("click", () => {
  if (!confirm("全部リセットする？")) return;
  if (!confirm("本当に全部消すよ？")) return;

  stampHistory = [];
  gachaTickets = 0;
  totalStamps = 0;
  totalTickets = 0;

  collections = {
  train: [],
  dino: [],
  saikyo: [],
  shinkalion: []
};

cardCounts = {
  train: {},
  dino: {},
  saikyo: {},
  shinkalion: {}
};

  saveData();
  updateDisplay();
  updateGachaScreen();
  updateCollection();

  adminMenu.classList.add("hidden");
  showMessage("全部リセットしたよ！");
});

updateDisplay();
updateGachaScreen();
updateCollection();
