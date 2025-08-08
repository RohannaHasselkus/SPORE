// script.js
function searchDatabase() {
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  // Simulated search results — replace with real backend query
  const dummyResults = [
    { name: "creA", type: "Transcription Factor", species: "Aspergillus nidulans" },
    { name: "xlnR", type: "Regulator", species: "Neurospora crassa" }
  ];

  const filtered = dummyResults.filter(item =>
    item.name.includes(query) ||
    item.type.toLowerCase().includes(query) ||
    item.species.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  resultsDiv.innerHTML = filtered
    .map(item => `<div><strong>${item.name}</strong> (${item.type}) - <em>${item.species}</em></div>`)
    .join("");
}
<script>
  const toggle = document.getElementById("dark-mode-toggle");

  // Load preference from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });
</script>
