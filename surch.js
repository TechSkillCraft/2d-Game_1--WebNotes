const searchInput = document.getElementById("search");

// Filtered stages and index
let filteredStages = [];
let currentFilteredIndex = 0;

// Handle Enter key in search
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    doSearch();
  }
});

// Live search as user types
searchInput.addEventListener("input", doSearch);

function doSearch() {
  const query = searchInput.value.trim().toLowerCase();

  // Reset batch counter
  loadedStages = 0;

  if (!query) {
    filteredStages = [];
    currentFilteredIndex = 0;
    renderStages(); // show all
    return;
  }

  filteredStages = stages.filter((stage) =>
    stage.name.toLowerCase().includes(query)
  );

  if (filteredStages.length === 0) {
    stageList.innerHTML = "<li>No stages found.</li>";
    content.innerHTML = "<p>No content.</p>";
    return;
  }

  currentFilteredIndex = 0;
  loadFilteredStage(currentFilteredIndex);
  renderStages(query); // update sidebar with filtered stages
}

function loadFilteredStage(index) {
  const stage = filteredStages[index];
  if (!stage) return;
  currentStage = stage.number; // update global currentStage
  loadStage(stage.number);
}

// Override NEXT button
document.getElementById("nextBtn").addEventListener("click", () => {
  if (filteredStages.length > 0) {
    if (currentFilteredIndex < filteredStages.length - 1) {
      currentFilteredIndex++;
      loadFilteredStage(currentFilteredIndex);
    } else {
      alert("No more search results.");
    }
  }
});

// Override PREV button
document.getElementById("prevBtn").addEventListener("click", () => {
  if (filteredStages.length > 0) {
    if (currentFilteredIndex > 0) {
      currentFilteredIndex--;
      loadFilteredStage(currentFilteredIndex);
    } else {
      alert("Already at first search result.");
    }
  }
});
