import { Component, OnInit } from "@angular/core";
import { Flight } from "./store/flight";
import { FlightState } from "./store/flight/flight.state";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectFlights } from "./store/flight/flight.selector";
import { MatDialog } from "@angular/material";
import { InfoComponent } from "./info/info.component";
import { LoadFlights } from "./store/flight/flight.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  flights$: Observable<Array<Flight>>;

  constructor(
    private readonly flightStore: Store<FlightState>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.flightStore.dispatch(new LoadFlights());
    this.flights$ = this.flightStore.pipe(select(selectFlights));
  }

  trackByFlight(flight: Flight): string {
    return flight.name;
  }

  openInfo() {
    this.dialog.open(InfoComponent);
  }
}
