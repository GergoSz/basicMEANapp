import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { ClientCreateComponent } from "../client-create/client-create.component";
import { ClientEditComponent } from "../client-edit/client-edit.component";

@Component({
	selector: "app-client-list",
	templateUrl: "./client-list.component.html",
	styleUrls: ["./client-list.component.css"],
})
export class ClientListComponent implements OnInit {
	Clients: any = [];
	panelOpenState = false;
	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.readClients();
	}

	readClients() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
			console.log(this.Clients);
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

	toggleClient(client) {
		client.isDeleted = !client.isDeleted;
		this.apiService.updateClient(client._id, client).subscribe(
			(res) => {
				console.log(res + "Client deleted successfully!");
			},
			(error) => {
				console.log(error);
			}
		);
	}
	editClient(client) {
		const dialogRef = this.dialog.open(ClientEditComponent, {
			data: { myobj: client, index: client._id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readClients();
			}
		});
	}
}
