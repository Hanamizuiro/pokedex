import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key in state.commands) {
    if (Object.prototype.hasOwnProperty.call(state.commands, key)) {
      const cmd = state.commands[key];
      console.log(`${cmd.name}: ${cmd.description}`);
    }
  }
  console.log("");
}
