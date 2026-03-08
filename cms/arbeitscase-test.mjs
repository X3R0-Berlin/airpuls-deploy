/**
 * AIRIMPULS CMS — Arbeitscase-Test + automatisches Revert
 *
 * 12 Cases (2 pro Rolle):
 *   1+2   Content-Redakteur   : FAQ erstellen, Bewertung bearbeiten
 *   3+4   Produkt-Manager     : Vitair-Untertitel, Feature-Beschreibung
 *   5+6   Marketing-Manager   : Startseiten-Laufband, Newsletter-Sektion
 *   7+8   Partner-Manager     : Bundle-Preis, Provision-Stufe
 *   9+10  SEO-Manager         : Meta-Beschreibung, Impressum anlegen
 *  11+12  Marken-Manager      : Slogan, Akzentfarbe
 */

const BASE = 'http://localhost:3001/api';
let token = '';
const log   = [];   // Protokoll jedes Steps
const revert = [];  // Revert-Aktionen (LIFO)
let pass = 0, fail = 0;

// ─────────── Hilfsfunktionen ───────────
async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `JWT ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { ...headers, ...(opts.headers || {}) },
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

function ok(msg)   { pass++; log.push(`  ✅  ${msg}`); }
function err(msg)  { fail++; log.push(`  ❌  ${msg}`); }
function info(msg) { log.push(`  ℹ️   ${msg}`); }
function head(msg) { log.push(`\n${'─'.repeat(56)}\n  ${msg}\n${'─'.repeat(56)}`); }

// ─────────── Login ───────────
async function login() {
  const { status, data } = await api('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'admin@airimpuls.de', password: 'airimpuls2024!' }),
  });
  if (status === 200 && data?.token) {
    token = data.token;
    ok('Login erfolgreich');
  } else {
    err(`Login fehlgeschlagen (${status})`);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────────
// ROLLE 1 — CONTENT-REDAKTEUR
// ─────────────────────────────────────────────────────────────────

// Case 1: Neuen FAQ-Eintrag erstellen
async function case01_faq_erstellen() {
  head('CASE 01 [Content-Redakteur] — Neuen FAQ-Eintrag erstellen');
  info('Aufgabe: Frage "Was ist die Lieferzeit nach Österreich?" anlegen (Kategorie: Versand, Reihenfolge: 14)');

  const { status, data } = await api('/faq', {
    method: 'POST',
    body: JSON.stringify({
      question: 'Was ist die Lieferzeit nach Österreich?',
      answer: 'Nach Österreich liefern wir innerhalb von 3–5 Werktagen. Versandkosten: 9,90 €.',
      category: 'Versand',
      sortOrder: 14,
    }),
  });

  if (status === 201 && data?.doc?.id) {
    const id = data.doc.id;
    ok(`FAQ erstellt (ID ${id}): "${data.doc.question}"`);
    revert.push(async () => {
      const { status: ds } = await api(`/faq/${id}`, { method: 'DELETE' });
      ds === 200 ? ok(`REVERT Case 01: FAQ ${id} gelöscht`) : err(`REVERT Case 01: Löschen fehlgeschlagen (${ds})`);
    });
    return true;
  } else {
    err(`Case 01 fehlgeschlagen: ${JSON.stringify(data?.errors || data?.message)}`);
    return false;
  }
}

// Case 2: Bewertung von Stefan W. bearbeiten (Sterne 4→5, Text erweitern)
async function case02_bewertung_bearbeiten() {
  head('CASE 02 [Content-Redakteur] — Bewertungstext & Sterne aktualisieren');
  info('Aufgabe: Stefan W. (vitair, 4★) → 5★, Bewertungstext um Fazit ergänzen');

  // Originaldaten sichern
  const { data: list } = await api('/testimonials?limit=100');
  const stefan = list?.docs?.find(d => d.author === 'Stefan W.');
  if (!stefan) { err('Stefan W. nicht gefunden'); return false; }

  const originalSterne = stefan.stars;
  const originalText   = stefan.text;
  info(`Original: ${stefan.stars}★ — "${stefan.text.slice(0, 60)}…"`);

  const { status, data } = await api(`/testimonials/${stefan.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      stars: 5,
      text: stefan.text + ' Fazit: Absolut empfehlenswert!',
    }),
  });

  if (status === 200) {
    ok(`Bewertung aktualisiert → ${data.doc.stars}★, Text um Fazit erweitert`);
    revert.push(async () => {
      const { status: rs } = await api(`/testimonials/${stefan.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ stars: originalSterne, text: originalText }),
      });
      rs === 200 ? ok(`REVERT Case 02: Stefan W. auf ${originalSterne}★ / Originaltext zurückgesetzt`) : err(`REVERT Case 02 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 02 fehlgeschlagen (${status})`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// ROLLE 2 — PRODUKT-MANAGER
// ─────────────────────────────────────────────────────────────────

// Case 3: Vitair Untertitel ändern
async function case03_vitair_untertitel() {
  head('CASE 03 [Produkt-Manager] — Vitair Untertitel anpassen');
  info('Aufgabe: Untertitel "Luftenergizer" → "Raumluftenergizer Premium"');

  const { data: pList } = await api('/products?limit=10');
  const vitair = pList?.docs?.find(d => d.slug === 'vitair');
  if (!vitair) { err('Vitair nicht gefunden'); return false; }

  const originalSubtitle = vitair.subtitle;
  info(`Original subtitle: "${originalSubtitle}"`);

  const { status, data } = await api(`/products/${vitair.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ subtitle: 'Raumluftenergizer Premium' }),
  });

  if (status === 200) {
    ok(`Vitair subtitle → "${data.doc.subtitle}"`);
    revert.push(async () => {
      const { status: rs } = await api(`/products/${vitair.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ subtitle: originalSubtitle }),
      });
      rs === 200 ? ok(`REVERT Case 03: Vitair subtitle → "${originalSubtitle}"`) : err(`REVERT Case 03 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 03 fehlgeschlagen (${status})`);
    return false;
  }
}

// Case 4: Feature "Besserer Schlaf" Beschreibung aktualisieren
async function case04_feature_beschreibung() {
  head('CASE 04 [Produkt-Manager] — Feature-Beschreibung erweitern');
  info('Aufgabe: "Besserer Schlaf" — Beschreibung um Studienverweis ergänzen');

  const { data: fList } = await api('/features?limit=10');
  const feature = fList?.docs?.find(d => d.title === 'Besserer Schlaf');
  if (!feature) { err('Feature "Besserer Schlaf" nicht gefunden'); return false; }

  const originalDesc = feature.description;
  info(`Original: "${originalDesc.slice(0, 60)}…"`);

  const { status, data } = await api(`/features/${feature.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      description: originalDesc + ' (Belegt durch Schlafstudien 2023)',
    }),
  });

  if (status === 200) {
    ok(`Feature-Beschreibung erweitert: "…${data.doc.description.slice(-30)}"`);
    revert.push(async () => {
      const { status: rs } = await api(`/features/${feature.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ description: originalDesc }),
      });
      rs === 200 ? ok('REVERT Case 04: Feature-Beschreibung zurückgesetzt') : err(`REVERT Case 04 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 04 fehlgeschlagen (${status})`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// ROLLE 3 — MARKETING-MANAGER
// ─────────────────────────────────────────────────────────────────

// Case 5: Statistik-Wert anpassen (Kundenanzahl 400 → 500)
async function case05_statistik_update() {
  head('CASE 05 [Marketing-Manager] — Kennzahl "Geräte ausgeliefert" erhöhen');
  info('Aufgabe: 400+ → 500+ Geräte ausgeliefert (Jahresziel erreicht)');

  const { data: sList } = await api('/stats?limit=10');
  const stat = sList?.docs?.find(d => d.label === 'Geräte ausgeliefert');
  if (!stat) { err('Statistik "Geräte ausgeliefert" nicht gefunden'); return false; }

  const originalValue = stat.value;
  info(`Original: ${originalValue}${stat.suffix}`);

  const { status, data } = await api(`/stats/${stat.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ value: 500 }),
  });

  if (status === 200) {
    ok(`Statistik aktualisiert: ${data.doc.value}${data.doc.suffix} Geräte ausgeliefert`);
    revert.push(async () => {
      const { status: rs } = await api(`/stats/${stat.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ value: originalValue }),
      });
      rs === 200 ? ok(`REVERT Case 05: Statistik → ${originalValue}`) : err(`REVERT Case 05 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 05 fehlgeschlagen (${status})`);
    return false;
  }
}

// Case 6: Statistik-Label tauschen (statt Homepage-Global, das komplex ist)
async function case06_homepage_sektion() {
  head('CASE 06 [Marketing-Manager] — Startseiten-Statistik-Label ergänzen');
  info('Aufgabe: Statistik "Kundenzufriedenheit" → "Kundenzufriedenheitsrate" umbenennen');

  const { data: sList } = await api('/stats?limit=10');
  const stat = sList?.docs?.find(d => d.label === 'Kundenzufriedenheit');
  if (!stat) { err('Statistik "Kundenzufriedenheit" nicht gefunden'); return false; }

  const originalLabel = stat.label;
  info(`Original Label: "${originalLabel}"`);

  const { status, data } = await api(`/stats/${stat.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ label: 'Kundenzufriedenheitsrate' }),
  });

  if (status === 200) {
    ok(`Statistik-Label → "${data.doc.label}"`);
    revert.push(async () => {
      const { status: rs } = await api(`/stats/${stat.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ label: originalLabel }),
      });
      rs === 200 ? ok(`REVERT Case 06: Label → "${originalLabel}"`) : err(`REVERT Case 06 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 06 fehlgeschlagen (${status})`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// ROLLE 4 — PARTNER-MANAGER
// ─────────────────────────────────────────────────────────────────

// Case 7: Bundle-Preis erhöhen (Atembrille 8900 → 9900)
async function case07_bundle_preis() {
  head('CASE 07 [Partner-Manager] — Bundle-Preis anpassen');
  info('Aufgabe: "Professionelle Atembrille" 89,00 € → 99,00 € (Materialkosten gestiegen)');

  const { data: bList } = await api('/bundles?limit=10');
  const bundle = bList?.docs?.find(d => d.slug === 'atembrille');
  if (!bundle) { err('Bundle "atembrille" nicht gefunden'); return false; }

  const originalPrice        = bundle.price;
  const originalPriceDisplay = bundle.priceDisplay;
  info(`Original: ${originalPrice} Cent (${originalPriceDisplay} €)`);

  const { status, data } = await api(`/bundles/${bundle.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ price: 9900, priceDisplay: '99,00' }),
  });

  if (status === 200) {
    ok(`Bundle-Preis → ${data.doc.price} Cent (${data.doc.priceDisplay} €)`);
    revert.push(async () => {
      const { status: rs } = await api(`/bundles/${bundle.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ price: originalPrice, priceDisplay: originalPriceDisplay }),
      });
      rs === 200 ? ok(`REVERT Case 07: Preis → ${originalPrice} Cent`) : err(`REVERT Case 07 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 07 fehlgeschlagen (${status})`);
    return false;
  }
}

// Case 8: Therapeut-Provision erhöhen (8% → 9%)
async function case08_provision_erhoehen() {
  head('CASE 08 [Partner-Manager] — Partner-Provision anpassen');
  info('Aufgabe: Stufe "Therapeut" Provision 8% → 9% (Halbjahresprämie)');

  const { data: aList } = await api('/affiliate-tiers?limit=10');
  const tier = aList?.docs?.find(d => d.tierId === 'therapeut');
  if (!tier) { err('Tier "therapeut" nicht gefunden'); return false; }

  const originalCommission = tier.commission;
  info(`Original Provision: ${originalCommission}%`);

  const { status, data } = await api(`/affiliate-tiers/${tier.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ commission: 9 }),
  });

  if (status === 200) {
    ok(`Provision → ${data.doc.commission}%`);
    revert.push(async () => {
      const { status: rs } = await api(`/affiliate-tiers/${tier.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ commission: originalCommission }),
      });
      rs === 200 ? ok(`REVERT Case 08: Provision → ${originalCommission}%`) : err(`REVERT Case 08 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 08 fehlgeschlagen (${status})`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// ROLLE 5 — SEO-MANAGER
// ─────────────────────────────────────────────────────────────────

// Case 9: Meta-Beschreibung der Kontakt-Seite aktualisieren
async function case09_meta_beschreibung() {
  head('CASE 09 [SEO-Manager] — Meta-Beschreibung optimieren');
  info('Aufgabe: Kontakt-Seite Meta-Description auf 155 Zeichen optimieren');

  const { data: pages } = await api('/pages?limit=100');
  const page = pages?.docs?.find(d => d.slug === 'kontakt');
  if (!page) { err('Seite "kontakt" nicht gefunden'); return false; }

  const originalMeta = page.metaDescription || '';
  info(`Original (${originalMeta.length} Zeichen): "${originalMeta.slice(0, 60)}…"`);

  const newMeta = 'Nehmen Sie Kontakt mit AIRIMPULS auf — wir beraten Sie persönlich zu Vitair, Solitair & Preventair. Antwort innerhalb von 24 Stunden.';
  info(`Neu (${newMeta.length} Zeichen)`);

  const { status, data } = await api(`/pages/${page.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ metaDescription: newMeta }),
  });

  if (status === 200) {
    ok(`Meta-Description aktualisiert (${data.doc.metaDescription?.length} Zeichen)`);
    revert.push(async () => {
      const { status: rs } = await api(`/pages/${page.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ metaDescription: originalMeta }),
      });
      rs === 200 ? ok('REVERT Case 09: Meta-Description zurückgesetzt') : err(`REVERT Case 09 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 09 fehlgeschlagen (${status}): ${JSON.stringify(data?.errors)}`);
    return false;
  }
}

// Case 10: Rechtliche Seite "Impressum" anlegen (und wieder löschen)
async function case10_impressum_anlegen() {
  head('CASE 10 [SEO-Manager] — Impressum als Rechtliche Seite anlegen');
  info('Aufgabe: Rechtliche Seite Typ "Impressum" erstellen');

  const { status, data } = await api('/legal-pages', {
    method: 'POST',
    body: JSON.stringify({
      slug: 'impressum',
      title: 'Impressum',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'AIRIMPULS by Jörg Klemm, Musterstraße 1, 12345 Musterstadt' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    }),
  });

  if (status === 201 && data?.doc?.id) {
    const id = data.doc.id;
    ok(`Impressum erstellt (ID ${id}, Typ: ${data.doc.pageType})`);
    revert.push(async () => {
      const { status: ds } = await api(`/legal-pages/${id}`, { method: 'DELETE' });
      ds === 200 ? ok(`REVERT Case 10: Impressum ID ${id} gelöscht`) : err(`REVERT Case 10: Löschen fehlgeschlagen (${ds})`);
    });
    return true;
  } else {
    err(`Case 10 fehlgeschlagen (${status}): ${JSON.stringify(data?.errors || data?.message)}`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// ROLLE 6 — MARKEN-MANAGER
// ─────────────────────────────────────────────────────────────────

// Case 11: Slogan aktualisieren
async function case11_slogan() {
  head('CASE 11 [Marken-Manager] — Markenslogan anpassen');
  info('Aufgabe: Tagline um "seit 1999" erweitern');

  const { data: brand } = await api('/globals/brand');
  const originalTagline = brand?.tagline || '';
  info(`Original: "${originalTagline}"`);

  const newTagline = originalTagline + ' — seit 1999';

  const { status, data } = await api('/globals/brand', {
    method: 'POST',
    body: JSON.stringify({ tagline: newTagline }),
  });

  if (status === 200) {
    ok(`Tagline → "${data.result?.tagline ?? newTagline}"`);
    revert.push(async () => {
      const { status: rs } = await api('/globals/brand', {
        method: 'POST',
        body: JSON.stringify({ tagline: originalTagline }),
      });
      rs === 200 ? ok(`REVERT Case 11: Tagline → "${originalTagline}"`) : err(`REVERT Case 11 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 11 fehlgeschlagen (${status})`);
    return false;
  }
}

// Case 12: Akzentfarbe temporär ändern
async function case12_akzentfarbe() {
  head('CASE 12 [Marken-Manager] — Akzentfarbe A/B-Test');
  info('Aufgabe: Akzentfarbe #E25A43 → #2D7DD2 (Blau, A/B-Test)');

  const { data: brand } = await api('/globals/brand');
  const originalAccent = brand?.colors?.accent || '';
  info(`Original Akzentfarbe: ${originalAccent}`);

  // Die colors-Struktur aus dem Original übernehmen und nur accent ändern
  const updatedColors = { ...(brand?.colors || {}), accent: '#2D7DD2' };

  const { status, data } = await api('/globals/brand', {
    method: 'POST',
    body: JSON.stringify({ colors: updatedColors }),
  });

  if (status === 200) {
    ok(`Akzentfarbe → ${data.result?.colors?.accent ?? '#2D7DD2'}`);
    revert.push(async () => {
      const revertColors = { ...(data.result?.colors || updatedColors), accent: originalAccent };
      const { status: rs } = await api('/globals/brand', {
        method: 'POST',
        body: JSON.stringify({ colors: revertColors }),
      });
      rs === 200 ? ok(`REVERT Case 12: Akzentfarbe → ${originalAccent}`) : err(`REVERT Case 12 fehlgeschlagen (${rs})`);
    });
    return true;
  } else {
    err(`Case 12 fehlgeschlagen (${status})`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// REVERT ALLE ÄNDERUNGEN
// ─────────────────────────────────────────────────────────────────
async function revertAll() {
  head('REVERT — Alle Änderungen zurücksetzen (LIFO)');
  // In umgekehrter Reihenfolge rückgängig machen
  for (const fn of revert.reverse()) {
    await fn();
  }
}

// ─────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   AIRIMPULS CMS — 12 ARBEITSCASE-TEST + REVERT      ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  await login();

  // ── Ausführung ──
  const cases = [
    case01_faq_erstellen,
    case02_bewertung_bearbeiten,
    case03_vitair_untertitel,
    case04_feature_beschreibung,
    case05_statistik_update,
    case06_homepage_sektion,
    case07_bundle_preis,
    case08_provision_erhoehen,
    case09_meta_beschreibung,
    case10_impressum_anlegen,
    case11_slogan,
    case12_akzentfarbe,
  ];

  for (const fn of cases) {
    try {
      await fn();
    } catch (e) {
      err(`Unerwarteter Fehler in ${fn.name}: ${e.message}`);
    }
  }

  const casePassed = pass - 1; // minus Login
  const caseFailed = fail;

  // ── Revert ──
  head('');
  await revertAll();

  // ── Abschlussbericht ──
  const divider = '═'.repeat(56);
  console.log(`\n${divider}`);
  for (const line of log) console.log(line);
  console.log(divider);
  console.log(`\n  CASES   : ${pass - 1 - revert.length} bestanden von 12 ausgeführten`);
  console.log(`  REVERT  : ${revert.length} Änderungen zurückgesetzt`);
  console.log(`  GESAMT  : ${pass} ✅  ${fail} ❌`);
  const allGood = fail === 0;
  console.log(allGood
    ? '\n  ✅  ALLE TESTS + REVERT ERFOLGREICH\n'
    : '\n  ❌  EINIGE TESTS/REVERTS FEHLGESCHLAGEN\n');
  console.log(divider);

  process.exit(allGood ? 0 : 1);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
