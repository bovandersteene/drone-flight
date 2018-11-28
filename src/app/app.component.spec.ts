import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MockStoreModule } from "../../test-helper";
import { Flight } from "./store/flight";
import { MatDialog } from "@angular/material";
import { LoadFlights } from "./store/flight/flight.actions";
import { Store } from "@ngrx/store";
import { FlightState } from "./store/flight/flight.state";

const flight = {
  id: 2,
  name: "Flight Lausanne"
} as Flight;

class MatDialogMock {
  open = jest.fn();
}

describe("AppComponent", () => {
  let matDialog: MatDialogMock;
  let store: Store<FlightState>;
  let app: AppComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockStoreModule.forRoot("flight", {
          flights: [flight]
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock
        }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    matDialog = TestBed.get(MatDialog);
    store = TestBed.get(Store);
    app = fixture.debugElement.componentInstance;
  });
  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should match the default snapshot", () => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it("it should load the flights", () => {
    jest.spyOn(store, "dispatch");
    app.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadFlights());
  });

  describe("on info click", () => {
    it("should open the info dialog", () => {
      const compiled = fixture.debugElement.nativeElement;
      const infoButton = compiled.querySelector("button");
      infoButton.click();
      expect(matDialog.open).toHaveBeenCalled();
    });
  });
});
