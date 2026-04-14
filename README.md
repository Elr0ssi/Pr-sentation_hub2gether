# Hub2gether Pitch Deck — fichiers image à préparer

Ce README liste **exactement** les PNG utilisés dans le développement actuel (`index.html`), section par section.

---

## 1) Logos principaux

| Section | Fichier | Statut |
|---|---|---|
| Logo menu (topbar) | `assets/actifs/logo-menu.png` | utilisé en priorité |
| Fallback logo menu | `assets/logo-hub2gether.png` | utilisé si le logo menu manque |

---

## 2) Slide Problème

| Section | Fichier |
|---|---|
| Visuel problème | `assets/problem-visual.png` |

---

## 3) Slide Solution néon (avant Entreprise/Salarié)

| Section | Fichier |
|---|---|
| Visuel central solution | `assets/solution-neon-center.png` |

---

## 4) Slide Présentation Entreprise / Salarié

| Section | Fichier |
|---|---|
| Visuel bas entreprise | `assets/actifs/visuel-bas-entreprise.png` |
| Visuel bas salarié | `assets/actifs/visuel-bas-salarie.png` |

---

## 5) Slide Interface (carousel)

| Slide | Fichier |
|---|---|
| Dashboard RH | `assets/entreprise-rh.png` |
| Tournois | `assets/entreprise-tournois.png` |
| Paiements | `assets/entreprise-paiements.png` |
| Partenaires | `assets/entreprise-partenaires.png` |
| Capture custom | `assets/entreprise-custom.png` |

---

## 6) Slide “Le moment idéal” (4 rectangles)

> Icônes PNG à mettre dans les rectangles (numéro + logo).

| Rectangle | Fichier |
|---|---|
| 1 | `assets/solution-icon-1.png` |
| 2 | `assets/solution-icon-2.png` |
| 3 | `assets/solution-icon-3.png` |
| 4 (législatif) | `assets/solution-icon-4.png` |

---

## Recommandations format

- Format conseillé : **PNG** (fond transparent si icône).
- Pour les visuels larges (slides) : largeur 1600px+.
- Pour les icônes des rectangles : carré (ex. 256x256 ou 512x512).

---

## Vérification rapide

Vous pouvez contrôler les chemins attendus avec :

```bash
rg -n 'src="assets' index.html
```

