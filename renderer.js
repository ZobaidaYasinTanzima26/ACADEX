const STORAGE_KEY = "acadex_insights_data";

const form = document.getElementById("courseForm");
const semesterInput = document.getElementById("semester");
const courseInput = document.getElementById("course");
const learnedInput = document.getElementById("learned");
const futureHelpInput = document.getElementById("futureHelp");
const tipInput = document.getElementById("tip");

const insightsList = document.getElementById("insightsList");
const semesterFilter = document.getElementById("semesterFilter");
const checklistBtn = document.getElementById("checklistBtn");

function loadInsights() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveInsights(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function escapeHTML(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInsights() {
  const selected = semesterFilter ? semesterFilter.value : "All Semesters";
  const all = loadInsights();

  const filtered =
    selected === "All Semesters"
      ? all
      : all.filter((item) => item.semester === selected);

  if (!insightsList) return;

  if (filtered.length === 0) {
    insightsList.innerHTML = `<p class="empty-state">No insights added for this semester yet. Add one from the left form!</p>`;
    return;
  }

  insightsList.innerHTML = filtered
    .map(
      (item) => `
      <div class="insight-card">
        <div class="insight-top">
          <span class="badge">${escapeHTML(item.semester)}</span>
          <button type="button" class="delete-btn" data-id="${escapeHTML(item.id)}">Delete</button>
        </div>
        <h3>${escapeHTML(item.course)}</h3>
        <p><strong>What I Learned:</strong> ${escapeHTML(item.learned)}</p>
        <p><strong>How &amp; Where It Helps:</strong> ${escapeHTML(item.futureHelp)}</p>
        <p><strong>Preparation Tip:</strong> ${escapeHTML(item.tip)}</p>
      </div>
    `
    )
    .join("");
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newInsight = {
      id: Date.now().toString(),
      semester: semesterInput.value.trim(),
      course: courseInput.value.trim(),
      learned: learnedInput.value.trim(),
      futureHelp: futureHelpInput.value.trim(),
      tip: tipInput.value.trim()
    };

    if (!newInsight.course) return;

    const current = loadInsights();
    current.unshift(newInsight);
    saveInsights(current);

    form.reset();
    renderInsights();
  });
}

if (insightsList) {
  insightsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.getAttribute("data-id");
      const updated = loadInsights().filter((item) => item.id !== id);
      saveInsights(updated);
      renderInsights();
    }
  });
}

if (semesterFilter) {
  semesterFilter.addEventListener("change", renderInsights);
}

if (checklistBtn) {
  checklistBtn.addEventListener("click", () => {
    window.open(
      "guide.html",
      "PreSemesterChecklist",
      "width=540,height=620,resizable=yes,scrollbars=yes"
    );
  });
}

renderInsights();