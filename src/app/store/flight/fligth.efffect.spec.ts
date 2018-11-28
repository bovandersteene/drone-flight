import { FlightEffects } from "./fligth.efffect";
import { Observable, of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { FlightService } from "../../flight/service/flight.service";
import { marbles } from "rxjs-marbles";
import {
  LoadFlights,
  LoadFlightsSuccess,
  SaveFlight,
  SaveFlightSuccess
} from "./flight.actions";
import { Flight } from "./flight";

describe("FlightEffect", () => {
  let flightService: FlightService;
  let effects: FlightEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightEffects, provideMockActions(() => actions)]
    });

    effects = TestBed.get(FlightEffects);
    flightService = TestBed.get(FlightService);
  });

  it("should exist", () => {
    expect(effects).toBeDefined();
  });

  describe("[Flight] Load Flights", () => {
    it(
      "should render a LoadFlightsSuccess",
      marbles(m => {
        const flights = [];
        jest.spyOn(flightService, "loadFlights").mockReturnValue(of(flights));
        const values = {
          input: {
            a: new LoadFlights(),
            b: {}
          },
          output: {
            a: new LoadFlightsSuccess(flights)
          }
        };
        const inputStream = "-a-b-a-";
        const ouputStream = "-a---a-";
        actions = m.hot(inputStream, values.input);
        m.expect(effects.loadFligth$).toBeObservable(
          ouputStream,
          values.output
        );
        m.flush();
        expect(flightService.loadFlights).toHaveBeenCalledTimes(2);
      })
    );
  });
  describe("[Flight] Save Flight", () => {
    it(
      "should render a SaveFlightSuccess",
      marbles(m => {
        const flight = {} as Flight;
        jest.spyOn(flightService, "saveFlight").mockReturnValue(of(flight));
        const values = {
          input: {
            a: new SaveFlight(flight),
            b: {}
          },
          output: {
            a: new SaveFlightSuccess(flight)
          }
        };
        const inputStream = "-a-b-a-";
        const ouputStream = "-a---a-";
        actions = m.hot(inputStream, values.input);
        m.expect(effects.saveFlight$).toBeObservable(
          ouputStream,
          values.output
        );
        m.flush();
        expect(flightService.saveFlight).toHaveBeenCalledTimes(2);
      })
    );
  });
});
