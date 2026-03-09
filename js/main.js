import { PROFILE, SKILLS, ATTRIBUTES, ACADEMIC_TIMELINE, AREA_DEFINITIONS } from "./data.js";
import { el, pct, avg, formatGrade } from "./utils.js";
import { renderSkills }     from "./skills.js";
import { renderTimeline }   from "./timeline.js";
import { renderAttributes } from "./attrs.js";

init();
initScrollGlass();
initTyping();

/*  Orchestrator  */

function init() {
  byId("btnCv").href       = PROFILE.links.cvUrl;
  byId("btnGithub").href   = PROFILE.links.githubUrl;
  byId("btnLinkedin").href = PROFILE.links.linkedinUrl;
  byId("btnEmail").href    = PROFILE.links.email;

  initAvatar();
  renderAcademic();
  renderAreaMap();

  const defaultId = [...SKILLS].sort((a, b) => (b.affinity ?? 0) - (a.affinity ?? 0))[0]?.id;
  renderSkills({
    mount:            byId("skillsWrap"),
    panel:            byId("skillsPanel"),
    skills:           SKILLS,
    defaultSelectedId: defaultId,
  });

  renderAttributes({ mount: byId("attrGrid"), attributes: ATTRIBUTES });

  renderTimeline({ mount: byId("timeline"), timeline: ACADEMIC_TIMELINE });
}

/*  Section renderers  */

function renderAcademic() {
  const { course } = PROFILE;
  const { totals }  = course;

  byId("academicIdentity").append(
    kvRow("Instituição", course.institution),
    kvRow("Curso",       course.program),
  );

  const periodPct = pct(course.completedPeriods, course.totalPeriods);
  byId("academicStatus").append(
    kvRow("Período atual",       `${course.currentPeriod}º`),
    kvRow("Total de períodos",   `${course.totalPeriods}`),
    kvRow("Períodos concluídos", `${course.completedPeriods}`),
    kvRow("Conclusão",           `${Math.round(periodPct)}% dos períodos concluídos`),
  );

  const chPct = pct(totals.chIntegralizada, totals.chCurso);
  byId("chText").textContent = `${totals.chIntegralizada} / ${totals.chCurso}h (${Math.round(chPct)}%)`;
  byId("chBar").style.width  = `${chPct}%`;

  const discPct = pct(totals.obrigatoriasConcluidas, totals.obrigatoriasTotal);
  byId("discText").textContent = `${totals.obrigatoriasConcluidas} / ${totals.obrigatoriasTotal} (${Math.round(discPct)}%)`;
  byId("discBar").style.width  = `${discPct}%`;
}

function renderAreaMap() {
  const mount = byId("areaMap");
  mount.innerHTML = "";

  const graded = ACADEMIC_TIMELINE
    .filter(p => p.status === "done")
    .flatMap(p => p.courses)
    .filter(c => c.status === "APR" && typeof c.grade === "number");

  for (const area of AREA_DEFINITIONS) {
    const courses = graded.filter(c => area.test(c.name));
    const m       = avg(courses.map(c => c.grade));
    const score   = m == null ? "" : `${formatGrade(m)}/10`;
    const count   = courses.length;
    const tooltip = count
      ? courses.map(c => c.name).join(", ")
      : "Nenhuma disciplina com nota.";

    mount.appendChild(
      el("div", { class: "areaRow" }, [
        el("div", { class: "name", text: area.name }),
        el("div", { class: "score mono" }, [
          el("span", { text: `${score} (${count} disciplina${count === 1 ? "" : "s"})` }),
          el("button", {
            class:       "areaInfo",
            type:        "button",
            title:       tooltip,
            "aria-label": `Disciplinas consideradas em ${area.name}`,
          }, ["i"]),
        ]),
      ]),
    );
  }
}

/*  UI helpers  */

function initAvatar() {
  const avatar = document.querySelector(".avatar");
  if (!avatar) return;
  const img = avatar.querySelector("img");
  if (!img) return;

  const show = () => avatar.classList.add("has-photo");
  const hide = () => avatar.classList.remove("has-photo");

  img.addEventListener("load",  show, { once: true });
  img.addEventListener("error", hide, { once: true });
  if (img.complete && img.naturalWidth > 0) show();
}

function initScrollGlass() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  const toggle = () => topbar.classList.toggle("scrolled", window.scrollY > 24);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

function initTyping() {
  const target = document.querySelector(".brandText p");
  if (!target) return;

  const text = target.textContent.trim();
  target.textContent = "";
  target.classList.add("typing");

  let i = 0;
  function type() {
    if (i < text.length) {
      target.textContent += text[i++];
      setTimeout(type, 28);
    } else {
      setTimeout(() => target.classList.remove("typing"), 2500);
    }
  }
  setTimeout(type, 350);
}

/*  DOM utilities  */

function byId(id) { return document.getElementById(id); }

function kvRow(label, value) {
  return el("li", {}, [
    el("span", { class: "k", text: label }),
    el("span", { class: "v mono", text: String(value) }),
  ]);
}
