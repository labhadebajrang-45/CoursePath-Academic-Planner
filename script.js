const courses = [
  {
    code: "CSE101",
    name: "Programming Fundamentals",
    credits: 4,
    sem: 1,
    pre: [],
  },
  {
    code: "MAT101",
    name: "Engineering Mathematics I",
    credits: 4,
    sem: 1,
    pre: [],
  },
  {
    code: "DS201",
    name: "Data Structures",
    credits: 4,
    sem: 2,
    pre: ["CSE101"],
  },
  {
    code: "DB201",
    name: "Database Management Systems",
    credits: 4,
    sem: 2,
    pre: ["CSE101"],
  },
  {
    code: "WEB201",
    name: "Web Technology",
    credits: 3,
    sem: 2,
    pre: ["CSE101"],
  },
  {
    code: "AI301",
    name: "Artificial Intelligence",
    credits: 4,
    sem: 3,
    pre: ["DS201", "MAT101"],
  },
  {
    code: "ML302",
    name: "Machine Learning",
    credits: 4,
    sem: 4,
    pre: ["AI301"],
  },
];

function $(id) {
  return document.getElementById(id);
}
function getPlan() {
  return JSON.parse(localStorage.getItem("coursepath_plan") || "[]");
}
function savePlan(p) {
  localStorage.setItem("coursepath_plan", JSON.stringify(p));
}
function renderCourses(filter = "") {
  const box = $("courseList");
  if (!box) return;
  const list = courses.filter((c) =>
    (c.code + " " + c.name).toLowerCase().includes(filter.toLowerCase()),
  );
  box.innerHTML = list
    .map(
      (c) =>
        `<div class="card course"><span class="tag">${c.code}</span><h3>${c.name}</h3><div class="muted">${c.credits} credits · Semester ${c.sem}</div><div>Prerequisites: ${c.pre.length ? c.pre.join(", ") : "None"}</div><button class="btn" onclick="addCourse('${c.code}')">Add to Planner</button></div>`,
    )
    .join("");
}
function addCourse(code) {
  const p = getPlan();
  if (!p.includes(code)) {
    p.push(code);
    savePlan(p);
    alert(code + " added to planner.");
  }
}
function renderPlanner() {
  const box = $("plannerList");
  if (!box) return;
  const p = getPlan();
  box.innerHTML = p.length
    ? p
        .map((code) => {
          const c = courses.find((x) => x.code === code);
          return `<tr><td>${c.code}</td><td>${c.name}</td><td>${c.credits}</td><td>Semester ${c.sem}</td><td><button class="btn secondary" onclick="removeCourse('${c.code}')">Remove</button></td></tr>`;
        })
        .join("")
    : `<tr><td colspan="5">No courses added yet. Go to Courses.</td></tr>`;
  const total = p.reduce(
    (s, code) => s + (courses.find((c) => c.code === code)?.credits || 0),
    0,
  );
  if ($("totalCredits")) $("totalCredits").textContent = total;
  if ($("totalCourses")) $("totalCourses").textContent = p.length;
}
function removeCourse(code) {
  savePlan(getPlan().filter((x) => x !== code));
  renderPlanner();
}
function drawGraph() {
  const svg = $("graph");
  if (!svg) return;
  svg.innerHTML = `<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#98a2b3"/></marker></defs>`;
  const pos = {
    CSE101: [80, 80],
    MAT101: [80, 240],
    DS201: [290, 80],
    DB201: [290, 170],
    WEB201: [290, 260],
    AI301: [510, 120],
    ML302: [730, 120],
  };
  courses.forEach((c) =>
    c.pre.forEach((p) => {
      const a = pos[p],
        b = pos[c.code];
      svg.insertAdjacentHTML(
        "beforeend",
        `<line class="edge" x1="${a[0] + 80}" y1="${a[1] + 25}" x2="${b[0]}" y2="${b[1] + 25}"/>`,
      );
    }),
  );
  Object.entries(pos).forEach(([code, [x, y]]) =>
    svg.insertAdjacentHTML(
      "beforeend",
      `<rect class="node" x="${x}" y="${y}" width="100" height="50" rx="10"/><text class="node-text" x="${x + 50}" y="${y + 30}" text-anchor="middle">${code}</text>`,
    ),
  );
}
async function submitFeedback(e) {
  e.preventDefault();
  const data = {
    name: $("name").value,
    email: $("email").value,
    message: $("message").value,
  };
  try {
    const r = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const j = await r.json();
    $("feedbackMsg").textContent = j.message;
  } catch (err) {
    $("feedbackMsg").textContent =
      "Backend not running. Your form is ready for database mode.";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  renderPlanner();
  drawGraph();
  const search = $("search");
  if (search)
    search.addEventListener("input", (e) => renderCourses(e.target.value));
  const form = $("feedbackForm");
  if (form) form.addEventListener("submit", submitFeedback);
});
