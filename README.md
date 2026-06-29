# Dashboard Suivi Trail — Run Nature

> Application web gratuite de suivi de préparation trail. Sans inscription, sans cloud, 100% hors ligne.

**[Ouvrir l'app](https://sebrunnature.github.io/dashboard-suivi-trail/)** · **[Blog Run Nature](https://run-nature.com)**

---

## Ce que fait l'app

- **Journal de séances** — saisie manuelle ou import GPX (Garmin, Suunto, Strava). Course, Trail, Vélo Home Trainer, Tapis, Renforcement, Rameur.
- **Stats en temps réel** — km, D+, RPE moyen, BPM, kcal, vitesse. Graphique hebdomadaire km/D+.
- **Charge globale** — intègre le cross-training (vélo HT ÷ 2,4 = équivalent CAP) et le tapis de course.
- **Trail objectif + Readiness** — indicateur vert/orange/rouge selon ton volume réel vs ta course cible.
- **Coach IA** (opt-in) — analyse ta semaine et génère un plan 7 jours personnalisé via Claude (Anthropic). Détecte surcharge, monotonie, progression trop rapide, D+ insuffisant — contextualisé à ton objectif.
- **Graphiques charge 4 semaines et zones RPE** — répartition facile/modéré/dur avec indicateur polarisation 80/20.
- **Export PDF** — journal complet de séances + plan Coach IA imprimable.
- **Partage image** — génère une image 1080×1080 style Coros/Garmin pour Instagram.
- **Sidebar navigation** — tableau de bord, séances, Coach IA, objectif, ressources.

---

## Données & confidentialité

Toutes les données restent dans le `localStorage` de ton navigateur. **Rien n'est envoyé sur un serveur** sauf les appels Coach IA (opt-in, clé API personnelle, moins de 0,02€ par analyse).

---

## Installation

### Sur téléphone (PWA)
- **Android** — ouvre l'app dans Chrome, bannière "Ajouter à l'écran d'accueil" automatique
- **iPhone** — Safari → bouton Partager → "Sur l'écran d'accueil"

### En local
```bash
# Clone le repo
git clone https://github.com/sebrunnature/run-nature-apps.git

# Ouvre simplement index.html dans ton navigateur
# Aucune dépendance, aucun build, aucune installation
```

---

## Coach IA — configuration

1. Crée un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Génère une clé API
3. Dans l'app → sidebar → "Clé API Coach IA" → colle ta clé
4. La clé reste stockée localement, jamais transmise à Run Nature

Modèle par défaut : **Claude Haiku 4.5** (rapide, économique). Sonnet 4.6 disponible pour des analyses plus détaillées.

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
const CACHE = 'srn-dashboard-trail-v41';
```
Incrémenter ce numéro à chaque déploiement pour que les utilisateurs reçoivent la mise à jour.

---

## À propos

Développé par **Sébastien** — traileur M45 luxembourgeois, VO₂max 54, en préparation pour [The Great Escape 200km / 8000D+](https://run-nature.com/2026/05/04/mon-objectif-ultime-pour-cette-annee-2026-the-great-escape-200k-8000d/) — septembre 2026.

L'app est utilisée chaque semaine pour ma propre préparation et améliorée en continu sur le terrain.

**Run Nature** · [run-nature.com](https://run-nature.com) · Luxembourg
