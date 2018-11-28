import { Injectable } from "@angular/core";
import { Flight } from "../../store/flight";
import { Observable, of } from "rxjs";

const flight1: Flight = {
  id: 1,
  name: "Flight BE",
  location: { lat: 50.77566485829522, lng: 3.288654750466776 },
  path: [
    { lat: 50.77741580102, lng: 3.283764123916626 },
    { lat: 50.77759240436126, lng: 3.289328606826075 },
    { lat: 50.77749427201224, lng: 3.2917881086736998 },
    { lat: 50.77636280678933, lng: 3.292777843800195 },
    { lat: 50.77542178424991, lng: 3.293191364993163 },
    { lat: 50.77435835404937, lng: 3.292889155474313 },
    { lat: 50.77423623002831, lng: 3.2921001250192603 },
    { lat: 50.7742074216461, lng: 3.2904994329705914 },
    { lat: 50.77403753928911, lng: 3.2895864341676315 },
    { lat: 50.77356051375266, lng: 3.2886210484698495 },
    { lat: 50.774050843670715, lng: 3.2883283524110993 },
    { lat: 50.773851463069605, lng: 3.286546736982473 },
    { lat: 50.77494146005087, lng: 3.286076889400192 },
    { lat: 50.776308346301825, lng: 3.284933304440983 },
    { lat: 50.77660330531768, lng: 3.283734154209924 }
  ]
};
const flight2: Flight = {
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

@Injectable({
  providedIn: "root"
})
export class FlightService {
  constructor() {}

  loadFlights(): Observable<Array<Flight>> {
    // TODO receive from the real backend
    return of([flight1, flight2]);
  }

  saveFlight(flight: Flight): Observable<Flight> {
    // TODO save to the real backend
    return of(flight);
  }
}
