import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log(
      "Error: Please specify a Pokemon name to inspect. Usage: inspect <pokemon-name>",
    );
    return;
  }

  const pokemonName = args[0].toLowerCase();

  if (!(pokemonName in state.pokedex)) {
    console.log("you have not caught that pokemon");
    return;
  }

  const pokemon = state.pokedex[pokemonName];

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);

  console.log("Stats:");
  for (const statItem of pokemon.stats) {
    console.log(`  -${statItem.stat.name}: ${statItem.base_stat}`);
  }

  console.log("Types:");
  for (const typeItem of pokemon.types) {
    console.log(`  - ${typeItem.type.name}`);
  }
}
