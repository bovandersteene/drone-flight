import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from "@angular/material";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const imports = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FontAwesomeModule,
  MatCardModule,
  MatListModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: imports,
  exports: imports
})
export class SharedModule {}
