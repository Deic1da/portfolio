import { el } from "./utils.js";

const STATUS_LABELS = {
  done:    "Concluído",
  doing:   "Cursando",
  planned: "Planejado",
};

export function renderTimeline({ mount, timeline }) {
  mount.innerHTML = "";

  const scroller = el("div", { class: "timelineScroller" });
  const track    = el("div", { class: "timelineCards", role: "list", "aria-label": "Períodos acadêmicos" });

  for (const period of timeline) {
    const statusText = STATUS_LABELS[period.status] ?? "Planejado";

    const header = el("div", { class: "timelineCardHeader" }, [
      el("div", { class: "timelineCardTitle",  text: period.title }),
      el("div", { class: "timelineCardStatus", text: statusText }),
    ]);

    const list = el("ul", { class: "timelineCourseList" });
    for (const course of period.courses) {
      list.appendChild(el("li", { text: course.name }));
    }

    track.appendChild(
      el("article", { class: `timelineCard ${period.status}`, role: "listitem" }, [header, list]),
    );
  }

  scroller.appendChild(track);
  mount.appendChild(scroller);
}
