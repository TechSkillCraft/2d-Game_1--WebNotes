let currentStage = 0;
const stageList = document.getElementById("stageList");
const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");

const STAGES_PER_LOAD = 20;
let loadedStages = 0;

// Render stages list
function renderStages(filter = "") {
  stageList.innerHTML = "";
  const filteredStages = stages.filter((stage) =>
    stage.name.toLowerCase().includes(filter.toLowerCase())
  );

  const stagesToShow = filteredStages.slice(0, STAGES_PER_LOAD + loadedStages);
  stagesToShow.forEach((stage) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="loadStage(${stage.number})">${stage.number} - ${stage.name}</a>`;
    stageList.appendChild(li);
  });

  if (filteredStages.length > stagesToShow.length) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" id="loadMoreBtn">Load more...</a>`;
    stageList.appendChild(li);
    document.getElementById("loadMoreBtn").onclick = () => {
      loadedStages += STAGES_PER_LOAD;
      renderStages(filter);
    };
  }
}

// Load single stage markdown
function loadStage(stage) {
  currentStage = stage;
  content.innerHTML = "<p>Loading...</p>";

  fetch(`stages/stage${stage}.md`)
    .then((res) => {
      if (!res.ok) throw new Error("missing");
      return res.text();
    })
    .then((md) => {
      md = md.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        if (src.startsWith("http") || src.startsWith("/")) return match;
        return `![${alt}](images/${src})`;
      });

      content.innerHTML = marked.parse(md);
      Prism.highlightAll();
      addCopyButtons();

      content.querySelectorAll("img").forEach((img) => {
        img.style.maxWidth = "500px";
        img.style.width = "100%";
        img.style.height = "auto";
      });
    })
    .catch(() => {
      content.innerHTML = `<h2>Stage ${stage}</h2><p>Content will be added soon…</p>`;
    });
}

// Navigation buttons
document.getElementById("nextBtn").onclick = () => loadStage(currentStage + 1);
document.getElementById("prevBtn").onclick = () => {
  if (currentStage > 1) loadStage(currentStage - 1);
};

// Add copy buttons on code blocks
function addCopyButtons() {
  document.querySelectorAll("pre").forEach((block) => {
    if (block.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.innerText = "Copy";
    btn.onclick = () => {
      navigator.clipboard.writeText(block.innerText);
      btn.innerText = "Copied!";
      setTimeout(() => (btn.innerText = "Copy"), 1200);
    };
    block.appendChild(btn);
  });
}

// Sidebar toggle
document.getElementById("hamburger").onclick = () =>
  sidebar.classList.add("show");

document.getElementById("closeSidebar").onclick = () =>
  sidebar.classList.remove("show");

// ⭐⭐ NEW: CLICK OUTSIDE TO CLOSE SIDEBAR ⭐⭐
document.addEventListener("click", function (event) {
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("closeSidebar");

  if (
    sidebar.classList.contains("show") &&
    !sidebar.contains(event.target) &&
    event.target !== hamburger &&
    event.target !== closeBtn
  ) {
    sidebar.classList.remove("show");
  }
});

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  document.getElementById("themeToggle").innerText =
    document.body.classList.contains("dark") ? "☀ Light Mode" : "🌙 Dark Mode";
};

// Initial stage load
renderStages();
