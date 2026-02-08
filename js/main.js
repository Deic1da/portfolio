import { PROFILE, SKILLS, ATTRIBUTES, ACADEMIC_TIMELINE } from "./data.js";
import { el, pct, avg } from "./utils.js";
import { renderSkills } from "./skills.js";
import { renderTimeline } from "./timeline.js";
import { loadGithubProjects } from "./github.js";

init();

function init() {
  byId("btnCv").href = PROFILE.links.cvUrl;
  byId("btnGithub").href = PROFILE.links.githubUrl;
  byId("btnLinkedin").href = PROFILE.links.linkedinUrl;
  byId("btnEmail").href = PROFILE.links.email;

  const chips = byId("summaryChips");
  chips.append(
    chip(`Perfil: Estudante / dev em formação`),
    chip(`Curso: ${PROFILE.course.program} (${PROFILE.course.institution})`),
    chip(`Período atual: ${PROFILE.course.currentPeriod}º / ${PROFILE.course.totalPeriods}º`)
  );

  const kv = byId("courseKVs");
  const totals = PROFILE.course.totals;
  kv.append(
    kvRow("Instituição", PROFILE.course.institution),
    kvRow("Curso", PROFILE.course.program),
    kvRow("Períodos", `${PROFILE.course.totalPeriods}`),
    kvRow("Concluídos", `${PROFILE.course.completedPeriods}`),
    kvRow("Atual", `${PROFILE.course.currentPeriod}º`)
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
    skills: SKILLS,
    defaultExpandedId: defaultExpanded
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
    .filter(c => typeof c.grade === "number");

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
    const grades = graded.filter(a.pick).map(x => x.grade);
    const m = avg(grades);
    const label = (m == null) ? "—" : `${m.toFixed(2).replace(".", ",")}/10`;
    mount.appendChild(
      el("div", { class: "areaRow" }, [
        el("div", { class: "name", text: a.name }),
        el("div", { class: "score mono", text: label })
      ])
    );
  }
}

function byId(id) { return document.getElementById(id); }
function chip(text) { return el("span", { class: "chip", text }); }
function kvRow(k, v) {
  return el("li", {}, [
    el("span", { class: "k", text: k }),
    el("span", { class: "v mono", text: String(v) })
  ]);
}
