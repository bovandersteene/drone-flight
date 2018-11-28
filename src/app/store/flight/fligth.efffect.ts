import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  FlightActionTypes,
  LoadFlightsSuccess,
  SaveFlight,
  SaveFlightSuccess
} from "./flight.actions";
import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs/operators";
import { FlightService } from "../../flight/service/flight.service";

@Injectable()
export class FlightEffects {
  @Effect()
  loadFligth$ = this.actions$.pipe(
    ofType<SaveFlight>(FlightActionTypes.LoadFlights),
    switchMap(() => this.flightService.loadFlights()),
    map(flights => new LoadFlightsSuccess(flights))
  );

  @Effect()
  saveFlight$ = this.actions$.pipe(
    ofType<SaveFlight>(FlightActionTypes.SaveFlight),
    switchMap(action => this.flightService.saveFlight(action.payload.flight)),
    map(flight => new SaveFlightSuccess(flight))
  );

  constructor(
    private readonly actions$: Actions,
    private readonly flightService: FlightService
  ) {}
}
