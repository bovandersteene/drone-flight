import { Action } from "@ngrx/store";
import { Flight } from "./flight";
import { LatLngLiteral } from "@agm/core";

export enum FlightActionTypes {
  LoadFlights = "[Flight] Load Flights",
  LoadFlightsSuccess = "[Flight] Load Flights success",
  SaveFlight = "[Flight] Save Flight",
  SaveFlightSuccess = "[Flight] Save Flight success",
  ActiveLocation = "[Flight] Active location"
}

export class LoadFlights implements Action {
  readonly type = FlightActionTypes.LoadFlights;
}

export class LoadFlightsSuccess implements Action {
  readonly type = FlightActionTypes.LoadFlightsSuccess;
  readonly payload: { flights: Array<Flight> };

  constructor(flights: Array<Flight>) {
    this.payload = { flights };
  }
}

export class SaveFlight implements Action {
  readonly type = FlightActionTypes.SaveFlight;
  readonly payload: { flight: Flight };

  constructor(flight: Flight) {
    this.payload = { flight };
  }
}

export class SaveFlightSuccess implements Action {
  readonly type = FlightActionTypes.SaveFlightSuccess;
  readonly payload: { flight: Flight };

  constructor(flight: Flight) {
    this.payload = { flight };
  }
}

export class ActiveLocation implements Action {
  readonly type = FlightActionTypes.ActiveLocation;
  readonly payload: { location: LatLngLiteral };

  constructor(lat: number, lng: number) {
    this.payload = { location: { lat, lng } };
  }
}

export type FlightActions =
  | SaveFlight
  | ActiveLocation
  | SaveFlightSuccess
  | LoadFlights
  | LoadFlightsSuccess;
