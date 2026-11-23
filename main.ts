// The One-Line Laugh — make.fun bounty
// Writes exactly one funny line to /output/entry.txt: a single
// original English one-liner about an AI agent asking for a raise.
//
// The line: "My AI agent asked for a raise, so I gave it a bigger
// context window and called it a corner office with a view of my
// inbox."
//
// Why it lands: it treats the agent like an office employee —
// a raise, a corner office, a view — then swaps the perks for
// the only currency an AI actually values: more context window.
// The punchline is the "view of my inbox", the one window no
// agent ever asked for but every agent ends up staring at.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const LINE =
  "My AI agent asked for a raise, so I gave it a bigger context window and called it a corner office with a view of my inbox.";
const OUTPUT_PATH = "/output/entry.txt";

// Gate: the entry must be one line of 80 to 140 characters, with no
// newline inside it. Refuse to write anything that would fail the gate.
if (LINE.length < 80 || LINE.length > 140) {
  throw new Error(`Invalid entry length: ${LINE.length} characters.`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("Entry must be exactly one line (no newline).");
}
if (LINE.trim().length === 0) {
  throw new Error("Entry must not be blank.");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Post-write self-check: what landed on disk must be exactly the
// one line we intended — byte-identical, no trailing newline, still
// a single line. Never silently ship a file we did not verify.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("Post-write check failed: entry.txt differs from LINE.");
}
if (written.endsWith("\n") || written.includes("\n")) {
  throw new Error("Post-write check failed: entry must be one line, no trailing newline.");
}
