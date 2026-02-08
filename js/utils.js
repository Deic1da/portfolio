export function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

export function pct(value, max){
  if (!max || max <= 0) return 0;
  return clamp((value / max) * 100, 0, 100);
}

export function formatGrade(g){
  if (typeof g !== "number") return "—";
  return g.toFixed(2).replace(".", ",");
}

export function statusLabel(status){
  if (status === "done") return { text: "Concluído", cls: "ok" };
  if (status === "doing") return { text: "Cursando", cls: "warn" };
  return { text: "Planejado", cls: "bad" };
}

export function el(tag, attrs = {}, children = []){
  const node = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of children){
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

export function avg(nums){
  const arr = nums.filter(n => typeof n === "number" && !Number.isNaN(n));
  if (!arr.length) return null;
  const s = arr.reduce((a,b)=>a+b,0);
  return s / arr.length;
}
