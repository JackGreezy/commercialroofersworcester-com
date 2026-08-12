#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const fakePhone = ["555", "555", "6139"].join("-");
const fakePhoneDigits = ["555", "555", "6139"].join("");
const styleTag = '<link href="/worcester-funnel.css?v=20260812" id="worcester-funnel-css" rel="stylesheet"/>';
const mobileCta = '<a class="worcester-mobile-roof-help" href="/contact">Roof Help</a>';

const hero = `<div class="worcester-hero" id="hero">
  <img src="/images/locations/commercial-roofers-worcester-ma-01.webp" alt="Worcester commercial buildings served by local commercial roofers" width="1920" height="1080" fetchpriority="high" decoding="async">
  <div class="worcester-hero__inner">
    <p class="worcester-eyebrow">Worcester Commercial Roofing</p>
    <h1>Stop the Leak. See What the Roof Needs.</h1>
    <p class="worcester-hero__lead">Fast help for active leaks, plus flat roof inspections and reports that make the next decision clear: repair, coat, recover, or replace.</p>
    <div class="worcester-actions">
      <a class="worcester-btn" href="/contact?request=emergency">Request Emergency Roof Help</a>
      <a class="worcester-btn worcester-btn--light" href="/services/commercial-roof-inspection">Schedule a Flat Roof Inspection</a>
    </div>
    <div class="worcester-hero__services"><span>Leak Repair</span><span>Roof Coatings</span><span>Replacement</span><span>Service Agreements</span></div>
  </div>
</div>`;

