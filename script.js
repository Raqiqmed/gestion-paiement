// Charger ou initialiser les données
let parametres = JSON.parse(localStorage.getItem("paiements")) || [
  { niveau: "Niveau 1", etudiant: "Étudiant A", paiements: [true, false, true, false, false, false, false, false, false, false, false, false] },
  { niveau: "Niveau 1", etudiant: "Étudiant B", paiements: [false, true, false, false, false, false, false, false, false, false, false, false] },
  { niveau: "Niveau 2", etudiant: "Étudiant C", paiements: [true, true, true, false, false, false, false, false, false, false, false, false] },
];

// Sauvegarder les données dans localStorage
function sauvegarderDonnees() {
  localStorage.setItem("paiements", JSON.stringify(parametres));
}

// Charger les paramètres dynamiques
function chargerParametres() {
  const tbody = document.querySelector("#table-parametres tbody");
  tbody.innerHTML = ""; // Réinitialiser le tableau
  parametres.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.niveau}</td>
      <td>${row.etudiant}</td>
      ${row.paiements
        .map(
          (paid, moisIndex) =>
            `<td><input type="checkbox" data-param-index="${index}" data-mois="${moisIndex}" ${paid ? "checked" : ""}></td>`
        )
        .join("")}
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll("#table-parametres input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", miseAJourParametre);
  });
}

// Charger les paiements dynamiques
function chargerPaiements() {
  const niveau = document.getElementById("niveau-select").value;
  const tbody = document.querySelector("#table-paiements tbody");
  tbody.innerHTML = ""; // Réinitialiser le tableau
  const etudiantsNiveau = parametres.filter((row) => row.niveau === niveau);
  etudiantsNiveau.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.etudiant}</td>
      ${row.paiements
        .map(
          (paid, moisIndex) =>
            `<td><input type="checkbox" data-niveau="${niveau}" data-etudiant="${index}" data-mois="${moisIndex}" ${paid ? "checked" : ""}></td>`
        )
        .join("")}
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll("#table-paiements input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", miseAJourPaiement);
  });
}

// Mise à jour depuis Paiements
function miseAJourPaiement(e) {
  const checkbox = e.target;
  const niveau = checkbox.dataset.niveau;
  const etudiantIndex = parseInt(checkbox.dataset.etudiant, 10);
  const moisIndex = parseInt(checkbox.dataset.mois, 10);

  parametres.find((row) => row.niveau === niveau && parametres.indexOf(row) === etudiantIndex).paiements[moisIndex] = checkbox.checked;
  sauvegarderDonnees();
  chargerParametres();
}

// Mise à jour depuis Paramètres
function miseAJourParametre(e) {
  const checkbox = e.target;
  const paramIndex = parseInt(checkbox.dataset.paramIndex, 10);
  const moisIndex = parseInt(checkbox.dataset.mois, 10);

  parametres[paramIndex].paiements[moisIndex] = checkbox.checked;
  sauvegarderDonnees();
  chargerPaiements();
}

// Charger les paramètres ou paiements au démarrage
if (document.querySelector("#table-parametres")) {
  window.onload = chargerParametres;
} else if (document.querySelector("#niveau-select")) {
  window.onload = chargerPaiements;
}
