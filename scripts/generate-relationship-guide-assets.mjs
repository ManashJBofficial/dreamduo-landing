import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const calendar = JSON.parse(await fs.readFile(path.join(root, "src/content/assets/daily-question-calendar.json"), "utf8"));
const visitChecklist = JSON.parse(await fs.readFile(path.join(root, "src/content/assets/visit-checklist.json"), "utf8"));
const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const colors = ["#fbe3eb", "#f6e8d6", "#e3eee8", "#eae5f2", "#f6e0d8"];
const svg = (title, subtitle, body, height = 680) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc"><title id="title">${escape(title)}</title><desc id="desc">${escape(subtitle)}</desc><rect width="1200" height="${height}" rx="28" fill="#fff9f6"/><g font-family="Arial, sans-serif" fill="#2c1a30"><text x="60" y="60" font-size="17" letter-spacing="3" fill="#a92b5c">DREAMDUO · PRACTICAL GUIDES</text><text x="60" y="120" font-size="40" font-weight="700">${escape(title)}</text><text x="60" y="158" font-size="22" fill="#645969">${escape(subtitle)}</text>${body}</g></svg>`;
const text = (x, y, value, size = 24, extra = "") => `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${escape(value)}</text>`;
const writeSvg = async (slug, name, value) => {
  const dir = path.join(publicDir, "blog", slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), value);
};

await writeSvg("30-daily-questions-for-long-distance-couples-when-you-run-out-of-things-to-say", "conversation-calendar.svg", svg("One question. A new conversation.", "30 days · five ways to discover each other", calendar.map((group, i) => {
  const y = 194 + i * 86;
  return `<rect x="60" y="${y}" width="1080" height="70" rx="14" fill="${colors[i]}"/>${text(84, y + 43, `Days ${i * 6 + 1}–${i * 6 + 6}`, 25, 'font-weight="700"')}${text(335, y + 43, group.category, 27)}`;
}).join("")));

const visitSteps = [
  ["4 WEEKS OUT", "Agree on the visit", "Dates · traveler · budget · accommodation"],
  ["3 WEEKS OUT", "Book the essentials", "Confirmations · transport · payment dates"],
  ["2 WEEKS OUT", "Leave room to enjoy it", "One activity each · open time · arrival buffer"],
  ["FINAL WEEK", "Check the small details", "Travel times · packing · first meal · backup"],
];
await writeSvg("how-to-plan-your-next-long-distance-visit-free-checklist-budget", "visit-timeline.svg", svg("Your next visit, one step at a time.", "A sample sequence. Start earlier when your trip needs it.", visitSteps.map(([when, title, detail], i) => {
  const y = 200 + i * 110;
  return `<circle cx="84" cy="${y + 25}" r="21" fill="${colors[i]}"/>${text(77, y + 33, i + 1, 23, 'font-weight="700"')}${text(135, y + 10, when, 17, 'fill="#a92b5c"')}${text(135, y + 45, title, 29, 'font-weight="700"')}${text(135, y + 78, detail, 22, 'fill="#645969"')}`;
}).join(""), 690));

const activities = [
  ["DRAW", "Paper + a pen", "One minute. No looking at the page."],
  ["COOK", "An easy recipe", "Same first step. Different kitchens."],
  ["ASK", "One good question", "Both answer. Then ask a follow-up."],
  ["WATCH", "A title you can both access", "Check access before date night."],
  ["PLAN", "One future adventure", "Choose a first step, not a whole trip."],
];
await writeSvg("25-things-to-do-on-facetime-with-your-partner-when-you-re-bored", "facetime-activity-menu.svg", svg("What are you up for tonight?", "Five setups. Pick the one that fits your energy.", activities.map(([verb, kit, start], i) => {
  const y = 196 + i * 85;
  return `<rect x="60" y="${y}" width="1080" height="72" rx="14" fill="${colors[i]}"/>${text(84, y + 42, verb, 22, 'font-weight="700"')}${text(245, y + 29, kit, 23, 'font-weight="700"')}${text(245, y + 56, start, 21)}`;
}).join("")));

