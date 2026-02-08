import { el } from "./utils.js";
export async function loadGithubProjects({ mount, user, metaEl, hintEl, max = 8 }) {
  mount.innerHTML = "";
  metaEl.textContent = `GitHub: @${user}`;

  const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`;

  try {
    const res = await fetch(url, { headers: { "Accept": "application/vnd.github+json" } });
    if (!res.ok) {
      hintEl.textContent = `Não consegui puxar os repositórios agora (HTTP ${res.status}).`;
      return;
    }

    const repos = await res.json();
    const filtered = repos
      .filter(r => !r.fork && !r.private)
      .sort((a,b)=> new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, max);

    if (!filtered.length) {
      hintEl.textContent = "Nenhum repositório público encontrado (ou todos são forks).";
      return;
    }

    for (const r of filtered) {
      const languages = await loadRepoLanguages(r);
      const top = el("div", { class:"projectTop" }, [
        el("div", {}, [
          el("div", { class:"projectTitle", text: r.name }),
          el("div", { class:"muted hint", text: r.description || "Sem descrição." })
        ]),
        el("a", { class:"smallLink", href: r.html_url, target:"_blank", rel:"noreferrer", text:"abrir" })
      ]);

      const languageBadges = (languages.length ? languages : (r.language ? [r.language] : []))
        .map(lang => el("span", { class:"badge ok", text: lang }));

      const badges = el("div", { class:"badges" }, [
        ...languageBadges,
        el("span", { class:"badge", text: `★ ${r.stargazers_count}` }),
        el("span", { class:"badge", text: `⎇ ${r.forks_count}` }),
        el("span", { class:"badge warn", text: `update: ${fmtDate(r.pushed_at)}` })
      ].filter(Boolean));

      const card = el("div", { class:"project" }, [top, badges]);
      mount.appendChild(card);
    }

    hintEl.textContent = `Mostrando ${filtered.length} repositórios públicos mais recentes (sem forks).`;
  } catch (e) {
    hintEl.textContent = "Falha ao carregar projetos (verifique conexão ou limite de requisições do GitHub).";
  }
}

async function loadRepoLanguages(repo) {
  if (!repo?.languages_url) return [];
  try {
    const res = await fetch(repo.languages_url, { headers: { "Accept": "application/vnd.github+json" } });
    if (!res.ok) return [];
    const data = await res.json();
    return Object.keys(data);
  } catch (e) {
    return [];
  }
}

function fmtDate(iso){
  if (!iso) return "—";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}
