const cards = document.querySelectorAll(".up-card");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const skillFilter = document.getElementById("skillFilter");
const levelFilter = document.getElementById("levelFilter");
const priceFilter = document.getElementById("priceFilter");
const applyFilterBtn = document.getElementById("applyFilter");

let visible = 6;
const step = 6;

/* ===== HELPERS ===== */
function getFilteredCards() {
  return [...cards].filter(card => {
    // 1. فلتر التخصص (Skill)
    const skillValue = skillFilter.value.toLowerCase();
    const cardSkill = (card.dataset.skill || "").toLowerCase();
    const skillMatch = (skillValue === "all" || cardSkill === skillValue);

    // 2. فلتر المستوى (Level)
    const levelValue = levelFilter.value.toLowerCase();
    const cardLevel = (card.dataset.level || "").toLowerCase();
    const levelMatch = (levelValue === "all" || cardLevel === levelValue);

    // 3. فلتر السعر (متناسب مع أسعار القانون الجنائي)
    let priceMatch = true;
    const priceText = card.querySelector(".price")?.innerText || "";
    const price = parseInt(priceText.replace(/\D/g, ""));

    if (priceFilter.value === "low") priceMatch = price < 50;
    if (priceFilter.value === "mid") priceMatch = (price >= 50 && price <= 60);
    if (priceFilter.value === "high") priceMatch = price > 60;

    return skillMatch && levelMatch && priceMatch;
  });
}

function updateCards() {
  const filteredCards = getFilteredCards();

  cards.forEach(card => card.classList.add("hidden-card"));

  filteredCards.slice(0, visible).forEach(card => {
    card.classList.remove("hidden-card");
  });

  if (loadMoreBtn) {
    loadMoreBtn.style.display = (visible < filteredCards.length) ? "block" : "none";
  }
}

/* ===== EVENTS ===== */
applyFilterBtn.addEventListener("click", () => {
  visible = 6; 
  updateCards();
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visible += step;
    updateCards();
  });
}

// تشغيل عند البداية
updateCards();