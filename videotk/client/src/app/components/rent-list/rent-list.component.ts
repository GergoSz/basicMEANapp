import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ApiService } from "src/app/service/api.service";
import { RentCreateComponent } from "../rent-create/rent-create.component";

@Component({
	selector: "app-rent-list",
	templateUrl: "./rent-list.component.html",
	styleUrls: ["./rent-list.component.css"],
})
export class RentListComponent implements OnInit {
	Rents: any = [];
	Rentables: any = [];
	availableCount: number = 0;
	constructor(
		private apiService: ApiService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.readRents();
		this.readAvailables();
	}

	ngOnInit(): void {}

	readAvailables() {
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});

		this.Rentables.forEach((rentable) => {
			if (rentable.status == "AVAILABLE") {
				this.availableCount++;
			}
		});
	}

	readRents() {
		this.apiService.getRents().subscribe((data) => {
			this.Rents = data;
		});
	}

	createRent() {
		if (this.availableCount > 0) {
			const dialogRef = this.dialog.open(RentCreateComponent);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.readRents();
				}
			});
		} else {
			const config = new MatSnackBarConfig();
			config.duration = 1000;
			config.panelClass = ["warn-snackbar"];
			this.snackBar.open("There is nothing to rent!", "", config);
		}
	}
}
