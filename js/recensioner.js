/** Recensionssidan: sparar och visar omdömen i webbläsarens localStorage. */
const RECENSIONER_NYCKEL = "reviews";

function hamtaRecensioner() {
  try {
    return JSON.parse(localStorage.getItem(RECENSIONER_NYCKEL)) || [];
  } catch {
    return [];
  }
}

function sparaRecensioner(recensioner) {
  localStorage.setItem(RECENSIONER_NYCKEL, JSON.stringify(recensioner));
}

function stjarnor(betyg) {
  const b = Math.max(1, Math.min(5, Number(betyg)));
  return "★".repeat(b) + "☆".repeat(5 - b);
}

function skyddaHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function visaRecensioner() {
  const lista = document.getElementById("reviewsList");
  const recensioner = hamtaRecensioner();

  if (!lista) return;

  if (recensioner.length === 0) {
    lista.innerHTML = `<div class="review-empty">Inga recensioner ännu. Skriv den första!</div>`;
    return;
  }

  lista.innerHTML = recensioner
    .slice()
    .reverse()
    .map((r) => {
      const datum = new Date(r.createdAt).toLocaleDateString("sv-SE");
      return `
        <article class="review-card">
          <div class="review-top">
            <div class="review-name">${skyddaHtml(r.name)}</div>
            <div class="review-rating" title="${r.rating}/5">${stjarnor(r.rating)}</div>
          </div>
          <div class="review-text">${skyddaHtml(r.text)}</div>
          <div class="review-meta">${datum}</div>
        </article>
      `;
    })
    .join("");
}

function laggTillRecension({ namn, betyg, text }) {
  const recensioner = hamtaRecensioner();
  recensioner.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: namn,
    rating: Number(betyg),
    text,
    createdAt: Date.now(),
  });
  sparaRecensioner(recensioner);
}

function laggTillExempelrecensioner() {
  const befintliga = hamtaRecensioner();
  if (befintliga.length > 0) return;

  const exempel = [
    { namn: "Jonas Johansson", betyg: 5, text: "Riktigt hög kvalitet. Enkelt, fräscht och gott!" },
    { namn: "Maja Nilsson", betyg: 4, text: "Bra smaker och tydliga recept. Sparar mycket tid." },
    { namn: "Ali H", betyg: 5, text: "Perfekt för träning – lätt att hålla koll på maten." },
    { namn: "Elin Svensson", betyg: 4, text: "Maten känns fräsch och portionerna är lagom." },
  ];

  exempel.forEach((e) => laggTillRecension(e));
}

document.addEventListener("DOMContentLoaded", () => {
  const recensionsFormular = document.getElementById("reviewForm");
  const meddelande = document.getElementById("reviewsMsg");
  const exempelKnapp = document.getElementById("seedBtn");
  const rensaKnapp = document.getElementById("clearBtn");

  visaRecensioner();

  exempelKnapp?.addEventListener("click", () => {
    laggTillExempelrecensioner();
    visaRecensioner();
    if (meddelande) meddelande.textContent = "Exempelrecensioner inlagda.";
  });

  rensaKnapp?.addEventListener("click", () => {
    localStorage.removeItem(RECENSIONER_NYCKEL);
    visaRecensioner();
    if (meddelande) meddelande.textContent = "Alla recensioner rensade.";
  });

  recensionsFormular?.addEventListener("submit", (e) => {
    e.preventDefault();

    const namn = document.getElementById("reviewName").value.trim();
    const betyg = document.getElementById("reviewRating").value;
    const text = document.getElementById("reviewText").value.trim();

    if (!namn || !text) return;

    laggTillRecension({ namn, betyg, text });
    recensionsFormular.reset();
    visaRecensioner();

    if (meddelande) meddelande.textContent = "Recensionen är sparad!";
  });
});
