import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log(
      "Error: Please provide a location area name. Usage: explore <area-name>",
    );
    return;
  }

  const areaName = args[0];
  console.log(`Exploring ${areaName}...`);

  try {
    const locationData = await state.pokeAPI.fetchLocation(areaName);

    console.log("Found Pokemon:");
    if (locationData.pokemon_encounters.length === 0) {
      console.log(" - No wild Pokemon encountered in this area.");
      return;
    }

    for (const encounter of locationData.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  } catch (error) {
    console.log(
      `Could not find location area: "${areaName}". Check spelling and try again.`,
    );
  }
}
