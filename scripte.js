let etudiants = JSON.parse(localStorage.getItem("etudiants")) || {
  "المستوى 1": ["الطالب أ", "الطالب ب"],
  "المستوى 2": ["الطالب ج", "الطالب د"],
  "المستوى 3": ["الطالب هـ", "الطالب و"]
};

let paiements = JSON.parse(localStorage.getItem("paiements")) || {};

function chargerEtudiants() {
  const niveau = document.getElementById("niveau").value;
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (!etudiants[niveau]) return;

  etudiants[niveau].forEach((etudiant, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${etudiant}</td>` +
      Array(6).fill(0).map((_, i) => {
        const checked = paiements[`${niveau}-${etudiant}-${i}`] ? "checked" : "";
        return `<td><input type="checkbox" ${checked} onchange="majPaiement('${niveau}', '${etudiant}', ${i}, this.checked)"></td>`;
      }).join("") +
      `<td><button class="btn btn-danger btn-sm" onclick="supprimerEtudiant('${niveau}', ${index})">حذف</button></td>`;
    tbody.appendChild(tr);
  });
}

function majPaiement(niveau, etudiant, mois, checked) {
  paiements[`${niveau}-${etudiant}-${mois}`] = checked;
  localStorage.setItem("paiements", JSON.stringify(paiements));
}

function ajouterEtudiant() {
  const nom = document.getElementById("nomEtudiant").value.trim();
  const niveau = document.getElementById("niveauEtudiant").value;

  if (!nom || !niveau) return alert("الرجاء إدخال اسم الطالب والمستوى");

  if (!etudiants[niveau]) etudiants[niveau] = [];
  etudiants[niveau].push(nom);

  localStorage.setItem("etudiants", JSON.stringify(etudiants));
  chargerEtudiants();
}

function supprimerEtudiant(niveau, index) {
  if (confirm("هل تريد حذف هذا الطالب؟")) {
    etudiants[niveau].splice(index, 1);
    localStorage.setItem("etudiants", JSON.stringify(etudiants));
    chargerEtudiants();
  }
}

// Enregistrement pour le hors-ligne
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
