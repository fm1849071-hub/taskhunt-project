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
    const skillValue = skillFilter.value;
    const cardSkill = card.dataset.skill || "";
    const skillMatch = (skillValue === "all" || cardSkill === skillValue);

    // 2. فلتر المستوى (Level) - تم إضافته ليعمل مع HTML
    const levelValue = levelFilter.value;
    const cardLevel = card.dataset.level || "";
    const levelMatch = (levelValue === "all" || cardLevel === levelValue);

    // 3. فلتر السعر (تم تعديله ليناسب خبراء الـ GDPR)
    let priceMatch = true;
    const priceText = card.querySelector(".price")?.innerText || "";
    const price = parseInt(priceText.replace(/\D/g, ""));

    if (priceFilter.value === "low") priceMatch = price < 150;
    if (priceFilter.value === "mid") priceMatch = (price >= 150 && price <= 250);
    if (priceFilter.value === "high") priceMatch = price > 250;

    return skillMatch && levelMatch && priceMatch;
  });
}

function updateCards() {
  const filteredCards = getFilteredCards();

  // إخفاء كل الكروت
  cards.forEach(card => card.classList.add("hidden-card"));

  // إظهار الكروت المفلترة فقط
  filteredCards.slice(0, visible).forEach(card => {
    card.classList.remove("hidden-card");
  });

  // التحكم في زر "Load More"
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (visible < filteredCards.length) ? "block" : "none";
  }
}

/* ===== EVENTS ===== */
applyFilterBtn.addEventListener("click", () => {
  visible = 6; // إعادة التصفير عند البحث الجديد
  updateCards();
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visible += step;
    updateCards();
  });
}

// تشغيل الفلترة عند تحميل الصفحة لأول مرة
updateCards();