import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoComponent } from "./info.component";
import { MatDialogRef } from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";

class MatDialogRefMock {
  close = jest.fn();
}

describe("InfoComponent", () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let dialogRef: MatDialogRefMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoComponent],
      providers: [
        {
          provide: MatDialogRef,
          useClass: MatDialogRefMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    dialogRef = TestBed.get(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
  describe("on close click", () => {
    it("should open the info dialog", () => {
      const compiled = fixture.debugElement.nativeElement;
      const infoButton = compiled.querySelector("button");
      expect(infoButton).toBeDefined();
      infoButton.click();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
