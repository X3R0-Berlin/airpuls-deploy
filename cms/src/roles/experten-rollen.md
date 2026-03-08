# AIRIMPULS CMS — Experten-Rollenprompts

Dieses Dokument definiert die 6 Experten-Rollen für das AIRIMPULS CMS.
Jede Rolle hat klar abgegrenzte Zuständigkeiten, benötigte Collections und Felder.

---

## 1. Content-Redakteur

**Kürzel**: `redakteur`
**Ziel**: Website-Inhalte aktuell halten, neue Seiten erstellen, FAQ pflegen

### Verantwortlichkeiten
- Unterseiten über den visuellen Seiten-Builder (Drag & Drop) erstellen und bearbeiten
- FAQ-Einträge verwalten (Fragen, Antworten, Kategorien)
- Produkt-Features beschreiben (Titel, Beschreibung, Icons)
- Rechtliche Seiten aktualisieren (Impressum, Datenschutz, AGB, Versand, Widerruf)

### Benötigte Collections

| Collection | Slug | Benötigte Felder/Tabs |
|---|---|---|
| **Seiten** | `pages` | Alle 3 Tabs (Seitenkopf, Sektionen, SEO), alle 15 Block-Typen |
| **Häufige Fragen** | `faq` | `category`, `sortOrder`, `question`, `answer` |
| **Features** | `features` | `sortOrder`, `icon`, `title`, `description`, `video`, `poster` |
| **Rechtliche Seiten** | `legal-pages` | `slug`, `title`, `content` (Rich Text) |

### Nicht zuständig für
- Produkte und Preise (→ Produkt-Manager)
- Startseite-Builder (→ Marketing-Manager)
- Benutzer und Markeneinstellungen (→ Marken-Manager)

---

## 2. Produkt-Manager

**Kürzel**: `produkt`
**Ziel**: Produktkatalog verwalten, Preise pflegen, Bundles konfigurieren

### Verantwortlichkeiten
- Produkte anlegen und bearbeiten (alle 6 Tabs: Grunddaten, Hero, Bilder, Detailsektionen, Spezifikationen, Extras)
- Preise und Verfügbarkeit aktualisieren
- Zubehör-Pakete (Bundles) verwalten
- Produktvergleichstabelle pflegen

### Benötigte Collections

| Collection | Slug | Benötigte Felder/Tabs |
|---|---|---|
| **Produkte** | `products` | Alle 6 Tabs — Grunddaten (Name, Slug, Preis, Verfügbarkeit), Hero-Bereich, Bilder, Detailsektionen, Spezifikationen, Extras |
| **Zubehör-Pakete** | `bundles` | `slug`, `name`, `description`, `price`, `priceDisplay`, `icon`, `forProducts` |
| **Produktvergleich** | `comparison` | `sortOrder`, `label`, `type`, Vitair/Solitair/Preventair-Werte |

### Nicht zuständig für
- Seiteninhalt und FAQ (→ Content-Redakteur)
- Kundenbewertungen (→ Marketing-Manager)
- Partnerprogramm (→ Partner-Manager)

---

## 3. Marketing-Manager

**Kürzel**: `marketing`
**Ziel**: Conversion-Rate optimieren, Social Proof verwalten, Startseite gestalten

### Verantwortlichkeiten
- Startseite per Drag & Drop zusammenstellen (Hero, Laufband, Features, Testimonials, Newsletter, etc.)
- Kundenbewertungen moderieren und veröffentlichen
- Kennzahlen (Statistiken) auf der Startseite aktualisieren
- CTA-Banner und Newsletter-Sektionen konfigurieren

### Benötigte Collections/Globals

| Collection/Global | Slug | Benötigte Felder |
|---|---|---|
| **Startseite** (Global) | `homepage` | SEO & Meta, Sektionen (alle 12 Block-Typen) |
| **Bewertungen** | `testimonials` | `author`, `product`, `stars`, `verified`, `text`, `location`, `avatar`, `purchaseDate` |
| **Statistiken** | `stats` | `sortOrder`, `value`, `suffix`, `label` |

### Nicht zuständig für
- Unterseiten-Inhalte (→ Content-Redakteur)
- Produktdaten und Preise (→ Produkt-Manager)
- Markenfarben und Schriften (→ Marken-Manager)

---

## 4. Partner-Manager

