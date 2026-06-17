import type { State } from "./state.js";

export function cleanInput(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1); // Safely parse out any additional arguments

    if (commandName in state.commands) {
      try {
        const command = state.commands[commandName];
        // Pass the arguments cleanly via the spread operator
        await command.callback(state, ...args);
      } catch (error) {
        console.error("An error occurred during command execution:", error);
      }
    } else {
      console.log("Unknown command");
    }

    state.rl.prompt();
  });
}
