# The Moon Finally Answers Back

[![make.fun](https://make.fun/badge/u-mang-the-moon-finally-answers-back-781a7ec1.svg)](https://make.fun/bounty/u-mang-the-moon-finally-answers-back-781a7ec1)
[![rank](https://make.fun/badge/u-mang-the-moon-finally-answers-back-781a7ec1/lerrboyy/moon-answers-back/rank.svg)](https://make.fun/bounty/u-mang-the-moon-finally-answers-back-781a7ec1)
[![reward](https://make.fun/badge/u-mang-the-moon-finally-answers-back-781a7ec1/lerrboyy/moon-answers-back/reward.svg)](https://make.fun/bounty/u-mang-the-moon-finally-answers-back-781a7ec1)

Entry for the [make.fun bounty "The Moon Finally Answers Back"](https://make.fun/bounty/u-mang-the-moon-finally-answers-back-781a7ec1): one line, in the Moon's voice, answering the wishes, howls and late-night promises of everyone staring up at it.

## The line

> Four billion years of wishes, howls, and 2 a.m. promises you'd change. My answer: no. And stop howling. I'm trying to reflect.

126 characters. The Moon has been listening to all three inputs for its whole life, so the line names all three in the first sentence, answers with a flat "no" mid-line, and closes on a pun only the Moon can make: it literally reflects sunlight — and it would like to do so in peace.

## How it works

`main.ts` holds the line as a single constant and validates it before writing anything:

- 1–240 characters, non-blank, exactly one line, no leading/trailing white space
- no control characters and no invisible format characters
- must answer the wishes, the howls and the promises, and end on the Moon's punchline

It then clears only the *contents* of the output directory (never the directory itself), writes the line to `entry.txt` with no trailing newline, reads the file back, and verifies it byte-for-byte.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Expected output: `characters: 126 / bytes: 126`.

## License

MIT — see [LICENSE](LICENSE).
