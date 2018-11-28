import { FEATURE_NAME } from "./flight.selector";
import { reducer } from "./flight.reducer";
import * as selectors from "./flight.selector";
export * from "./flight";

export const fromFlight = {
  FEATURE_NAME,
  reducer,
  selectors
};
