const STORAGE_KEY = "reviews";

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function stars(rating) {
  const r = Math.max(1, Math.min(5, Number(rating)));
  return "★".repeat(r) + "☆".repeat(5 - r);
}

function renderReviews() {
  const list = document.getElementById("reviewsList");
  const reviews = loadReviews();

  if (!list) return;

  if (reviews.length === 0) {
    list.innerHTML = `<div class="review-empty">Inga recensioner ännu. Skriv den första!</div>`;
    return;
  }

  list.innerHTML = reviews
    .slice()
    .reverse()
    .map((rev) => {
      const date = new Date(rev.createdAt).toLocaleDateString("sv-SE");
      return `
        <article class="review-card">
          <div class="review-top">
            <div class="review-name">${escapeHtml(rev.name)}</div>
            <div class="review-rating" title="${rev.rating}/5">${stars(rev.rating)}</div>
          </div>
          <div class="review-text">${escapeHtml(rev.text)}</div>
          <div class="review-meta">${date}</div>
        </article>
      `;
    })
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function addReview({ name, rating, text }) {
  const reviews = loadReviews();
  reviews.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    rating: Number(rating),
    text,
    createdAt: Date.now(),
  });
  saveReviews(reviews);
}

function seedExampleReviews() {
  const existing = loadReviews();
  if (existing.length > 0) return;

  const examples = [
    { name: "Jonas Johansson", rating: 5, text: "Riktigt hög kvalitet. Enkelt, fräscht och gott!" },
    { name: "Maja Nilsson", rating: 4, text: "Bra smaker och tydliga recept. Sparar mycket tid." },
    { name: "Ali H", rating: 5, text: "Perfekt för träning – lätt att hålla koll på maten." },
    { name: "Elin Svensson", rating: 4, text: "Maten känns fräsch och portionerna är lagom." },
  ];

  examples.forEach(addReview);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const msg = document.getElementById("reviewsMsg");
  const seedBtn = document.getElementById("seedBtn");
  const clearBtn = document.getElementById("clearBtn");

  renderReviews();

  seedBtn?.addEventListener("click", () => {
    seedExampleReviews();
    renderReviews();
    if (msg) msg.textContent = "Exempelrecensioner inlagda.";
  });

  clearBtn?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    renderReviews();
    if (msg) msg.textContent = "Alla recensioner rensade.";
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const rating = document.getElementById("reviewRating").value;
    const text = document.getElementById("reviewText").value.trim();

    if (!name || !text) return;

    addReview({ name, rating, text });
    form.reset();
    renderReviews();

    if (msg) msg.textContent = "Recensionen är sparad!";
  });
});