import { FlightActions, FlightActionTypes } from "./flight.actions";
import { FlightState } from "./flight.state";

export const initialState: FlightState = {
  flights: [],
  activeLocation: { lat: 46.5137907, lng: 6.6168853 }
};

export function reducer(
  state = initialState,
  action: FlightActions
): FlightState {
  switch (action.type) {
    case FlightActionTypes.LoadFlightsSuccess:
      return { ...state, flights: action.payload.flights };
    case FlightActionTypes.SaveFlightSuccess:
      const { id } = action.payload.flight;
      const flightExist = state.flights.find(flight => flight.id === id);
      if (flightExist) {
        return {
          ...state,
          flights: state.flights.map(flight =>
            flight.id === id ? action.payload.flight : flight
          )
        };
      }
      return {
        ...state,
        flights: [...state.flights, action.payload.flight]
      };
    case FlightActionTypes.ActiveLocation:
      return { ...state, activeLocation: action.payload.location };
    default:
      return state;
  }
}
