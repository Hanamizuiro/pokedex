import { describe, it, expect } from "vitest";
import { cleanInput } from "./repl.js";

describe("cleanInput", () => {
  it('should clean input "  Hello World  " to ["hello", "world"]', () => {
    expect(cleanInput("  Hello World  ")).toEqual(["hello", "world"]);
  });

  it('should clean input "   Test Input   " to ["test", "input"]', () => {
    expect(cleanInput("   Test Input   ")).toEqual(["test", "input"]);
  });

  it('should clean input "   Mixed CASE   " to ["mixed", "case"]', () => {
    expect(cleanInput("   Mixed CASE   ")).toEqual(["mixed", "case"]);
  });

  it('should clean input "   Leading and trailing spaces   " to ["leading", "and", "trailing", "spaces"]', () => {
    expect(cleanInput("   Leading and trailing spaces   ")).toEqual([
      "leading",
      "and",
      "trailing",
      "spaces",
    ]);
  });
});