const cities = [
  ["Accra", "Africa/Accra"], ["Nairobi", "Africa/Nairobi"], ["London", "Europe/London"], ["Dhaka", "Asia/Dhaka"], ["Brisbane", "Australia/Brisbane"],
];
const localHour = (zone, hour) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", hourCycle: "h23" }).format(new Date(Date.UTC(2026, 10, 9, hour))));
await writeSvg("long-distance-relationships-in-different-time-zones-3-weekly-routines", "time-zone-overlap.svg", svg("Find the overlap before booking a call.", "24 hours from 00:00 UTC · November 9, 2026", [0, 6, 12, 18, 24].map(hour => text(240 + hour * 36, 205, `${String(hour).padStart(2, "0")}:00`, 18, 'text-anchor="middle"')).join("") + cities.map(([city, zone], i) => {
  const y = 230 + i * 67;
  return text(60, y + 20, city, 24, 'font-weight="700"') + text(60, y + 45, `${String(localHour(zone, 0)).padStart(2, "0")}:00 at UTC start`, 16, 'fill="#645969"') + Array.from({ length: 24 }, (_, hour) => {
    const local = localHour(zone, hour);
    const fill = local >= 23 || local < 7 ? "#4b3854" : local >= 9 && local < 17 ? "#d2c8d8" : "#a7cbb7";
    return `<rect x="${240 + hour * 36}" y="${y}" width="34" height="42" rx="3" fill="${fill}"/>`;
  }).join("");
}).join("") + [ ["#4b3854", "Sleep 23–07"], ["#d2c8d8", "Work 09–17"], ["#a7cbb7", "Free / awake"] ].map(([color, label], i) => `<rect x="${240 + i * 280}" y="603" width="22" height="22" rx="3" fill="${color}"/>${text(273 + i * 280, 621, label, 20)}`).join(""), 670));

const checkIn = [["2 MIN", "Appreciation", "Name one specific moment you valued."], ["3 MIN", "Feelings", "Listen before trying to fix anything."], ["3 MIN", "Practical needs", "Ask for help or space for the week ahead."], ["4 MIN", "One challenge", "Choose one issue, not the whole history."], ["3 MIN", "Next step", "One action, one owner, one time to return."]];
await writeSvg("15-minute-weekly-relationship-check-in-12-questions-template", "weekly-check-in-outline.svg", svg("A little time to hear each other.", "15 minutes · use the questions as a menu", checkIn.map(([time, title, detail], i) => {
  const y = 194 + i * 86;
  return `<rect x="60" y="${y}" width="1080" height="72" rx="14" fill="${colors[i]}"/>${text(84, y + 43, time, 23, 'font-weight="700"')}${text(255, y + 29, title, 25, 'font-weight="700"')}${text(255, y + 57, detail, 21)}`;
}).join("")));

