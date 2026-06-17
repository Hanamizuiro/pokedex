import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: Array<{ pokemon: { name: string; url: string } }>;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cacheIntervalMs: number = 5 * 60 * 1000) {
    this.#cache = new Cache(cacheIntervalMs);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cachedData = this.#cache.get<ShallowLocations>(url);
    if (cachedData) return cachedData;

    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch locations: ${response.statusText}`);

    const data = (await response.json()) as ShallowLocations;
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cachedData = this.#cache.get<Location>(url);
    if (cachedData) return cachedData;

    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch area detail: ${response.statusText}`);

    const data = (await response.json()) as Location;
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cachedData = this.#cache.get<Pokemon>(url);
    if (cachedData) return cachedData;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokemon details: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as Pokemon;
    this.#cache.add(url, data);
    return data;
  }
}
