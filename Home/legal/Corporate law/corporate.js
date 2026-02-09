const cards = document.querySelectorAll(".up-card");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const skillFilter = document.getElementById("skillFilter");
const levelFilter = document.getElementById("levelFilter");
const priceFilter = document.getElementById("priceFilter");
const applyFilterBtn = document.getElementById("applyFilter");

let visible = 6; // البداية دايماً 6
const step = 6;

function getFilteredCards() {
  return [...cards].filter(card => {
    // 1. فلتر التخصص
    const skillValue = skillFilter.value;
    const cardSkill = card.dataset.skill || "";
    const skillMatch = (skillValue === "all" || cardSkill === skillValue);

    // 2. فلتر المستوى (تأكدي من حالة الأحرف Junior)
    const levelValue = levelFilter.value;
    const cardLevel = card.dataset.level || "";
    const levelMatch = (levelValue === "all" || cardLevel === levelValue);

    // 3. فلتر السعر
    let priceMatch = true;
    const priceText = card.querySelector(".price")?.innerText || "";
    const price = parseInt(priceText.replace(/\D/g, ""));

    if (priceFilter.value === "low") priceMatch = price < 150;
    else if (priceFilter.value === "mid") priceMatch = (price >= 150 && price <= 250);
    else if (priceFilter.value === "high") priceMatch = price > 250;

    return skillMatch && levelMatch && priceMatch;
  });
}

function updateCards(isFilterAction = false) {
  const filteredCards = getFilteredCards();

  // لو داس على الفلتر، بنعرض كل النتائج المتاحة (الـ 15 كلهم لو مطابقين)
  if (isFilterAction) {
    visible = filteredCards.length;
  }

  // إخفاء الكل
  cards.forEach(card => card.classList.add("hidden-card"));

  // إظهار المفلتر بناءً على المسموح
  filteredCards.slice(0, visible).forEach(card => {
    card.classList.remove("hidden-card");
  });

  // إخفاء الزرار لو مفيش زيادة
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (visible < filteredCards.length) ? "block" : "none";
  }
}

// عند الضغط على Apply Filter
applyFilterBtn.addEventListener("click", () => {
  updateCards(true); // نرسل true عشان يفتح كل الكروت المطابقة
});

// عند الضغط على Load More
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visible += step; // يزود 6 في كل مرة (6 -> 12 -> 18)
    updateCards(false); 
  });
}

// البداية
updateCards(false);