const etudiants = {
  "1": ["Étudiant A", "Étudiant B"],
  "2": ["Étudiant C", "Étudiant D"],
  "3": ["Étudiant E", "Étudiant F"]
};

function chargerEtudiants() {
  const niveau = document.getElementById("niveau-select").value;
  const tbody = document.querySelector("#table-paiements tbody");
  tbody.innerHTML = ""; // Réinitialiser le tableau
  if (etudiants[niveau]) {
    etudiants[niveau].forEach((etudiant) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${etudiant}</td>` +
        Array(12).fill("<td><input type='checkbox'></td>").join("");
      tbody.appendChild(row);
    });
  }
}
