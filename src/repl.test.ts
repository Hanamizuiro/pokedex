import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  ["  Hello World  ", "hello world"],
  ["   Test Input   ", "test input"],
  ["   Mixed CASE   ", "mixed case"],
  ["   Leading and trailing spaces   ", "leading and trailing spaces"],
])("cleanInput", (input, expected) => {
  test(`should clean input "${input}" to "${expected}"`, () => {
    expect(cleanInput(input)).toBe(expected);
    for (const char of input) {
      expect(cleanInput(char)).toBe(char.toLowerCase().trim());
    }
  });
});
