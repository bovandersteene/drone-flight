import { LatLngLiteral } from "@agm/core";

export interface Flight {
  readonly id: number;
  readonly name: string;
  readonly location: LatLngLiteral;
  readonly path: Array<LatLngLiteral>;
}
