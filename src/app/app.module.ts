import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./store/app.effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material";
import { SharedModule } from "./shared/shared.module";
import { fromFlight } from "./store/flight";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AgmCoreModule } from "@agm/core";
import { InfoComponent } from "./info/info.component";
import { FlightEffects } from "./store/flight/fligth.efffect";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent, InfoComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(fromFlight.FEATURE_NAME, fromFlight.reducer),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([FlightEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: environment.mapKey
    })
  ],
  entryComponents: [InfoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
