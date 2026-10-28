import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Use a separately launched, isolated headless Chromium instance. This script
// creates and closes only its own tab; it never touches the user's tabs.
const port = Number(process.argv[2] ?? 9225);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const available = ["daily-question-calendar", "long-distance-visit-planner", "facetime-date-menu", "time-zone-weekly-planner", "weekly-relationship-check-in"];
const names = process.argv.length > 3 ? process.argv.slice(3) : available;
if (names.some(name => !available.includes(name))) throw Error("Unknown printable guide");
const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  const timeout = setTimeout(() => { pending.delete(id); reject(Error(`Timed out: ${method}`)); }, 20000);
  pending.set(id, { resolve, reject, timeout });
  socket.send(JSON.stringify({ id, method, params }));
});
socket.addEventListener("message", ({ data }) => {
  const response = JSON.parse(data);
  const call = pending.get(response.id);
  if (!call) return;
  clearTimeout(call.timeout);
  pending.delete(response.id);
  if (response.error) call.reject(Error(JSON.stringify(response.error)));
  else call.resolve(response.result);
});
try {
  await send("Page.enable");
  for (const name of names) {
    const dir = path.join(root, "public/downloads");
    const url = pathToFileURL(path.join(dir, `${name}.html`)).href;
    await send("Page.navigate", { url });
    for (let attempt = 0; attempt < 100; attempt++) {
      const state = await send("Runtime.evaluate", { expression: `location.href === ${JSON.stringify(url)} && document.readyState === "complete" && document.title.includes("DreamDuo") && !!document.querySelector(".page")`, returnByValue: true });
      if (state.result.value) break;
      if (attempt === 99) throw Error(`Printable did not load: ${name}`);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    const pdf = await send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false, generateTaggedPDF: true });
    await fs.writeFile(path.join(dir, `${name}.pdf`), Buffer.from(pdf.data, "base64"));
    console.log(`Rendered ${name}.pdf`);
  }
} finally {
  await send("Page.close");
  socket.close();
}
