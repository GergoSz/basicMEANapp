import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { ClientCreateComponent } from "../client-create/client-create.component";

@Component({
	selector: "app-client-list",
	templateUrl: "./client-list.component.html",
	styleUrls: ["./client-list.component.css"],
})
export class ClientListComponent implements OnInit {
	Clients: any = [];
	constructor(private apiService: ApiService, public dialog: MatDialog) {
		this.readClients();
	}

	ngOnInit(): void {}

	readClients() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
		});
	}

	createClient() {
		const dialogRef = this.dialog.open(ClientCreateComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readClients();
				console.log(this.Clients);
			}
		});
	}
}
