import { el, formatGrade, statusLabel } from "./utils.js";

export function renderTimeline({ mount, timeline }) {
  mount.innerHTML = "";

  for (const p of timeline) {
    const st = statusLabel(p.status);

    const headerLeft = el("div", { class:"periodTitle" }, [
      el("span", { class:`dot ${st.cls}`, "aria-hidden":"true" }),
      el("span", { text: p.title })
    ]);

    const meta = el("div", { class:"periodMeta" }, [
      el("span", { class:"badge", text: st.text }),
      p.term ? el("span", { class:"badge", text: `Período letivo: ${p.term}` }) : null,
      el("span", { class:"badge", text: `${sumCH(p.courses)}h` })
    ]);

    const top = el("div", { class:"periodTop" }, [headerLeft, meta]);

    const list = el("div", { class:"periodList" });

    for (const c of p.courses) {
      const left = el("div", { class:"left" }, [
        el("div", { class:"name", text: c.name }),
        el("div", { class:"sub mono", text: c.status ? `Status: ${c.status}` : "Status: —" })
      ]);

      const right = el("div", { class:"right" }, [
        el("div", { class:"grade mono", text: typeof c.grade === "number" ? `Nota: ${formatGrade(c.grade)}` : "Nota: —" }),
        el("div", { class:"ch mono", text: c.ch ? `CH: ${c.ch}h` : "CH: —" })
      ]);

      list.appendChild(el("div", { class:"courseRow" }, [left, right]));
    }

    const wrap = el("div", { class:"period" }, [top, list]);
    mount.appendChild(wrap);
  }
}

function sumCH(courses = []){
  return courses.reduce((acc,c)=> acc + (Number(c.ch)||0), 0);
}
