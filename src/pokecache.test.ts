import { describe, it, expect, test, afterEach } from "vitest";
import { Cache } from "./pokecache.js";

describe("Pokecache Basic Operations", () => {
  let activeCache: Cache | null = null;

  afterEach(() => {
    if (activeCache) {
      activeCache.stopReapLoop();
      activeCache = null;
    }
  });

  it("should retrieve stored items perfectly and return undefined for missed keys", () => {
    activeCache = new Cache(5000);
    activeCache.add("https://pokeapi.co/api/v2/pokemon/1", {
      name: "bulbasaur",
    });

    const hit = activeCache.get<{ name: string }>(
      "https://pokeapi.co/api/v2/pokemon/1",
    );
    const miss = activeCache.get<any>("non-existent-key");

    expect(hit).toBeDefined();
    expect(hit?.name).toBe("bulbasaur");
    expect(miss).toBeUndefined();
  });
});

// Concurrent data-driven reap testing
test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 60, // Slightly higher than 50ms to stabilize loop cycles
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 100,
  },
])("Test Caching $interval ms expiration", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  // Verify addition and extraction
  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  // Give the background reaper plenty of time to clear the key
  await new Promise((resolve) => setTimeout(resolve, interval * 2.5));

  const reaped = cache.get(key);
  expect(reaped).toBeUndefined();

  // Clean up interval loop manually
  cache.stopReapLoop();
});
