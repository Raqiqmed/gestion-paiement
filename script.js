import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBS4GsA2GuI8M_P_HznJnzCEa2ypubDxDc",
  authDomain: "gestion-des-paiements-5f92f.firebaseapp.com",
  databaseURL: "https://gestion-des-paiements-5f92f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gestion-des-paiements-5f92f",
  storageBucket: "gestion-des-paiements-5f92f.appspot.com",
  messagingSenderId: "401494582273",
  appId: "1:401494582273:web:35677f6c168c55576acc00"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Charger les niveaux dans le menu déroulant
async function chargerNiveaux() {
  const snapshot = await get(ref(db, "paiements"));
  const parametres = snapshot.exists() ? snapshot.val() : [];

  const niveaux = [...new Set(parametres.map(row => row.niveau))];
  const select = document.getElementById("niveau-select");

  niveaux.forEach(niveau => {
    const option = document.createElement("option");
    option.value = niveau;
    option.textContent = niveau;
    select.appendChild(option);
  });
}

// Charger les paiements pour un niveau sélectionné
async function chargerPaiements() {
  const niveau = document.getElementById("niveau-select").value;
  const tbody = document.querySelector("#table-paiements tbody");
  tbody.innerHTML = ""; // Effacer les lignes existantes

  if (!niveau) return; // Aucun niveau sélectionné

  const snapshot = await get(ref(db, "paiements"));
  const parametres = snapshot.exists() ? snapshot.val() : [];
  const etudiantsNiveau = parametres.filter(row => row.niveau === niveau);

  etudiantsNiveau.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.etudiant}</td>
      ${row.paiements.map((paid, moisIndex) =>
        `<td><input type="checkbox" data-niveau="${niveau}" data-etudiant="${index}" data-mois="${moisIndex}" ${paid ? "checked" : ""}></td>`
      ).join("")}
    `;
    tbody.appendChild(tr);
  });

  // Ajouter des événements pour synchroniser les cases à cocher
  document.querySelectorAll("#table-paiements input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", miseAJourPaiement);
  });
}

// Mettre à jour Firebase lorsque les cases à cocher changent
async function miseAJourPaiement(e) {
  const checkbox = e.target;
  const niveau = checkbox.dataset.niveau;
  const etudiantIndex = parseInt(checkbox.dataset.etudiant, 10);
  const moisIndex = parseInt(checkbox.dataset.mois, 10);

  const snapshot = await get(ref(db, "paiements"));
  const parametres = snapshot.exists() ? snapshot.val() : [];
  const etudiant = parametres.filter(row => row.niveau === niveau)[etudiantIndex];

  if (etudiant) {
    etudiant.paiements[moisIndex] = checkbox.checked;

    // Sauvegarder les modifications dans Firebase
    await set(ref(db, "paiements"), parametres);
  }
}

// Charger les niveaux au démarrage
window.onload = chargerNiveaux;
