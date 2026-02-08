import { el } from "./utils.js";

export function renderTimeline({ mount, timeline }) {
  mount.innerHTML = "";

  const scroller = el("div", { class: "timelineScroller" });
  const track = el("div", { class: "timelineCards", role: "list", "aria-label": "Períodos acadêmicos" });

  timeline.forEach((period) => {
    const statusMap = {
      done: "Concluído",
      doing: "Cursando",
      planned: "Planejado"
    };
    const statusText = statusMap[period.status] ?? "Planejado";
    const header = el("div", { class: "timelineCardHeader" }, [
      el("div", { class: "timelineCardTitle", text: period.title }),
      el("div", { class: "timelineCardStatus", text: statusText })
    ]);
    const list = el("ul", { class: "timelineCourseList" });

    for (const course of period.courses) {
      list.appendChild(el("li", { text: course.name }));
    }

    const card = el("article", { class: `timelineCard ${period.status}`, role: "listitem" }, [header, list]);
    track.appendChild(card);
  });

  scroller.appendChild(track);
  mount.appendChild(scroller);
}
