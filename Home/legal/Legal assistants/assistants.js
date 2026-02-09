const cards = document.querySelectorAll(".up-card");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const skillFilter = document.getElementById("skillFilter");
const levelFilter = document.getElementById("levelFilter");
const priceFilter = document.getElementById("priceFilter");
const applyFilterBtn = document.getElementById("applyFilter");

let visible = 6;
const step = 6;

function getFilteredCards() {
  return [...cards].filter(card => {
    // 1. Skill Match
    const skillValue = skillFilter.value;
    const cardSkill = card.dataset.skill || "";
    const skillMatch = (skillValue === "all" || cardSkill === skillValue);

    // 2. Level Match (إضافة الفلتر ده ضروري)
    const levelValue = levelFilter.value;
    const cardLevel = card.dataset.level || "";
    const levelMatch = (levelValue === "all" || cardLevel === levelValue);

    // 3. Price Match (تعديل الأرقام لتناسب المساعدين)
    let priceMatch = true;
    const priceText = card.querySelector(".price")?.innerText || "";
    const price = parseInt(priceText.replace(/\D/g, ""));

    if (priceFilter.value === "low") priceMatch = price < 30;
    if (priceFilter.value === "mid") priceMatch = (price >= 30 && price <= 60);
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

applyFilterBtn.addEventListener("click", () => {
  visible = 6; // يرجع يعرض 6 بس مع كل فلترة جديدة
  updateCards();
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visible += step;
    updateCards();
  });
}

updateCards();