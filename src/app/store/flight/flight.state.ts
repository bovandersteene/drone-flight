import { Flight } from "./flight";
import { LatLngLiteral } from "@agm/core";

export interface FlightState {
  readonly flights: Array<Flight>;
  readonly activeLocation: LatLngLiteral;
}
