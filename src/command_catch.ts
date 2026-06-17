import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log(
      "Error: Please specify a Pokemon name to catch. Usage: catch <pokemon-name>",
    );
    return;
  }

  const pokemonName = args[0].toLowerCase();
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);

    // Catch calculation: higher experience scales difficulty down.
    // Ensure threshold retains a minimum 5% baseline catch rate.
    const catchChance = Math.max(0.05, 1 - pokemonData.base_experience / 350);
    const randomRoll = Math.random();

    if (randomRoll <= catchChance) {
      console.log(`${pokemonData.name} was caught!`);
      // Register into your pokedex
      state.pokedex[pokemonData.name] = pokemonData;
      console.log("Registered to your Pokédex database.");
    } else {
      console.log(`${pokemonData.name} escaped!`);
    }
  } catch (error) {
    console.log(
      `Could not locate Pokemon "${pokemonName}". Verify spelling and try again.`,
    );
  }
}
