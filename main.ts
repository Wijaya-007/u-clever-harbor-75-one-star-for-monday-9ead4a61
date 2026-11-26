// One Star for Monday — one line, at most 25 words.
// A one-star restaurant review where the restaurant is Monday: seated at 6am,
// dread special, dead Wi-Fi, and the waiter is Monday himself, never smiling.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "One star. Seated at 6am, the special was dread, the Wi-Fi was down, and the waiter — Monday himself — never smiled.";

// Gate: a single line of plain text, at most 25 words, no explanation attached.
const words = LINE.trim().split(/\s+/);
if (words.length < 1 || words.length > 25) {
  throw new Error(`line is ${words.length} words, must be 1-25`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("line must not have leading/trailing whitespace or double spaces");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  join(dirname(fileURLToPath(import.meta.url)), "output");
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Verify the written bytes round-trip exactly.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("written entry does not match the line");
}
console.log(`wrote ${outPath} (${words.length} words)`);
console.log(LINE);
