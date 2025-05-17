# Guide de déploiement pour l'application de Gestion de Bilan

Ce guide vous explique étape par étape comment mettre en ligne votre application web de gestion de bilan mensuel, même si vous n'avez aucune notion en programmation.

## Prérequis

- Un compte email (Gmail, Yahoo, etc.)
- Une connexion internet stable

## Méthode 1: Déploiement facile avec Netlify (recommandé)

Netlify est un service gratuit qui permet d'héberger des sites web statiques comme notre application.

### Étape 1: Créer un compte Netlify

1. Visitez [https://www.netlify.com/](https://www.netlify.com/)
2. Cliquez sur "Sign up" (S'inscrire)
3. Choisissez de vous connecter avec votre compte Google, GitHub, ou en utilisant votre email

### Étape 2: Préparer les fichiers pour le déploiement

1. Téléchargez tous les fichiers de l'application (le dossier complet `bilan-app`)
2. Assurez-vous que tous les fichiers sont présents:
   - index.html
   - styles.css
   - app.js
   - netlify.toml
   - README.md

### Étape 3: Déployer le site

1. Dans votre tableau de bord Netlify, cliquez sur "Sites"
2. Glissez-déposez le dossier `bilan-app` dans la zone indiquée "Drag and drop your site folder here"
3. Attendez quelques secondes que Netlify traite vos fichiers
4. Votre site est maintenant en ligne!

### Étape 4: Changer le nom de domaine (facultatif)

Par défaut, Netlify attribue un nom de domaine aléatoire à votre site (ex: happy-tesla-3f8d92.netlify.app)

Pour le changer:
1. Dans le tableau de bord de votre site, cliquez sur "Domain settings"
2. Sous "Custom domains", cliquez sur "Options" puis "Edit site name"
3. Entrez un nom plus simple à retenir (ex: mon-bilan-mensuel)
4. Votre site sera accessible à l'adresse: mon-bilan-mensuel.netlify.app

## Méthode 2: Utilisation locale (sans mise en ligne)

Si vous préférez utiliser l'application sur votre ordinateur uniquement:

1. Téléchargez tous les fichiers dans un dossier sur votre ordinateur
2. Ouvrez le fichier "index.html" avec votre navigateur web (Chrome, Firefox, Edge, etc.)
3. L'application fonctionnera directement dans votre navigateur
4. Les données seront sauvegardées localement sur votre ordinateur

## Utilisation de l'application

### Première utilisation

1. L'application s'ouvre sur le tableau de bord, montrant un aperçu des ventes et dépenses
2. Utilisez le menu en haut pour naviguer entre les différentes sections:
   - Tableau de bord: aperçu général
   - Saisie de ventes: ajout des ventes quotidiennes
   - Produits: gestion de vos produits et services
   - Rapports: génération de rapports et analyses

### Saisie des ventes

1. Cliquez sur "Saisie de ventes" dans le menu
2. Sélectionnez la date (par défaut, c'est la date du jour)
3. Choisissez le produit ou service dans la liste déroulante
4. Entrez la quantité
5. Le prix unitaire se remplit automatiquement, mais vous pouvez le modifier
6. Cliquez sur "Ajouter"
7. La vente apparaît dans le tableau à droite

### Gestion des produits

1. Cliquez sur "Produits" dans le menu
2. Pour ajouter un nouveau produit:
   - Remplissez le formulaire à gauche
   - Cliquez sur "Enregistrer"
3. Pour modifier un produit existant:
   - Cliquez sur l'icône de crayon à côté du produit
   - Modifiez les informations dans le formulaire
   - Cliquez sur "Enregistrer"

### Génération de rapports

1. Cliquez sur "Rapports" dans le menu
2. Choisissez le type de rapport (journalier, mensuel, par catégorie)
3. Sélectionnez la période concernée
4. Cliquez sur "Générer"
5. Vous pouvez imprimer le rapport en cliquant sur "Imprimer"

## Remarques importantes

- Toutes les données sont stockées localement dans votre navigateur
- Pour éviter la perte de données, n'effacez pas les données de navigation de votre navigateur
- Pour une utilisation sur plusieurs ordinateurs, il est recommandé de déployer l'application sur Netlify
- Chaque installation de l'application aura ses propres données

## Support et aide

Si vous rencontrez des problèmes avec l'application, vous pouvez:
1. Rafraîchir la page
2. Vérifier que vous utilisez un navigateur récent (Chrome, Firefox, Edge)
3. Contacter le développeur pour assistance