const home = `<div class="worcester-home" id="home-wrapper">
  <section class="worcester-emergency">
    <div class="worcester-wrap">
      <div><strong>Water entering the building?</strong><p>Send the property address, leak location, and any photos. Active commercial roof leaks get priority.</p></div>
      <a href="/contact?request=emergency">Send Emergency Details</a>
    </div>
  </section>

  <section class="worcester-section worcester-section--paper">
    <div class="worcester-wrap">
      <div class="worcester-heading">
        <div><p class="worcester-eyebrow">Start With the Roof in Front of You</p><h2>One roof team. Every next step.</h2></div>
        <p>Fix the immediate problem, document the whole roof, and spend capital where it will do the most good.</p>
      </div>
      <div class="worcester-priority-grid">
        <a class="worcester-priority-card" href="/services/commercial-roof-leak-repair"><small>When water is active</small><h3>Emergency Roof Repair</h3><p>Control water entry, trace the source, protect the building, and move from temporary protection to a durable repair.</p></a>
        <a class="worcester-priority-card" href="/services/commercial-roof-inspection"><small>Before a major decision</small><h3>Flat Roof Inspection</h3><p>Get photos, condition findings, repair priorities, and a clear read on whether replacement is actually due.</p></a>
        <a class="worcester-priority-card" href="/services/silicone-roof-coatings"><small>When the roof can be preserved</small><h3>Roof Coatings</h3><p>Find out whether the roof is dry and stable enough for restoration that can extend service life.</p></a>
        <a class="worcester-priority-card" href="/services/commercial-roof-tear-off-replacement"><small>When repairs no longer add up</small><h3>Commercial Roof Replacement</h3><p>Plan tear-off, insulation, drainage, staging, and occupied-building work before the project reaches the field.</p></a>
        <a class="worcester-priority-card" href="/services/preventive-maintenance-programs"><small>After the emergency is over</small><h3>Roof Service Agreements</h3><p>Turn recurring roof checks, maintenance, photos, and repair priorities into one usable building record.</p></a>
      </div>
    </div>
  </section>

  <section class="worcester-split">
    <div class="worcester-split__media"><img src="/images/project-types/distribution-center-roofing-commercial-roofers-worcester-ma.webp" alt="Large commercial flat roof inspected for repair or replacement" loading="lazy" decoding="async"></div>
    <div class="worcester-split__copy">
      <p class="worcester-eyebrow">Flat Roof Replacement Inspection</p>
      <h2>Do not bid a new roof from the parking lot.</h2>
      <p>A replacement inspection should explain why the roof is failing, what can still be repaired, where moisture may be present, and which scope gives the building the best value.</p>
      <ul class="worcester-report-list">
        <li>Roof membrane, seams, flashings, edges, drains, and penetrations</li>
        <li>Photo documentation tied to visible roof conditions</li>
        <li>Repair, coating, recover, and replacement feasibility</li>
        <li>Insulation, drainage, access, phasing, and budget risks</li>
      </ul>
      <div class="worcester-actions"><a class="worcester-btn" href="/services/commercial-roof-inspection">Request an Inspection and Report</a></div>
    </div>
  </section>

  <section class="worcester-section worcester-section--navy">
    <div class="worcester-wrap">
      <div class="worcester-heading">
        <div><p class="worcester-eyebrow">After the Inspection</p><h2>Choose the right roof path.</h2></div>
        <p>The answer should come from roof conditions, moisture, repair history, remaining life, and the way the building operates.</p>
      </div>
      <div class="worcester-decision-grid">
        <div class="worcester-decision"><h3>Repair</h3><p>Correct isolated failures when the surrounding roof remains serviceable.</p><a href="/services/commercial-roof-leak-repair">Explore Repair</a></div>
        <div class="worcester-decision"><h3>Coat</h3><p>Restore a dry, stable roof when a compatible coating can buy useful service life.</p><a href="/services/silicone-roof-coatings">Explore Coatings</a></div>
        <div class="worcester-decision"><h3>Recover</h3><p>Add a compatible roof assembly when deck, moisture, code, and attachment conditions allow it.</p><a href="/services/roof-recover-overlay">Explore Recover</a></div>
        <div class="worcester-decision"><h3>Replace</h3><p>Start clean when wet insulation, widespread failure, or exhausted service life makes replacement the sound move.</p><a href="/services/commercial-roof-tear-off-replacement">Plan Replacement</a></div>
      </div>
    </div>
  </section>

  <section class="worcester-section">
    <div class="worcester-wrap worcester-service-plan">
      <div class="worcester-service-plan__copy">
        <p class="worcester-eyebrow">Commercial Roof Service Agreements</p>
        <h2>Stop paying for the same leak twice.</h2>
        <p>A service agreement keeps inspection notes, repair history, drainage concerns, recurring defects, and future priorities in one place. That makes emergency calls faster and capital planning more useful.</p>
      </div>
      <div class="worcester-service-plan__panel">
        <h3>Keep the roof on a schedule.</h3>
        <ul><li>Planned roof inspections</li><li>Drainage and detail checks</li><li>Photo documentation</li><li>Repair tracking and priorities</li><li>Budget planning for larger work</li></ul>
        <a class="worcester-btn" href="/services/preventive-maintenance-programs">Ask About a Service Agreement</a>
      </div>
    </div>
  </section>

  <section class="worcester-weather">
    <div class="worcester-weather__copy">
      <p class="worcester-eyebrow">Built for Central Massachusetts</p>
      <h2>Freeze, thaw, snow, and hard rain find weak roof details.</h2>
      <p>Worcester commercial roofs need drainage, seams, flashing, and rooftop equipment details checked before weather turns a small opening into interior damage.</p>
      <ul class="worcester-weather-list"><li>Ponding water and blocked drains</li><li>Open seams and stressed flashing</li><li>Ice at edges, scuppers, and downspouts</li><li>Snow and ice damage documentation</li><li>Post-storm roof inspections</li></ul>
      <div class="worcester-actions"><a class="worcester-btn" href="/services/storm-damage-roof-repair">Get Storm Roof Help</a></div>
    </div>
    <div class="worcester-weather__media"><img src="/images/roof-systems/tpo-60-mil-commercial-roofers-worcester-ma.webp" alt="Commercial low slope roof system on an occupied building" loading="lazy" decoding="async"></div>
  </section>

  <section class="worcester-section">
    <div class="worcester-wrap">
      <div class="worcester-heading">
        <div><p class="worcester-eyebrow">Roofing for Working Buildings</p><h2>Keep the property open while the roof gets handled.</h2></div>
        <p>Access, staging, noise, odor, interior protection, tenant communication, and daily dry-in belong in the roof plan from the start.</p>
      </div>
      <div class="worcester-market-grid">
        <a class="worcester-market-card" href="/project-types/warehouse-roofing"><img src="/images/project-types/warehouse-roofing-commercial-roofers-worcester-ma.webp" alt="Commercial warehouse roof" loading="lazy" decoding="async"><div><h3>Warehouses and Distribution</h3><p>Large roof areas, active loading, inventory protection, and planned staging.</p></div></a>
        <a class="worcester-market-card" href="/project-types/medical-office-building-roofing"><img src="/images/project-types/medical-office-building-roofing-commercial-roofers-worcester-ma.webp" alt="Medical office building commercial roof" loading="lazy" decoding="async"><div><h3>Medical and Office</h3><p>Occupied-building work planned around patients, tenants, entrances, and rooftop systems.</p></div></a>
        <a class="worcester-market-card" href="/industries/manufacturing-operators"><img src="/images/industries/manufacturing-operators-commercial-roofers-worcester-ma.webp" alt="Manufacturing facility commercial roof" loading="lazy" decoding="async"><div><h3>Manufacturing and Industrial</h3><p>Roof work tied to production, safety, exhaust, equipment, and shutdown limits.</p></div></a>
      </div>
      <div class="worcester-areas"><a href="/locations/shrewsbury">Shrewsbury</a><a href="/locations/holden">Holden</a><a href="/locations/auburn">Auburn</a><a href="/locations/millbury">Millbury</a><a href="/locations/grafton">Grafton</a><a href="/locations/westborough">Westborough</a><a href="/locations">All Service Areas</a></div>
    </div>
  </section>

  <section class="worcester-section worcester-section--paper">
    <div class="worcester-wrap worcester-faq">
      <div><p class="worcester-eyebrow">Common Roof Questions</p><h2>Start with a straight answer.</h2></div>
      <div>
        <details><summary>Can you help with an active commercial roof leak?</summary><p>Yes. Send the building address, leak location, when the water started, and any interior or rooftop photos. Active water entry gets priority so the immediate response can be separated from the permanent repair.</p></details>
        <details><summary>What comes with a flat roof inspection and report?</summary><p>The inspection documents visible roof conditions, drainage, seams, flashings, penetrations, edges, repair history, and decision risks. The report should make repair priorities and the next roof investment easier to approve.</p></details>
        <details><summary>How do you decide whether to repair, coat, recover, or replace?</summary><p>The decision follows moisture, deck and insulation condition, age, repair concentration, membrane compatibility, attachment, drainage, code limits, and the cost of a complete durable scope.</p></details>
        <details><summary>What does a commercial roof service agreement include?</summary><p>The program can include planned inspections, drainage and detail checks, photo records, repair tracking, priority recommendations, and budget notes for future coating or replacement work.</p></details>
        <details><summary>Can commercial roof work be phased around an occupied building?</summary><p>Often, yes. The plan should address access, staging, noise, odor, parking, interior protection, tenant communication, weather stops, and daily dry-in before work starts.</p></details>
      </div>
    </div>
  </section>

  <section class="worcester-close">
    <div class="worcester-wrap">
      <div><h2>Tell us what the roof is doing.</h2><p>Share the building address, the current problem, and what decision is coming next. We will help establish the right first roof visit.</p></div>
      <a class="worcester-btn" href="/contact">Request Roof Help</a>
    </div>
  </section>
</div>`;

