import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MapComponent } from "./map.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { describe } from "selenium-webdriver/testing";
import { LatLngLiteral } from "@agm/core";

const location = { lat: 46.5137907, lng: 6.6168853 } as LatLngLiteral;
const path = [
  { lat: 46.51952679624158, lng: 6.611394037382979 },
  { lat: 46.51926061859036, lng: 6.6125447888694 },
  { lat: 46.5184769874756, lng: 6.613104113268037 }
];

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.latitude = location.lat;
    component.longitude = location.lng;
    component.paths = path;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should match the snapshot", () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
  describe("moveNode", () => {
    it("should call the change the node position", () => {
      jest.spyOn(component.changePath, "emit");
      component.moveNode(1, { coords: location });
      expect(component.changePath.emit).toHaveBeenCalledWith([
        path[0],
        location,
        path[2]
      ]);
    });
  });
  describe("deleteNode", () => {
    it("should call the delete the node", () => {
      jest.spyOn(component.changePath, "emit");
      component.deleteNode(1);
      expect(component.changePath.emit).toHaveBeenCalledWith([
        path[0],
        path[2]
      ]);
    });
  });
  describe("addNode", () => {
    it("should call the add the path to the pathlist", () => {
      jest.spyOn(component.changePath, "emit");
      component.addNode({ coords: location });
      expect(component.changePath.emit).toHaveBeenCalledWith([
        path[0],
        path[1],
        path[2],
        location
      ]);
    });
  });
  describe("centerChanged", () => {
    it("should change the location", () => {
      jest.spyOn(component.changeLocation, "emit");
      component.centerChanged(location);
      expect(component.changeLocation.emit).toHaveBeenCalledWith(location);
    });
  });
});
