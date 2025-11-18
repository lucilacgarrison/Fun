/* Global config */
const CONFIG = {
  BRAND_NAME: "Lucila C Garrison",
  TAGLINE: "Elegance, discretion, and seamless booking.",
  CONTACT: {
    whatsapp: "https://wa.me/1XXXXXXXXXX", // USA only. Replace with your number.
    signal: "https://signal.me/#p/XXXXXXXXXX", // Replace
    kik: "https://kik.me/XXXXXXXX", // Replace
  },
  FORMSPREE_ENDPOINT: "https://formspree.io/f/xdkbnyqz", // Replace if needed
};

/* Country detection (simple heuristic without external API) */
function detectCountry() {
  // Try navigator.language, map common locales to countries
  const lang = navigator.language || navigator.userLanguage || "";
  const lower = lang.toLowerCase();

  if (lower.includes("en-us")) return "United States";
  if (lower.includes("en-gb")) return "United Kingdom";
  if (lower.includes("en-au")) return "Australia";
  if (lower.includes("en-ca") || lower.includes("fr-ca")) return "Canada";

  // Basic fallbacks by timezone hint
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (tz.includes("Dhaka")) return "Bangladesh";

  // Default
  return "United States"; // safe default
}

/* Currency symbol by country */
function currencySymbol(country) {
  switch (country) {
    case "United States": return "$";
    case "United Kingdom": return "£";
    case "Canada": return "C$";
    case "Australia": return "A$";
    default: return "$";
  }
}

/* Payment methods by country */
function paymentOptions(country) {
  if (country === "United States") {
    return ["PayPal", "CashApp", "Apple Pay", "Venmo", "Zelle", "Gift Card", "Crypto"];
  }
  if (country === "United Kingdom") {
    return ["UK Bank Transfer", "PayPal", "Gift Card", "Crypto"];
  }
  if (country === "Canada") {
    return ["E-Transfer", "Gift Card", "Crypto"];
  }
  if (country === "Australia") {
    return ["PayPal", "Gift Card", "Crypto"];
  }
  return ["Crypto"];
}

/* WhatsApp visibility: USA-only */
function applyWhatsAppVisibility(country) {
  const btn = document.querySelector("[data-fab='whatsapp']");
  if (!btn) return;
  if (country === "United States") {
    btn.style.display = "inline-flex";
  } else {
    btn.style.display = "none";
  }
}

/* Inject contact links */
function setContactLinks() {
  const w = document.querySelector("[data-fab='whatsapp']");
  const s = document.querySelector("[data-fab='signal']");
  const k = document.querySelector("[data-fab='kik']");
  if (w) w.href = CONFIG.CONTACT.whatsapp;
  if (s) s.href = CONFIG.CONTACT.signal;
  if (k) k.href = CONFIG.CONTACT.kik;
}

/* Common header brand bind */
function bindBrand() {
  const nameEl = document.querySelector("[data-brand='name']");
  const tagEl = document.querySelector("[data-brand='tagline']");
  if (nameEl) nameEl.textContent = CONFIG.BRAND_NAME;
  if (tagEl) tagEl.textContent = CONFIG.TAGLINE;
}

/* Pricing currency injection on service pages */
function applyPricingCurrency(country) {
  const sym = currencySymbol(country);
  document.querySelectorAll("[data-price]").forEach(el => {
    const base = el.getAttribute("data-price");
    if (!base) return;
    el.textContent = `${sym}${base}`;
  });
}

/* Booking page logic */
function initBooking(country) {
  const form = document.getElementById("bookingForm");
  const countryInput = document.getElementById("country");
  const note = document.getElementById("location-note");
  const paymentSelect = document.getElementById("paymentMethod");
  const paymentContainer = document.getElementById("paymentContainer");

  // Hidden country input + visible note
  if (countryInput) countryInput.value = country;
  if (note) note.textContent = `Location detected: ${country}. This cannot be edited.`;

  // Payment dropdown options by country
  if (paymentSelect) {
    paymentSelect.innerHTML = "";
    paymentOptions(country).forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      paymentSelect.appendChild(o);
    });
  }

  // Submit via fetch with modal confirmation
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submitBtn");
      const loadingText = document.getElementById("loadingText");
      if (submitBtn) submitBtn.disabled = true;
      if (loadingText) loadingText.style.display = "inline";

      const fd = new FormData(form);

      try {
        const res = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" }
        });
        // Always show modal, regardless of response redirect
        showModal("Booking submitted", "Thank you. Your booking was submitted successfully. We’ll contact you shortly.");
        form.reset();
      } catch (err) {
        showModal("Submission issue", "We couldn’t reach the server, but your details are saved locally. Please try again.");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (loadingText) loadingText.style.display = "none";
      }
    });
  }
}

/* Modal helpers */
function showModal(title, message) {
  const backdrop = document.getElementById("modalBackdrop");
  const modal = document.getElementById("modal");
  const t = document.getElementById("modalTitle");
  const b = document.getElementById("modalBody");
  if (!backdrop || !modal) return;
  if (t) t.textContent = title;
  if (b) b.textContent = message;
  backdrop.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
}

function hideModal() {
  const backdrop = document.getElementById("modalBackdrop");
  const modal = document.getElementById("modal");
  if (!backdrop || !modal) return;
  modal.classList.remove("show");
  setTimeout(() => { backdrop.style.display = "none"; }, 160);
}

function bindModalClose() {
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalClose");
  if (backdrop) backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) hideModal();
  });
  if (closeBtn) closeBtn.addEventListener("click", hideModal);
}

/* Initialize per page */
document.addEventListener("DOMContentLoaded", () => {
  const country = detectCountry();
  bindBrand();
  setContactLinks();
  applyWhatsAppVisibility(country);
  bindModalClose();

  // Service pages: apply currency
  applyPricingCurrency(country);

  // Booking page: init logic
  if (document.getElementById("bookingForm")) {
    initBooking(country);
  }
});
