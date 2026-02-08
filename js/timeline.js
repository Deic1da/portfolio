import { el, formatGrade, statusLabel } from "./utils.js";

export function renderTimeline({ mount, timeline }) {
  mount.innerHTML = "";

  const scroller = el("div", { class: "timelineScroller" });
  const track = el("div", { class: "timelineTrack", role: "tablist", "aria-label": "Períodos acadêmicos" });
  const details = el("div", { class: "timelineDetails" });

  const defaultIndex = pickDefaultIndex(timeline);

  timeline.forEach((period, index) => {
    const isActive = index === defaultIndex;
    const panelId = `timeline-panel-${index + 1}`;
    const label = `${index + 1}º`;

    const node = el("button", {
      class: `timelineNode ${period.status} ${isActive ? "active" : ""}`,
      id: `timeline-tab-${index + 1}`,
      type: "button",
      role: "tab",
      "aria-selected": String(isActive),
      "aria-controls": panelId,
      "data-index": String(index)
    }, [
      el("span", { class: "timelineNodeLabel", text: label })
    ]);

    node.addEventListener("click", () => setActive(index));
    track.appendChild(node);

    details.appendChild(renderPanel(period, index, panelId, !isActive));
  });

  scroller.appendChild(track);
  mount.append(scroller, details);

  function setActive(nextIndex) {
    const nodes = track.querySelectorAll(".timelineNode");
    const panels = details.querySelectorAll(".timelinePanel");

    nodes.forEach((node, idx) => {
      const active = idx === nextIndex;
      node.classList.toggle("active", active);
      node.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel, idx) => {
      const active = idx === nextIndex;
      panel.toggleAttribute("hidden", !active);
    });
  }
}

function sumCH(courses = []){
  return courses.reduce((acc,c)=> acc + (Number(c.ch)||0), 0);
}

function renderPanel(period, index, panelId, hidden) {
  const st = statusLabel(period.status);

  const title = el("div", { class:"timelinePanelTitle" }, [
    el("span", { class:`dot ${st.cls}`, "aria-hidden":"true" }),
    el("span", { text: period.title })
  ]);

  const meta = el("div", { class:"timelinePanelMeta" }, [
    el("span", { class:`badge ${st.cls}`, text: st.text }),
    period.term ? el("span", { class:"badge", text: `Período letivo: ${period.term}` }) : null,
    el("span", { class:"badge", text: `${sumCH(period.courses)}h` })
  ]);

  const header = el("div", { class:"timelinePanelHeader" }, [title, meta]);
  const list = el("div", { class:"timelinePanelList" });

  for (const c of period.courses) {
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

  return el("div", { class:"timelinePanel", id: panelId, role: "tabpanel", "aria-labelledby": `timeline-tab-${index + 1}`, ...(hidden ? { hidden: "" } : {}) }, [header, list]);
}

function pickDefaultIndex(timeline = []) {
  const doingIndex = timeline.findIndex((p) => p.status === "doing");
  if (doingIndex >= 0) return doingIndex;

  const doneIndexes = timeline
    .map((p, idx) => (p.status === "done" ? idx : -1))
    .filter((idx) => idx >= 0);

  if (doneIndexes.length) return doneIndexes[doneIndexes.length - 1];
  return 0;
}
