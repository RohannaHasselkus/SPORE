// Mock gene dataset (replace with real API calls later)
const genes = [
  { id: 'AN1234', name: 'Aspf1', description: 'Transcription factor in Aspergillus nidulans' },
  { id: 'AN5678', name: 'StuA', description: 'Developmental regulator' },
  { id: 'AN9101', name: 'BrlA', description: 'Conidiation-specific transcription factor' },
  { id: 'AN1122', name: 'LaeA', description: 'Global regulator of secondary metabolism' },
];

// Fetch genes - here simulated with Promise for async style
function fetchGenes() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(genes), 300); // Simulate latency
  });
}

// Search genes by query string (case insensitive, matches id or name)
function searchGenes(query, geneList) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return geneList.filter(
    (g) =>
      g.id.toLowerCase().includes(q) ||
      g.name.toLowerCase().includes(q)
  );
}

// Render gene results into container element
function renderResults(results, container) {
  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = '<p>No genes found.</p>';
    return;
  }
  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  results.forEach((gene) => {
    const li = document.createElement('li');
    li.style.marginBottom = '1rem';
    li.innerHTML = `
      <strong>${gene.name} (${gene.id})</strong><br>
      <small>${gene.description}</small>
    `;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// Setup event listener for search input and button
async function setupGeneSearch() {
  const input = document.querySelector('.search input');
  const button = document.querySelector('.search button');
  const resultsContainer = document.querySelector('.results');

  const geneData = await fetchGenes();

  function doSearch() {
    const query = input.value;
    const results = searchGenes(query, geneData);
    renderResults(results, resultsContainer);
  }

  button.addEventListener('click', doSearch);
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', setupGeneSearch);
