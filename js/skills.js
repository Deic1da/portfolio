import { el, clamp } from "./utils.js";

export function renderSkills({ mount, panel, skills, defaultSelectedId }) {
  mount.innerHTML = "";
  panel.innerHTML = "";

  const sorted = [...skills].sort((a, b) => (b.affinity ?? 0) - (a.affinity ?? 0));
  const initialId = defaultSelectedId ?? sorted[0]?.id;
  let selectedId = initialId;
  const levelView = new Map();

  for (const s of sorted) {
    const level = typeof s.level === "number" ? clamp(s.level, 1, 10) : null;
    levelView.set(s.id, level ?? 5);

    const card = el("div", { class: "skillCard", "data-skill": s.id, role: "button", tabindex: "0" });

    const top = el("div", { class: "skillTop" }, [
      el("div", { class: "skillName", text: s.name }),
      el("div", { class: "skillLevel mono", text: level ? `${level}/10` : "—/10" })
    ]);

    const bar = el("div", { class: "skillBar", "aria-hidden": "true" }, [
      el("span", { style: `width:${level ? (level * 10) : 0}%` })
    ]);

    card.append(top, bar);

    const open = (ev) => {
      ev?.preventDefault?.();
      ev?.stopPropagation?.();
      selectedId = s.id;
      updateAll();
      card.focus({ preventScroll: true });
    };

    card.addEventListener("click", open);
    card.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") open(ev);
    });

    mount.appendChild(card);
  }

  const panelTag = el("div", { class: "skillsPanelTag muted mono", text: "Detalhes da skill" });
  const panelTitle = el("div", { class: "skillsPanelTitle" });
  const panelLevel = el("div", { class: "skillsPanelLevel mono" });

  const btnPrev = el("button", {
    class: "iconBtn",
    type: "button",
    "aria-label": "Nível anterior",
    onclick: (ev) => {
      ev.preventDefault();
      changeLevel(-1);
    }
  }, ["←"]);

  const btnNext = el("button", {
    class: "iconBtn",
    type: "button",
    "aria-label": "Próximo nível",
    onclick: (ev) => {
      ev.preventDefault();
      changeLevel(1);
    }
  }, ["→"]);

  const levelText = el("div", { class: "levelText mono" });
  const levelNav = el("div", { class: "levelNav" }, [btnPrev, levelText, btnNext]);

  const panelMeta = el("div", { class: "skillsPanelMeta" }, [panelLevel, levelNav]);
  const panelDesc = el("div", { class: "skillsPanelDesc" });
  const panelNote = el("div", { class: "skillsPanelNote" });

  panel.append(panelTag, panelTitle, panelMeta, panelDesc, panelNote);

  function setPanel(skill) {
    const level = levelView.get(skill.id) ?? 5;
    panelTitle.textContent = skill.name;
    panelLevel.textContent = `Nível atual: ${level}/10`;
    levelText.textContent = `${level}/10`;
    panelDesc.textContent = skill.levelDescriptions?.[level] ?? "Sem descrição para este nível (edite em data.js).";
    panelNote.textContent = skill.note ?? "";
  }

  function updateCards() {
    const cards = mount.querySelectorAll(".skillCard");
    cards.forEach(card => {
      const id = card.getAttribute("data-skill");
      const skill = skills.find(x => x.id === id);
      const level = levelView.get(id) ?? 5;
      const levelEl = card.querySelector(".skillLevel");
      const barEl = card.querySelector(".skillBar span");
      if (levelEl) levelEl.textContent = `${level}/10`;
      if (barEl) barEl.style.width = `${level * 10}%`;
      card.classList.toggle("is-active", id === selectedId);
      if (skill) card.setAttribute("aria-pressed", id === selectedId ? "true" : "false");
    });
  }

  function updateAll() {
    const current = skills.find(s => s.id === selectedId) ?? sorted[0];
    if (!current) return;
    setPanel(current);
    updateCards();
  }

  function changeLevel(delta) {
    const current = skills.find(s => s.id === selectedId);
    if (!current) return;
    const cur = levelView.get(current.id) ?? 5;
    const next = clamp(cur + delta, 1, 10);
    levelView.set(current.id, next);
    setPanel(current);
    updateCards();
  }

  if (initialId) {
    selectedId = initialId;
  }
  updateAll();
}
