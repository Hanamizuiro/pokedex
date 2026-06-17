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

  state.rl.on("line", (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];

    if (commandName in state.commands) {
      try {
        const command = state.commands[commandName];
        command.callback(state);
      } catch (error) {
        console.error(`An error occurred while executing execution:`, error);
      }
    } else {
      console.log("Unknown command");
    }

    state.rl.prompt();
  });
}
