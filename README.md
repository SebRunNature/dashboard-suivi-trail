# Dashboard Suivi Trail — Run Nature

> Application web gratuite de suivi de préparation trail. Sans inscription, sans cloud, 100% hors ligne.

**[Ouvrir l'app](https://sebrunnature.github.io/dashboard-suivi-trail/)** · **[Blog Run Nature](https://run-nature.com)**

---

## Ce que fait l'app

- **Journal de séances** — saisie manuelle ou import GPX (Garmin, Suunto, Strava). Course, Trail, Marche, Vélo Home Trainer, Tapis, Renforcement, Rameur.
- **Stats en temps réel** — km, D+, RPE moyen, BPM, kcal, vitesse. Graphique hebdomadaire km/D+.
- **Charge globale** — intègre le cross-training (vélo HT ÷ 2,4 = équivalent CAP) et le tapis de course.
- **Trail objectif + Readiness** — indicateur vert/orange/rouge selon ton volume réel (km et D+) vs ta course cible, en mode Finisher ou Performance.
- **Chrono estimé** — fourchette de temps pour ton trail objectif (modèle de Riegel adapté au trail : km + D+/100), avec indicateur de fiabilité.
- **VO₂max estimée & allures d'entraînement** — VDOT (Daniels & Gilbert) calculé sur ta meilleure performance, puis allures E / M / T / I / R.
- **Coach IA** (opt-in) — analyse ta semaine et génère un plan 7 jours personnalisé via Claude (Anthropic). Détecte surcharge, monotonie, progression trop rapide, D+ insuffisant — contextualisé à ton objectif.
- **Courbe Forme / Fatigue / Fraîcheur** — modèle Banister/PMC (charge = RPE × minutes ; Fatigue 7 j, Fitness 42 j, Forme = Fitness − Fatigue) avec ratio ACWR et statut de forme. Disponible dès 10 jours de données.
- **Zones RPE** — répartition facile/modéré/dur avec indicateur polarisation 80/20.
- **Export PDF** — journal complet de séances + plan Coach IA imprimable.
- **Partage image** — génère des images 1080×1080 (plusieurs gabarits) style Coros/Garmin pour Instagram.
- **Sauvegarde & restauration** — export/import complet des données au format JSON (fichier téléchargeable, indépendant du localStorage).
- **Mode sombre / clair** — bascule accessible depuis la sidebar, préférence mémorisée.
- **Sidebar navigation** — tableau de bord, séances, Coach IA, objectif ; applications sœurs (Minuteur d'intervalle, Âge chrono vs âge bio) ; ressources (exercices de renfo, méthode utilisée, RPE, EF, FAQ).

---

## Données & confidentialité

Toutes les données restent dans le `localStorage` de ton navigateur. **Rien n'est envoyé sur un serveur** sauf les appels Coach IA (opt-in, clé API personnelle). Une Content-Security-Policy limite les connexions sortantes à `api.anthropic.com`, et les champs saisis (nom/URL de l'objectif) sont échappés contre les injections XSS.

---

## Installation

### Sur téléphone (PWA)
- **Android** — ouvre l'app dans Chrome, bannière "Ajouter à l'écran d'accueil" automatique
- **iPhone** — Safari → bouton Partager → "Sur l'écran d'accueil"

### En local
```bash
# Clone le repo
git clone https://github.com/sebrunnature/dashboard-suivi-trail.git

# Ouvre simplement index.html dans ton navigateur
# Aucune dépendance, aucun build, aucune installation
```

---

## Coach IA — configuration

1. Crée un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Génère une clé API
3. Dans l'app → sidebar → "Clé API Coach IA" → colle ta clé
4. La clé reste stockée localement, jamais transmise à Run Nature

Modèle par défaut : **Claude Haiku 4.5** (~0,01 $/analyse, recommandé). **Claude Sonnet 4.6** (~0,03 $/analyse) pour des analyses plus détaillées, et **Claude Opus 4.8** en mode premium (nettement plus cher). Le choix du modèle se change directement depuis le résultat du Coach IA.

---

## Structure du projet

```
/
├── index.html          # App complète (PWA single-file)
├── sw.js               # Service Worker — cache offline
├── manifest.json       # Manifest PWA
├── icon-192.png        # Icône Android
├── icon-512.png        # Icône Play Store
├── icon-180.png        # Icône iPhone/iPad
└── icon_dashboard.svg  # Icône vectorielle source
```

---

## Versioning

Le cache SW est versionné manuellement dans `sw.js` :
```js
const CACHE = 'srn-dashboard-trail-v2.0';
```
Changer cette version à chaque déploiement pour que les utilisateurs reçoivent la mise à jour.

---

## À propos

Développé par **Sébastien** — traileur M45 luxembourgeois, VO₂max 54, qui s'est préparé pour [The Great Escape 200km / 8000D+](https://run-nature.com/2026/05/04/mon-objectif-ultime-pour-cette-annee-2026-the-great-escape-200k-8000d/) (septembre 2026).

L'app est utilisée chaque semaine pour ma propre préparation et améliorée en continu sur le terrain.

**Run Nature** · [run-nature.com](https://run-nature.com) · Luxembourg
