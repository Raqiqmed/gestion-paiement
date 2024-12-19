// Exemple de données dynamiques
const parametres = [
  { niveau: "Niveau 1", etudiant: "Étudiant A", paiements: [true, false, true, false, false, false, false, false, false, false, false, false] },
  { niveau: "Niveau 1", etudiant: "Étudiant B", paiements: [false, true, false, false, false, false, false, false, false, false, false, false] },
  { niveau: "Niveau 2", etudiant: "Étudiant C", paiements: [true, true, true, false, false, false, false, false, false, false, false, false] },
];

// Gérer les onglets
function afficherOnglet(ongletId) {
  document.querySelectorAll('.onglet').forEach((section) => {
    section.classList.add('hidden');
  });
  document.getElementById(ongletId).classList.remove('hidden');
}

// Charger les paiements dynamiques
function chargerPaiements() {
  const niveau = document.getElementById("niveau-select").value;
  const tbody = document.querySelector("#table-paiements tbody");
  tbody.innerHTML = ""; // Réinitialiser le tableau
  const etudiantsNiveau = parametres.filter((row) => row.niveau === niveau);
  etudiantsNiveau.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.etudiant}</td>
      ${row.paiements
        .map(
          (paid) => `<td><input type="checkbox" ${paid ? "checked" : ""}></td>`
        )
        .join("")}
    `;
    tbody.appendChild(tr);
  });
}

// Charger les paramètres dynamiques
function chargerParametres() {
  const tbody = document.querySelector("#table-parametres tbody");
  tbody.innerHTML = ""; // Réinitialiser le tableau
  parametres.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.niveau}</td>
      <td>${row.etudiant}</td>
      ${row.paiements
        .map(
          (paid) => `<td><input type="checkbox" ${paid ? "checked" : ""}></td>`
        )
        .join("")}
    `;
    tbody.appendChild(tr);
  });
}

// Charger les paramètres au démarrage
if (document.querySelector("#table-parametres")) {
  window.onload = chargerParametres;
}
