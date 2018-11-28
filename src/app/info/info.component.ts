import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
  constructor(private readonly dialogRef: MatDialogRef<InfoComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
