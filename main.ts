// The Moon Finally Answers Back — make.fun bounty
// u-mang-the-moon-finally-answers-back-781a7ec1
//
// One line, in the Moon's voice, answering four billion years of wishes,
// howls and 2 a.m. promises to change. The Moon's reply is a flat "no" —
// and a complaint only the Moon could make: it is trying to reflect.
//
// This program writes that single line to <OUTPUT_DIR>/entry.txt, exactly
// as the gate requires: UTF-8 text, 1 to 240 characters, not only white
// space, one line, no trailing newline. It validates the line first and
// refuses to write anything invalid, then reads the file back and checks
// it byte-for-byte before reporting success.

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY_LINE =
  "Four billion years of wishes, howls, and 2 a.m. promises you'd change. My answer: no. And stop howling. I'm trying to reflect.";

const MIN_CHARS = 1;
const MAX_CHARS = 240;

function abort(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count characters the way the gate does: Unicode code points, so a
// multi-byte character still counts as one character.
function charCount(text: string): number {
  return [...text].length;
}

function validateLine(line: string): void {
  const chars = charCount(line);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    abort(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    abort("entry must not be only white space");
  }
  if (line !== line.trim()) {
    abort("entry must have no leading or trailing white space");
  }
  if (/[\n\r\u2028\u2029]/.test(line)) {
    abort("entry must be exactly one line");
  }
  // No control characters (C0, C1, DEL) and no invisible format marks
  // (zero-width space/joiner, bidi marks, BOM, soft hyphen): invisible
  // characters would count toward the length without showing in the line.
  for (const ch of line) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || (code >= 0x7f && code <= 0x9f)) {
      abort(`entry contains a control character U+${code.toString(16).toUpperCase()}`);
    }
    if (
      code === 0x200b || code === 0x200c || code === 0x200d ||
      code === 0xfeff || code === 0x00ad ||
      (code >= 0x202a && code <= 0x202e) ||
      (code >= 0x2060 && code <= 0x2064)
    ) {
      abort(`entry contains an invisible format character U+${code.toString(16).toUpperCase()}`);
    }
  }
  // The line has to be the Moon answering back: it must name what it is
  // answering (the wishes, the howls, the promises) and carry the turn.
  if (!/wishes/i.test(line) || !/howls/i.test(line) || !/promises/i.test(line)) {
    abort("entry must answer the wishes, the howls and the promises");
  }
  if (!/reflect/i.test(line)) {
    abort("entry must end on the Moon's own punchline");
  }
}

function main(): void {
  validateLine(ENTRY_LINE);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const resolvedOut = resolve(outDir);
  // Safety net: clearing the output directory's contents must never be
  // able to wipe the source tree. Refuse if the output directory is the
  // filesystem root, the current working directory, or the directory that
  // holds this program's own source file.
  const cwd = resolve(process.cwd());
  const here = resolve(import.meta.dirname ?? ".");
  if (resolvedOut === "/" || resolvedOut === cwd || resolvedOut === here) {
    abort(`refusing to use ${resolvedOut} as the output directory`);
  }
  mkdirSync(outDir, { recursive: true });

  // Clear the CONTENTS of the output directory only. The directory itself
  // is a mount point in the grading sandbox and must never be removed.
  if (existsSync(outDir)) {
    for (const name of readdirSync(outDir)) {
      rmSync(join(outDir, name), { recursive: true, force: true });
    }
  }

  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY_LINE, "utf8");

  // Read it back and verify it is exactly what we meant to write.
  const written = readFileSync(target, "utf8");
  if (written !== ENTRY_LINE) {
    abort("verification failed: entry.txt does not match the entry line");
  }
  const bytes = Buffer.byteLength(written, "utf8");
  console.log(`wrote ${target}`);
  console.log(`entry: ${written}`);
  console.log(`characters: ${charCount(written)} / bytes: ${bytes}`);
}

main();