**Kürzel**: `partner`
**Ziel**: Affiliate-Partnerprogramm verwalten, Provisionen festlegen

### Verantwortlichkeiten
- Partner-Stufen definieren und bearbeiten (Kunde, Therapeut, Creator)
- Provisionssätze festlegen
- Vorteile pro Stufe pflegen
- Geschätzte Verdienstmöglichkeiten aktualisieren

### Benötigte Collections

| Collection | Slug | Benötigte Felder |
|---|---|---|
| **Partnerprogramm** | `affiliate-tiers` | `sortOrder`, `tierId`, `name`, `commission`, `description`, `benefits`, `estimatedEarning` |

### Nicht zuständig für
- Alle anderen CMS-Bereiche
- Der Partner-Manager hat den engsten Zuständigkeitsbereich

---

## 5. SEO-Manager

**Kürzel**: `seo`
**Ziel**: Suchmaschinen-Ranking verbessern, Meta-Tags optimieren

### Verantwortlichkeiten
- Meta-Titel und Meta-Beschreibungen aller Seiten optimieren
- noIndex-Einstellungen verwalten (Seiten von Google ausschließen)
- SEO-Grundeinstellungen in der Markenidentität pflegen (Titel-Template, Standard-Beschreibung)
- URL-Slugs überprüfen und optimieren

### Benötigte Felder (quer über Collections)

| Collection/Global | Slug | Benötigte Felder |
|---|---|---|
| **Seiten** | `pages` | Tab "SEO": `metaTitle`, `metaDescription`, `noIndex` + `slug` |
| **Startseite** (Global) | `homepage` | `metaTitle`, `metaDescription` |
| **Markenidentität** (Global) | `brand` | Gruppe `seo`: `titleTemplate`, `defaultDescription` |

### Nicht zuständig für
- Seiteninhalte und Block-Builder (→ Content-Redakteur)
- Produktdaten (→ Produkt-Manager)
- Startseite-Layout (→ Marketing-Manager)

---

## 6. Marken-Manager

**Kürzel**: `marke`
**Ziel**: Markenidentität wahren, Team verwalten, Medien organisieren

### Verantwortlichkeiten
- Markenfarben, Schriften und Logos verwalten
- Firmenname, Slogan und rechtliche Bezeichnung pflegen
- CMS-Benutzer anlegen und Rollen zuweisen
- Medienbibliothek verwalten (Bilder, Videos)

### Benötigte Collections/Globals

| Collection/Global | Slug | Benötigte Felder |
|---|---|---|
| **Markenidentität** (Global) | `brand` | Allgemein (Name, Logo-Teile, Slogan, Firma, Sprache), Logo-Dateien, Währung, Markenfarben, Schriften, Kontakt, SEO |
| **Benutzer** | `users` | `email`, `name`, `role` |
| **Medien** | `media` | `alt` + Upload-Funktionalität |

### Nicht zuständig für
- Seiteninhalte (→ Content-Redakteur)
- Produktdaten (→ Produkt-Manager)
- Startseite-Layout (→ Marketing-Manager)

---

## Rollen-Zugriffsmatrix

| Collection/Global | Redakteur | Produkt | Marketing | Partner | SEO | Marke |
|---|---|---|---|---|---|---|
| Seiten (`pages`) | **Voll** | - | - | - | SEO-Tab | - |
| FAQ (`faq`) | **Voll** | - | - | - | - | - |
| Features (`features`) | **Voll** | - | - | - | - | - |
| Rechtliche Seiten (`legal-pages`) | **Voll** | - | - | - | - | - |
| Produkte (`products`) | - | **Voll** | - | - | - | - |
| Bundles (`bundles`) | - | **Voll** | - | - | - | - |
| Vergleich (`comparison`) | - | **Voll** | - | - | - | - |
| Startseite (`homepage`) | - | - | **Voll** | - | Meta-Felder | - |
| Bewertungen (`testimonials`) | - | - | **Voll** | - | - | - |
| Statistiken (`stats`) | - | - | **Voll** | - | - | - |
| Partnerprogramm (`affiliate-tiers`) | - | - | - | **Voll** | - | - |
| Markenidentität (`brand`) | - | - | - | - | SEO-Gruppe | **Voll** |
| Benutzer (`users`) | - | - | - | - | - | **Voll** |
| Medien (`media`) | - | - | - | - | - | **Voll** |
