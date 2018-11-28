import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { FlightState } from "../../store/flight/flight.state";
import { Flight, fromFlight } from "../../store/flight";
import { SaveFlight } from "../../store/flight/flight.actions";
import { Observable, Subject } from "rxjs";
import { LatLngLiteral } from "@agm/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap } from "rxjs/operators";
import { getLocation } from "../../store/flight/flight.selector";

@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.scss"]
})
export class FlightComponent implements OnInit, OnDestroy {
  flightForm: FormGroup;
  flight$: Observable<Flight>;
  location$: Observable<LatLngLiteral>;

  private destroy$ = new Subject();
  private changedPath: Array<LatLngLiteral>;

  constructor(
    private readonly store: Store<FlightState>,
    private readonly router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.location$ = this.store.pipe(select(getLocation));

    this.flightForm = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      location: new FormControl(location, [Validators.required])
    });

    this.flight$ = this.router.params.pipe(
      map(param => param.id),
      switchMap(id =>
        this.store.pipe(select(fromFlight.selectors.findFlight(+id)))
      ),
      tap(({ name, location, id }) =>
        this.flightForm.setValue({ name, location, id })
      ),
      tap(({ path }) => this.changePath(path))
    );
  }

  saveFlight() {
    if (this.flightForm.valid && this.changedPath && this.changedPath.length) {
      const { id, name, location } = this.flightForm.value;
      const flight: Flight = {
        id,
        name,
        location,
        path: this.changedPath
      };
      this.store.dispatch(new SaveFlight(flight));
    }
  }

  changeLocation(coords: LatLngLiteral) {
    this.flightForm.get("location").setValue(coords);
  }

  changePath(path: Array<LatLngLiteral>) {
    this.changedPath = path;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
