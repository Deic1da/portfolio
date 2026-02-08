import { el, clamp } from "./utils.js";

export function renderSkills({ mount, skills, defaultExpandedId }) {
  mount.innerHTML = "";

  const sorted = [...skills].sort((a,b)=> (b.affinity ?? 0) - (a.affinity ?? 0));
  const initialId = defaultExpandedId ?? sorted[0]?.id;

  let expandedId = initialId;
  let levelView = new Map();

  for (const s of sorted) {
    const level = typeof s.level === "number" ? clamp(s.level, 1, 10) : null;
    levelView.set(s.id, level ?? 5);

    const card = el("div", { class: "skillCard", "data-skill": s.id, role:"button", tabindex:"0" });

    const top = el("div", { class:"skillTop" }, [
      el("div", { class:"skillName", text: s.name }),
      el("div", { class:"skillLevel mono", text: level ? `${level}/10` : "—/10" })
    ]);

    const bar = el("div", { class:"skillBar", "aria-hidden":"true" }, [
      el("span", { style: `width:${level ? (level*10) : 0}%` })
    ]);

    const details = el("div", { class:"skillDetails" });

    const levelText = el("div", { class:"levelText mono", text: "" });

    const btnPrev = el("button", {
      class:"iconBtn",
      type:"button",
      "aria-label":"Nível anterior",
      onclick: (ev) => {
        ev.preventDefault(); ev.stopPropagation();
        changeLevel(s.id, -1);
      }
    }, ["←"]);

    const btnNext = el("button", {
      class:"iconBtn",
      type:"button",
      "aria-label":"Próximo nível",
      onclick: (ev) => {
        ev.preventDefault(); ev.stopPropagation();
        changeLevel(s.id, +1);
      }
    }, ["→"]);

    const nav = el("div", { class:"levelNav" }, [btnPrev, levelText, btnNext]);

    const detailsTop = el("div", { class:"skillDetailsTop" }, [
      el("div", { class:"muted mono", text: "Detalhes por nível" }),
      nav
    ]);

    const desc = el("div", { class:"skillDesc" });
    const note = el("div", { class:"skillNote", text: s.note ?? "" });

    details.append(detailsTop, desc, note);

    card.append(top, bar, details);

    const open = (ev) => {
      ev?.preventDefault?.();
      ev?.stopPropagation?.();
      expandedId = s.id;
      updateAll();
      card.focus({ preventScroll:true });
    };

    card.addEventListener("click", open);
    card.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") open(ev);
    });

    mount.appendChild(card);

    function setDesc(){
      const lv = levelView.get(s.id) ?? 5;
      levelText.textContent = `${lv}/10`;
      const text = s.levelDescriptions?.[lv] ?? "Sem descrição para este nível (edite em data.js).";
      desc.textContent = text;
    }

    function changeLevel(skillId, delta){
      const cur = levelView.get(skillId) ?? 5;
      const next = clamp(cur + delta, 1, 10);
      levelView.set(skillId, next);
      setDesc();
    }

    function updateCard(){
      const isExpanded = (expandedId === s.id);
      card.classList.toggle("expanded", isExpanded);
      if (isExpanded) setDesc();
    }

    function updateAll(){
      const cards = mount.querySelectorAll(".skillCard");
      cards.forEach(c => {
        const id = c.getAttribute("data-skill");
        c.classList.toggle("expanded", id === expandedId);
      });
      const curCard = mount.querySelector(`.skillCard[data-skill="${expandedId}"]`);
      if (!curCard) return;
      const id = curCard.getAttribute("data-skill");
      const curSkill = skills.find(x => x.id === id);
      if (!curSkill) return;
      const lv = levelView.get(id) ?? 5;
      const lvText = curCard.querySelector(".levelText");
      const descEl = curCard.querySelector(".skillDesc");
      if (lvText) lvText.textContent = `${lv}/10`;
      if (descEl) descEl.textContent = curSkill.levelDescriptions?.[lv] ?? "Sem descrição para este nível (edite em data.js).";
    }

    setDesc();
    updateCard();
  }

  if (initialId) {
    const first = mount.querySelector(`.skillCard[data-skill="${initialId}"]`);
    if (first) first.classList.add("expanded");
  }
}
