const cards = document.querySelectorAll(".up-card");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const skillFilter = document.getElementById("skillFilter");
const levelFilter = document.getElementById("levelFilter"); // هيفعل ده
const priceFilter = document.getElementById("priceFilter");
const applyFilterBtn = document.getElementById("applyFilter");

let visible = 6;
const step = 6;

/* ===== HELPERS ===== */
function getFilteredCards() {
  return [...cards].filter(card => {
    // 1. Skill Filter
    const skillValue = skillFilter.value;
    const cardSkill = card.dataset.skill || "";
    const skillMatch = (skillValue === "all" || cardSkill === skillValue);

    // 2. Level Filter (إضافة الفلتر ده عشان يشتغل)
    const levelValue = levelFilter.value;
    const cardLevel = card.dataset.level || "";
    const levelMatch = (levelValue === "all" || cardLevel === levelValue);

    // 3. Price Filter (تعديل الأرقام لتناسب القانون الدولي)
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

  // إخفاء الكل أولاً
  cards.forEach(card => card.classList.add("hidden-card"));

  // إظهار المفلتر فقط بناءً على المتاح
  filteredCards.slice(0, visible).forEach(card => {
    card.classList.remove("hidden-card");
  });

  // تحديث زرار Load More
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (visible < filteredCards.length) ? "block" : "none";
  }
}

/* ===== APPLY FILTER BUTTON ===== */
applyFilterBtn.addEventListener("click", () => {
  visible = 6; // نرجعها 6 عند كل ضغطة فلتر جديدة عشان يبدأ من الأول
  updateCards();
});

/* ===== LOAD MORE ===== */
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visible += step;
    updateCards();
  });
}

/* ===== INIT ===== */
updateCards();