# FitnessDev

FitnessDev est une appli web React/Vite pour une salle de fitness.
Gérez abonnements, produits, cours et paiements facilement.

## Prérequis

- Installez Node.js v16+ et Git avant de commencer.

## Installation

- Clonez avec git clone git@github.com:MelvinAssi/FitnessDev.git.
- Entrez dans cd FitnessDev.
- Installez avec npm install.
- Ajoutez npm install axios si besoin.
- Ajoutez npm install styled-components si besoin.
- Ajoutez npm install firebase si besoin.
- Lancez avec npm run dev.
- Ouvrez http://localhost:5173/.

## Mise à jour

- Basculez sur main avec git checkout main.
- Mettez à jour avec git pull origin main.
- Installez npm install si package.json change.
- Ajoutez npm install axios si besoin.
- Ajoutez npm install styled-components si besoin.
- Ajoutez npm install firebase si besoin.
- Relancez avec npm run dev.

## Gestion des branches

Équipe : Sébastien (seb), Tressir (trey), Melvin (melvin_dev).

### Créer sa branche

- Créez avec git checkout -b seb (ou trey, melvin_dev) si nouvelle.
- Ou basculez avec git checkout seb (ou trey, melvin_dev).
- Mettez à jour avec git pull origin main si voulu.

### Ajouter, valider, pousser

- Vérifiez avec git status.
- Ajoutez avec git add . ou git add src/App.jsx.
- Validez avec git commit -m "Ajout feature".
- Poussez avec git push origin seb (ou trey, melvin_dev).
- Première fois : git push --set-upstream origin seb (ou trey, melvin_dev).

### Fusionner dans main

- Mettez à jour avec git checkout seb (ou trey, melvin_dev).
- Puis git pull origin seb (ou trey, melvin_dev).
- Basculez avec git checkout main.
- Mettez à jour avec git pull origin main.
- Fusionnez avec git merge seb (ou trey, melvin_dev).
- Si conflit, git add src/App.jsx et git commit.
- Poussez avec git push origin main.

## Structure

- src/ : Code source (components/, pages/, services/).
- .gitignore : Ignore node_modules/, .vscode/.
- .prettierrc : Config Prettier.
- eslint.config.js : Config ESLint.
- vite.config.js : Config Vite.
- package.json : Dépendances.
- package-lock.json : Versions exactes.
- public/ : Assets.
- index.html : Entrée HTML.

## Commandes utiles

- Lancez avec npm run dev ou npm run dev -- --host.
- Vérifiez Prettier avec npx prettier --check src/**/*.jsx.
- Corrigez avec npx prettier --write src/**/*.jsx.
- Vérifiez ESLint avec npx eslint --config eslint.config.js src/**/*.jsx.
- Corrigez avec npx eslint --config eslint.config.js src/**/*.jsx --fix.

## Résumé du cahier des charges

### Contexte
Appli web pour une salle de fitness avec gestion des abonnés,
produits, cours, paiements, coachs et admin.

### Fonctionnalités
- S’inscrire : compte avec nom, prénom, adresse, e-mail, mot de passe.
- Se connecter : numéro unique et mot de passe.
- Gérer profil : modifier infos personnelles.
- Acheter produit : protéines, boissons avec date/quantité.
- Souscrire abonnement : avec ou sans engagement.
- Résilier abonnement : annuler un actif.
- S’inscrire à cours : choisir nom, horaire, coach.
- Payer : produits, abonnements, cours par carte.
- Admin : gérer tous les comptes.

### Technologies
- Frontend : React.js.
- Backend : Node.js/Express.js.
- BD : PostgreSQL, Firebase.
- Test : Postman.
- Déploiement : Docker.

### Arborescence
- Pages : Accueil, Contact, Signup, Login, Profil,
  Administrateur, Abonnement, Produit, Panier, Paiement.

## Contributeurs

- Melvin Assi (melvin_dev)
- Sébastien (seb)
- Tressir (trey)
