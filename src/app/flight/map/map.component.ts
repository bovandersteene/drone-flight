import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { LatLngLiteral } from "@agm/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  @Input()
  latitude: number;
  @Input()
  longitude: number;
  @Output()
  changePath = new EventEmitter<Array<LatLngLiteral>>();
  @Output()
  changeLocation = new EventEmitter<LatLngLiteral>();

  private _paths: Array<LatLngLiteral> = [];

  moveNode(index, coords: { coords: LatLngLiteral }) {
    this._paths[index] = coords.coords;
    this.changePath.emit(this.paths);
  }

  deleteNode(index) {
    this.paths.splice(index, 1);
    this.changePath.emit(this.paths);
  }

  addNode(coords: { coords: LatLngLiteral }) {
    this._paths = [...this.paths, coords.coords];
    this.changePath.emit(this.paths);
  }

  centerChanged(coords: LatLngLiteral) {
    this.changeLocation.emit(coords);
  }

  @Input()
  set paths(paths: Array<LatLngLiteral>) {
    this._paths = [...paths];
  }

  get paths() {
    return this._paths;
  }
}