function replaceElementById(html, id, replacement) {
  const startPattern = new RegExp(`<([a-z][a-z0-9:-]*)\\b[^>]*\\bid=["']${id}["'][^>]*>`, "i");
  const match = startPattern.exec(html);
  if (!match) throw new Error(`Missing #${id}`);
  const tag = match[1].toLowerCase();
  const start = match.index;
  const tokenPattern = new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi");
  tokenPattern.lastIndex = start;
  let depth = 0;
  let token;
  while ((token = tokenPattern.exec(html))) {
    if (token[0].startsWith("</")) depth -= 1;
    else depth += 1;
    if (depth === 0) return html.slice(0, start) + replacement + html.slice(tokenPattern.lastIndex);
  }
  throw new Error(`Unclosed #${id}`);
}

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["assets-f", "ours", "images"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolute);
  }
  return files;
}

let changed = 0;
for (const file of walk(publicDir)) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html
    .replaceAll(`href="tel:${fakePhoneDigits}">${fakePhone}</a>`, 'href="/contact">Roof Help</a>')
    .replaceAll(`href="tel:${fakePhoneDigits}"`, 'href="/contact"')
    .replaceAll(fakePhone, "Roof Help")
    .replace(/[—–]/g, ",")
    .replace(/&(?:m|n)dash;/gi, ",")
    .replace(/<svg[^>]*class=["']e-font-icon-svg-symbols["'][^>]*>[\s\S]*?<\/svg>/gi, "");
  if (!html.includes('id="worcester-funnel-css"')) html = html.replace(/<\/head>/i, `${styleTag}\n</head>`);
  if (!html.includes('class="worcester-mobile-roof-help"')) html = html.replace(/<\/body>/i, `${mobileCta}\n</body>`);

  if (["home.html", "index.html"].includes(path.basename(file))) {
    html = replaceElementById(html, "hero", hero);
    html = replaceElementById(html, "home-wrapper", home);
    html = html
      .replace(/<title>[\s\S]*?<\/title>/i, "<title>Commercial Roofing Worcester | Emergency Repair and Flat Roof Inspections</title>")
      .replace(/<meta[^>]+name=["']description["'][^>]*>/i, '<meta name="description" content="Commercial roofing in Worcester for emergency leaks, flat roof replacement inspections and reports, repairs, coatings, replacement, and service agreements.">')
      .replace(/<meta[^>]+property=["']og:title["'][^>]*>/i, '<meta property="og:title" content="Commercial Roofing Worcester | Emergency Repair and Flat Roof Inspections">')
      .replace(/<meta[^>]+property=["']og:description["'][^>]*>/i, '<meta property="og:description" content="Emergency commercial roof repair, inspections, coatings, replacement, and service agreements for Worcester properties.">');
  }
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

const configPath = path.join(root, "home.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
config.phone = "";
config.brand_logo = "/images/brand/logo.png";
config.brand_logo_header = "/images/brand/logo-on-light.png";
config.brand_logo_footer = "/images/brand/logo-on-dark.png";
fs.writeFileSync(configPath, `${JSON.stringify(config)}\n`);

const contentPath = path.join(root, "data", "content.normalized.json");
const contentBefore = fs.readFileSync(contentPath, "utf8");
const contentAfter = contentBefore
  .replace(`\"phone\":\"${fakePhone}\"`, '\"phone\":\"\"')
  .replace(`\"phone\": \"${fakePhone}\"`, '\"phone\": \"\"');
fs.writeFileSync(contentPath, contentAfter);

const apiPath = path.join(root, "api", "submit.js");
let api = fs.readFileSync(apiPath, "utf8");
api = api
  .replace(`"phone": "${fakePhone}", "phoneTel": "${fakePhoneDigits}"`, '"phone": "", "phoneTel": ""')
  .replace('"city": "Worcester", "state": ""', '"city": "Worcester", "state": "MA"')
  .replace("Please call us directly.", "Please try again shortly.");
fs.writeFileSync(apiPath, api);

console.log(`Worcester funnel applied to ${changed} HTML files.`);
