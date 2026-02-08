import { PROFILE, SKILLS, ATTRIBUTES, ACADEMIC_TIMELINE } from "./data.js";
import { el, pct, avg, formatGrade } from "./utils.js";
import { renderSkills } from "./skills.js";
import { renderTimeline } from "./timeline.js";
import { loadGithubProjects } from "./github.js";

init();

function init() {
  byId("btnCv").href = PROFILE.links.cvUrl;
  byId("btnGithub").href = PROFILE.links.githubUrl;
  byId("btnLinkedin").href = PROFILE.links.linkedinUrl;
  byId("btnEmail").href = PROFILE.links.email;

  const totals = PROFILE.course.totals;
  const academicIdentity = byId("academicIdentity");
  academicIdentity.append(
    kvRow("Instituição", PROFILE.course.institution),
    kvRow("Curso", PROFILE.course.program)
  );

  const academicStatus = byId("academicStatus");
  const periodPct = pct(PROFILE.course.completedPeriods, PROFILE.course.totalPeriods);
  academicStatus.append(
    kvRow("Período atual", `${PROFILE.course.currentPeriod}º em andamento`),
    kvRow("Total de períodos", `${PROFILE.course.totalPeriods}`),
    kvRow("Períodos concluídos", `${PROFILE.course.completedPeriods}`),
    kvRow("Conclusão", `${Math.round(periodPct)}% dos períodos concluídos`)
  );

  const chPct = pct(totals.chIntegralizada, totals.chCurso);
  byId("chText").textContent = `${totals.chIntegralizada} / ${totals.chCurso}h (${Math.round(chPct)}%)`;
  byId("chBar").style.width = `${chPct}%`;

  const discPct = pct(totals.obrigatoriasConcluidas, totals.obrigatoriasTotal);
  byId("discText").textContent = `${totals.obrigatoriasConcluidas} / ${totals.obrigatoriasTotal} (${Math.round(discPct)}%)`;
  byId("discBar").style.width = `${discPct}%`;

  renderAreaMap();

  const defaultExpanded = [...SKILLS].sort((a, b) => (b.affinity ?? 0) - (a.affinity ?? 0))[0]?.id;
  renderSkills({
    mount: byId("skillsWrap"),
    panel: byId("skillsPanel"),
    skills: SKILLS,
    defaultSelectedId: defaultExpanded
  });

  renderAttributes();

  renderTimeline({ mount: byId("timeline"), timeline: ACADEMIC_TIMELINE });

  loadGithubProjects({
    mount: byId("projectsGrid"),
    user: PROFILE.links.githubUser,
    metaEl: byId("ghMeta"),
    hintEl: byId("ghHint"),
    max: 8
  });
}

function renderAttributes() {
  const grid = byId("attrGrid");
  grid.innerHTML = "";
  for (const a of ATTRIBUTES) {
    const top = el("div", { class: "attrTop" }, [
      el("div", { class: "attrName", text: a.name }),
      el("div", { class: "attrVal mono", text: `${a.value}/10` })
    ]);
    const bar = el("div", { class: "attrBar", "aria-hidden": "true" }, [
      el("span", { style: `width:${Math.max(0, Math.min(100, a.value * 10))}%` })
    ]);
    grid.appendChild(el("div", { class: "attrCard" }, [top, bar]));
  }
}

function renderAreaMap() {
  const mount = byId("areaMap");
  mount.innerHTML = "";

  const graded = ACADEMIC_TIMELINE
    .filter(p => p.status === "done")
    .flatMap(p => p.courses)
    .filter(c => c.status === "APR" && typeof c.grade === "number");

  const areas = [
    { name: "Programação", pick: (c) => /programa|laboratório de programação|poo|estrutura de dados/i.test(c.name) },
    { name: "Banco de Dados", pick: (c) => /banco de dados/i.test(c.name) },
    { name: "Matemática / Estatística", pick: (c) => /cálculo|probabilidade|estatística|lógica matemática|matemática computacional/i.test(c.name) },
    { name: "Redes", pick: (c) => /redes/i.test(c.name) },
    { name: "Fundamentos (Arquitetura/SI)", pick: (c) => /arquitetura|organização de computadores|princípios de sistemas|sistemas de informação/i.test(c.name) },
    { name: "Gestão / Engenharia", pick: (c) => /engenharia de software|gestão|empreendedorismo|projeto integrador/i.test(c.name) },
    { name: "Idiomas/Comunicação", pick: (c) => /inglês|libras/i.test(c.name) }
  ];

  for (const a of areas) {
    const courses = graded.filter(a.pick);
    const grades = courses.map(x => x.grade);
    const m = avg(grades);
    const score = (m == null) ? "—" : `${formatGrade(m)}/10`;
    const count = courses.length;
    const countText = `(${count} disciplina${count === 1 ? "" : "s"})`;
    const tooltip = courses.length
      ? courses.map(c => c.name).join(", ")
      : "Nenhuma disciplina com nota.";
    mount.appendChild(
      el("div", { class: "areaRow" }, [
        el("div", { class: "name", text: a.name }),
        el("div", { class: "score mono" }, [
          el("span", { text: `${score} ${countText}` }),
          el("button", {
            class: "areaInfo",
            type: "button",
            title: tooltip,
            "aria-label": `Disciplinas consideradas em ${a.name}`
          }, ["i"])
        ])
      ])
    );
  }
}

function byId(id) { return document.getElementById(id); }
function kvRow(k, v) {
  return el("li", {}, [
    el("span", { class: "k", text: k }),
    el("span", { class: "v mono", text: String(v) })
  ]);
}
