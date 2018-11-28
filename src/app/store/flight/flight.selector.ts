import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FlightState } from "./flight.state";
import { Flight } from "./flight";
import { LatLngLiteral } from "@agm/core";

export const FEATURE_NAME = "flight";

export const selectFlightState = createFeatureSelector<FlightState>(
  FEATURE_NAME
);

const findOrCreateFlight = (
  id: number,
  flights: Array<Flight>,
  location: LatLngLiteral
): Flight => {
  const flight = flights.find(f => f.id === id);
  if (flight) {
    return flight;
  }
  return { location, path: [], name: "", id: new Date().getTime() };
};

export const selectFlights = createSelector(
  selectFlightState,
  state => state.flights
);
export const findFlight = (id: number) =>
  createSelector(
    selectFlightState,
    state => findOrCreateFlight(id, state.flights, state.activeLocation)
  );
export const getLocation = createSelector(
  selectFlightState,
  state => state.activeLocation
);
