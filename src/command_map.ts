import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  if (state.nextLocationsURL === null && state.prevLocationsURL !== null) {
    console.log("You are on the last page.");
    return;
  }

  const urlToFetch = state.nextLocationsURL ?? undefined;
  const data = await state.pokeAPI.fetchLocations(urlToFetch);

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const location of data.results) {
    console.log(location.name);
  }
}
