import { initialState, reducer } from "./flight.reducer";
import { Flight } from "./flight";
import {
  ActiveLocation,
  LoadFlightsSuccess,
  SaveFlightSuccess
} from "./flight.actions";
import { FlightState } from "./flight.state";

const location = {
  lat: 46.5284586,
  lng: 6.5824552
};
const flight: Flight = { id: 1, name: "test", path: [], location };

describe("Flight Reducer", () => {
  describe("[Flight] Load Flights Success", () => {
    it("should set the flights", () => {
      const result = reducer(initialState, new LoadFlightsSuccess([flight]));
      expect(result.flights).not.toBe(initialState.flights);
      expect(result.flights.length).toBe(1);
      expect(result.flights).toContain(flight);
      expect(result.activeLocation).toEqual(initialState.activeLocation);
    });
  });
  describe("[Flight] Active location", () => {
    it("should set the active location", () => {
      const result = reducer(
        initialState,
        new ActiveLocation(location.lat, location.lng)
      );
      expect(result.flights).toBe(initialState.flights);
      expect(result.activeLocation).not.toBe(initialState.activeLocation);
      expect(result.activeLocation).toEqual(location);
    });
  });
  describe("[Flight] Save Flight Succss", () => {
    describe("flight already exists", () => {
      const flight2 = { ...flight, id: 29 };
      const onFlightState: FlightState = {
        flights: [flight, flight2],
        activeLocation: { lat: 46.5137907, lng: 6.6168853 }
      };
      it("should update the existing flight on the state", () => {
        const newFlight = { ...flight, path: [location] };
        const result = reducer(onFlightState, new SaveFlightSuccess(newFlight));
        expect(result).not.toBe(onFlightState);
        expect(result.flights.length).toBe(2);
        expect(result.flights).toContain(newFlight);
        expect(result.flights).toContain(flight2);
        expect(result.flights[0].path).toContain(location);
        expect(result.flights[0].path.length).toBe(1);
        expect(result.activeLocation).toEqual(initialState.activeLocation);
      });
    });
    describe("New flight", () => {
      const onFlightState: FlightState = {
        flights: [flight],
        activeLocation: { lat: 46.5137907, lng: 6.6168853 }
      };
      it("should add the flight to the state", () => {
        const newFlight = { ...flight, id: 10 };
        const result = reducer(onFlightState, new SaveFlightSuccess(newFlight));
        expect(result).not.toBe(onFlightState);
        expect(result.flights.length).toBe(2);
        expect(result.flights).toContain(flight);
        expect(result.flights).toContain(newFlight);
        expect(result.activeLocation).toEqual(initialState.activeLocation);
      });
    });
  });
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
