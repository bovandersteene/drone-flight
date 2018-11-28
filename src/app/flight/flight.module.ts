import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlightRoutingModule } from "./flight-routing.module";
import { FlightComponent } from "./flight/flight.component";
import { MapComponent } from "./map/map.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [FlightComponent, MapComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule
  ]
})
export class FlightModule {}