const field = label => `<div class="field"><strong>${escape(label)}</strong><div class="lines"></div></div>`;
const list = items => `<ul>${items.map(item => `<li>${escape(item)}</li>`).join("")}</ul>`;
const page = body => `<section class="page">${body}</section>`;
const downloads = [
  { name: "daily-question-calendar", title: "Your 30-day question calendar", body: page(`<h1>One question a day</h1><p>Both answer. Ask a follow-up. Skip or pause whenever you like.</p>${calendar.slice(0, 3).map((group, i) => `<h2>Days ${i * 6 + 1}–${i * 6 + 6}: ${escape(group.category)}</h2><ol start="${i * 6 + 1}">${group.prompts.map(prompt => `<li>${escape(prompt)}</li>`).join("")}</ol>`).join("")}`) + page(`<h2 class="page-title">Memories and future plans</h2>${calendar.slice(3).map((group, i) => `<h2>Days ${(i + 3) * 6 + 1}–${(i + 3) * 6 + 6}: ${escape(group.category)}</h2><ol start="${(i + 3) * 6 + 1}">${group.prompts.map(prompt => `<li>${escape(prompt)}</li>`).join("")}</ol>`).join("")}${field("Something we want to do after this conversation")}`) },
  { name: "long-distance-visit-planner", title: "Your next visit planner", body: page(`<h1>Make the next visit a plan</h1>${field("Dates, number of nights, who travels and where we stay")}${visitChecklist.map(({ when, title, tasks }) => `<h2>${escape(when)} · ${escape(title)}</h2>${list(tasks.map(value => `☐ ${value}`))}`).join("")}<p>Start earlier when your route or requirements need it. Confirm current official travel requirements before booking.</p>`) + page(`<h2 class="page-title">Our visit budget</h2><p>Use one currency throughout. Blank amounts are yours to fill in; no suggested price is a travel quote.</p>${field("Currency and agreed total spending limit")}<table><thead><tr><th>Category</th><th>Estimate</th><th>Who pays / when</th></tr></thead><tbody>${["Travel", "Accommodation", "Local transport", "Food", "Activities", "Buffer", "TOTAL", "Already set aside", "Still to set aside"].map(category => `<tr><td>${category}</td><td></td><td></td></tr>`).join("")}</tbody></table>${field("Our next action, owner and date")}${field("A change-of-plans backup we both agree to")}`) },
  { name: "facetime-date-menu", title: "Our next five video dates", body: page(`<h1>Pick something for tonight</h1><p>Choose an activity that fits both people's time and energy. Buying supplies is optional.</p>${activities.map(([verb, kit, start]) => `<h2>${verb} · ${escape(kit)}</h2><p>${escape(start)}</p>`).join("")}${field("Tonight: activity, time in both places, and what we need")}<h2>Save the next five</h2><table><thead><tr><th>Activity</th><th>When / supplies</th></tr></thead><tbody>${Array.from({ length: 5 }, () => "<tr><td></td><td></td></tr>").join("")}</tbody></table><p>Find all 25 activities and first steps at dreamduo.app/blog/25-things-to-do-on-facetime-with-your-partner-when-you-re-bored.</p>`) },
  { name: "time-zone-weekly-planner", title: "Our time-zone weekly planner", body: page(`<h1>A week that works in both places</h1><p>Write named city time zones and both local dates. Recheck after travel or a clock change. This worksheet is not an automatic converter.</p>${field("Reference week and each person's city / named time zone")}${field("Partner A: sleep, work, commute and other unavailable times")}${field("Partner B: sleep, work, commute and other unavailable times")}<table><thead><tr><th>Plan</th><th>Partner A date + time</th><th>Partner B date + time</th></tr></thead><tbody>${["Short call", "Longer call", "Backup"].map(label => `<tr><td>${label}</td><td></td><td></td></tr>`).join("")}</tbody></table>${field("Messages: our usual reply expectations and urgent-contact plan")}${field("Next clock-change / schedule review")}`) },
  { name: "weekly-relationship-check-in", title: "Our weekly relationship check-in", body: page(`<h1>15 minutes to hear each other</h1><p>Date: ____________________ &nbsp; Next check-in: ____________________</p><p>Both people can pass or pause. Pick a few questions; you don't have to answer all 12.</p>${checkIn.map(([time, title, detail]) => `<div class="field"><h2>${time} · ${title}</h2><p>${detail}</p><p>Partner A: _____________________________________________________</p><p>Partner B: _____________________________________________________</p></div>`).join("")}<p>One next action: ____________________ Owner: __________ When: __________</p>`) },
];
const downloadDir = path.join(publicDir, "downloads");
await fs.mkdir(downloadDir, { recursive: true });
for (const item of downloads) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta name="description" content="${escape(item.title)}: a free printable companion from DreamDuo. Print a copy or save it for your next conversation."><title>${escape(item.title)} | DreamDuo</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;background:#f5efed;color:#2c1a30;font:14px/1.5 Arial,sans-serif}.page{max-width:760px;margin:24px auto;padding:32px;background:#fff}.brand{font-size:12px;letter-spacing:2px;color:#a92b5c}h2{font-size:16px;margin:17px 0 7px;color:#8c2852}h1,.page-title{font-size:29px;line-height:1.15;margin:12px 0 18px;color:inherit}p{margin:8px 0}li{margin:5px 0}ul,ol{padding-left:23px}.field{break-inside:avoid;margin:16px 0}.lines{height:50px;border-bottom:1px solid #d8cbd1}.lines:before{content:"";display:block;height:25px;border-bottom:1px solid #d8cbd1}table{border-collapse:collapse;width:100%;margin:15px 0}th,td{text-align:left;border:1px solid #d8cbd1;padding:9px;min-width:70px;height:35px}th{background:#fff1f5}footer{font-size:11px;color:#645969;margin-top:24px}.tools{max-width:760px;margin:20px auto;padding:0 20px}button{padding:12px 20px;border:0;border-radius:8px;background:#a92b5c;color:white;font-size:16px;cursor:pointer}@media(max-width:600px){.page{margin:12px;padding:20px}table{font-size:12px}th,td{padding:6px;min-width:0}}@media print{body{background:white;font-size:12px}.tools{display:none}.page{margin:0;padding:0;max-width:none;break-after:page}.page:last-child{break-after:auto}h1,h2{break-after:avoid}li,tr{break-inside:avoid}}</style></head><body><div class="tools"><button onclick="window.print()">Print or save as PDF</button></div>${item.body.replaceAll('<section class="page">', '<section class="page"><p class="brand">DREAMDUO · FREE PLANNING TOOLS</p>').replaceAll('</section>', '<footer>dreamduo.app/blog · A conversation and planning aid. Use it in whatever way works for both of you.</footer></section>')}</body></html>`;
  await fs.writeFile(path.join(downloadDir, `${item.name}.html`), html);
  const plain = item.body.replace(/<\/(?:h1|h2|p|li|tr|div|section)>/g, "\n").replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]+/g, " ").split("\n").map(line => line.trimEnd()).join("\n").trim();
  await fs.writeFile(path.join(downloadDir, `${item.name}.txt`), `${item.title}\nDreamDuo · dreamduo.app/blog\n${plain}\n`);
}
console.log("Generated five SVG guides and five editable/printable companions.");
