import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FlightComponent } from "./flight.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MockStoreModule } from "../../../../test-helper";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { FlightState } from "../../store/flight/flight.state";
import { Flight } from "../../store/flight";
import { Subject } from "rxjs";
import { SaveFlight } from "../../store/flight/flight.actions";

const paramsSubject = new Subject();

class RouterMock {
  params = paramsSubject;
}

const location = { lat: 46.5188994165887, lng: 6.610714181232424 };
const flight: Flight = {
  id: 2,
  name: "Flight Lausanne",
  path: [
    { lat: 46.51952679624158, lng: 6.611394037382979 },
    { lat: 46.51926061859036, lng: 6.6125447888694 },
    { lat: 46.5184769874756, lng: 6.613104113268037 },
    { lat: 46.51821775486644, lng: 6.612684096100111 },
    { lat: 46.51739173123267, lng: 6.61203145980835 },
    { lat: 46.51803007072376, lng: 6.610243495444138 },
    { lat: 46.51767033135854, lng: 6.609494907671888 },
    { lat: 46.51865584543093, lng: 6.6081090018919895 },
    { lat: 46.51913747854242, lng: 6.609115291277249 }
  ],
  location: { lat: 46.5188994165887, lng: 6.610714181232424 }
};

describe("FlightComponent", () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let store: Store<FlightState>;
  let router: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: RouterMock
        }
      ],
      imports: [
        MockStoreModule.forRoot("flight", {
          flights: [flight],
          activeLocation: location
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightComponent);
    router = TestBed.get(ActivatedRoute);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("navigate to an existing flight", () => {
    beforeEach(() => {
      jest.spyOn(component, "changePath");
      paramsSubject.next({ id: flight.id });
    });
    it("should set the form", () => {
      const formValue = component.flightForm.value;
      expect(formValue.id).toBe(flight.id);
      expect(formValue.name).toBe(flight.name);
      expect(formValue.location).toBe(flight.location);
      expect(component.changePath).toHaveBeenCalledWith(flight.path);
    });
    it("should render the component with values", () => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement).toMatchSnapshot(
        "existing flight"
      );
    });
  });
  describe("navigate to an NON existing flight", () => {
    beforeEach(() => {
      jest.spyOn(component, "changePath");
      paramsSubject.next({});
    });
    it("should set the form with default values", () => {
      const formValue = component.flightForm.value;
      expect(formValue.id).not.toBe(flight.id);
      expect(formValue.id).toBeDefined();
      expect(formValue.location).toBe(location);
      expect(formValue.name.length).toBe(0);
      expect(component.changePath).toHaveBeenCalledWith([]);
    });
    it("should render the component with values", () => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement).toMatchSnapshot(
        "NON existing flight"
      );
    });
  });

  describe("saveFlight", () => {
    describe("the form is not valid", () => {
      it("should not dispatch the saveFlight", () => {
        jest.spyOn(store, "dispatch");
        component.flightForm.setValue({ id: 123, name: "", location: {} });
        component.saveFlight();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
    describe("the form is valid", () => {
      describe("the paths are empty", () => {
        it("should not dispatch the saveFlight", () => {
          jest.spyOn(store, "dispatch");
          component.flightForm.setValue({
            id: 123,
            name: "new flight",
            location
          });
          expect(component.flightForm.valid).toBe(true);
          component.changePath([]);
          component.saveFlight();
          expect(store.dispatch).not.toHaveBeenCalled();
        });
        describe("the paths is set", () => {
          it("should not dispatch the saveFlight", () => {
            jest.spyOn(store, "dispatch");
            const { id, name } = flight;
            component.flightForm.setValue({
              id,
              name,
              location: flight.location
            });
            expect(component.flightForm.valid).toBe(true);
            component.changePath(flight.path);
            component.saveFlight();
            expect(store.dispatch).toHaveBeenCalledWith(new SaveFlight(flight));
          });
        });
      });
    });

    describe("changeLocation", () => {
      it("should set the location", () => {
        component.flightForm.get("location").setValue(undefined);
        component.changeLocation(location);
        expect(component.flightForm.value.location).toBe(location);
      });
    });
  });
});
