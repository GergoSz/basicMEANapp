import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteRentableComponent } from "src/app/dialog/delete-rentable/delete-rentable.component";
import { EditRentableComponent } from "src/app/dialog/edit-rentable/edit-rentable.component";
import { ApiService } from "src/app/service/api.service";
import { RentableAddComponent } from "../rentable-add/rentable-add.component";

@Component({
	selector: "app-rentable-list",
	templateUrl: "./rentable-list.component.html",
	styleUrls: ["./rentable-list.component.css"],
})
export class RentableListComponent implements OnInit {
	Rentables: any = [];
	imgClass;

	constructor(private apiService: ApiService, public dialog: MatDialog) {
		this.readRentables();
	}

	ngOnInit(): void {}

	readRentables() {
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});
	}

	removeRentable(rentable, index) {
		const dialogRef = this.dialog.open(DeleteRentableComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.apiService
					.deleteRentable(rentable._id)
					.subscribe((data) => {
						this.Rentables.splice(index, 1);
					});
			}
		});
	}

	editRentable(rentable, index) {
		const dialogRef = this.dialog.open(EditRentableComponent, {
			data: { rentable: rentable, index: index },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readRentables();
			}
		});
	}

	createRentable() {
		const dialogRef = this.dialog.open(RentableAddComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readRentables();
			}
		});
	}
}
