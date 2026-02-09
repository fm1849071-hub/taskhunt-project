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
    // 1. فلتر المهارات
    const skillValue = skillFilter.value;
    const cardSkill = card.dataset.skill || "";
    const skillMatch = (skillValue === "all" || cardSkill === skillValue);

    // 2. فلتر المستوى (تم تفعيله هنا)
    const levelValue = levelFilter.value;
    const cardLevel = card.dataset.level || "";
    const levelMatch = (levelValue === "all" || cardLevel === levelValue);

    // 3. فلتر الأسعار (مظبوط على ميزانية المستشارين التقيلة)
    let priceMatch = true;
    const priceText = card.querySelector(".price")?.innerText || "";
    const price = parseInt(priceText.replace(/\D/g, ""));

    if (priceFilter.value === "low") priceMatch = price < 100;
    if (priceFilter.value === "mid") priceMatch = (price >= 100 && price <= 250);
    if (priceFilter.value === "high") priceMatch = price > 250;

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
  visible = 6; // لما العميل يفلتر يرجع يشوف أول 6 بس
  updateCards();
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visible += step;
    updateCards();
  });
}

updateCards();