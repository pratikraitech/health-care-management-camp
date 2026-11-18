// CareCamp demo interactions. Data is kept in this browser only; no server is connected.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  if (toggle) toggle.addEventListener("click", () => document.querySelector(".nav")?.classList.toggle("nav-open"));

  const search = document.getElementById("campSearch");
  const filter = document.getElementById("campFilter");
  const cards = [...document.querySelectorAll(".camp-card")];
  function filterCamps() {
    const term = (search?.value || "").toLowerCase();
    const category = filter?.value || "all";
    let visible = 0;
    cards.forEach(card => {
      const matches = card.innerText.toLowerCase().includes(term) &&
        (category === "all" || card.querySelector(".tag")?.innerText === category);
      card.hidden = !matches; if (matches) visible++;
    });
    const empty = document.getElementById("emptyState");
    if (empty) empty.hidden = visible > 0;
  }
  search?.addEventListener("input", filterCamps);
  filter?.addEventListener("change", filterCamps);

  const campSelect = document.getElementById("campSelect");
  const params = new URLSearchParams(location.search);
  if (campSelect && params.get("camp")) campSelect.value = params.get("camp");

  const form = document.getElementById("registrationForm");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const registrations = JSON.parse(localStorage.getItem("carecamp_demo_registrations") || "[]");
    registrations.push({...data, createdAt: new Date().toISOString()});
    localStorage.setItem("carecamp_demo_registrations", JSON.stringify(registrations));
    document.getElementById("registrationSuccess").hidden = false;
    form.reset();
  });

  const slotButtons = document.querySelectorAll(".slot:not(.disabled)");
  slotButtons.forEach(button => button.addEventListener("click", () => {
    slotButtons.forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
    const selection = document.getElementById("slotSelection");
    if (selection) selection.textContent = `Selected time: ${button.dataset.slot}. Continue to registration to request this slot.`;
  }));
  document.getElementById("printReport")?.addEventListener("click", () => window.print());
});