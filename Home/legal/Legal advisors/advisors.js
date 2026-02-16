document.addEventListener("DOMContentLoaded", () => {

  const cards = Array.from(document.querySelectorAll(".up-card"));

  const skillFilter = document.getElementById("skillFilter");
  const levelFilter = document.getElementById("levelFilter");
  const priceFilter = document.getElementById("priceFilter");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let visible = 6;
  const step = 6;

  function getFilteredCards() {
    return cards.filter(card => {

      const skills = (card.dataset.skill || "").toLowerCase().split(" ");
      const selectedSkill = skillFilter.value.toLowerCase();

      const skillMatch =
        selectedSkill === "all" || skills.includes(selectedSkill);

      const level = (card.dataset.level || "").toLowerCase();
      const selectedLevel = levelFilter.value.toLowerCase();

      const levelMatch =
        selectedLevel === "all" || level === selectedLevel;

      const priceText = card.querySelector(".price")?.innerText || "";
      const price = parseInt(priceText.replace(/\D/g, ""));
      let priceMatch = true;

      if (priceFilter.value === "low")  priceMatch = price < 50;
      if (priceFilter.value === "mid")  priceMatch = price >= 50 && price <= 120;
      if (priceFilter.value === "high") priceMatch = price > 120;

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
      loadMoreBtn.style.display =
        visible < filteredCards.length ? "block" : "none";
    }
  }

  /* ✅ فلترة تلقائية عند تغيير أي اختيار */
  [skillFilter, levelFilter, priceFilter].forEach(filter => {
    if (filter) {
      filter.addEventListener("change", () => {
        visible = 6;     // يرجع يعرض من الأول
        updateCards();
      });
    }
  });

  /* LOAD MORE */
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visible += step;
      updateCards();
    });
  }

  updateCards();



});