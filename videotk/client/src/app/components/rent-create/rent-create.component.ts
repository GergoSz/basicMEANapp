import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-rent-create",
	templateUrl: "./rent-create.component.html",
	styleUrls: ["./rent-create.component.css"],
})
export class RentCreateComponent implements OnInit {
	createForm: FormGroup;
	Rentables: any = [];
	addedRentables: any = [];
	Clients: any = [];
	selected: any;

	//! tmp
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
		this.readRentables();
		this.readClients();
	}

	get myForm() {
		return this.createForm.controls;
	}

	get firstGroup() {
		return this.firstFormGroup.controls;
	}

	//! tmp oninit
	ngOnInit(): void {
		this.firstFormGroup = this.formBuilder.group({
			rentingclient: ["", Validators.required],
		});
		this.secondFormGroup = this.formBuilder.group({
			secondCtrl: ["", Validators.required],
		});
	}

	readRentables() {
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});
	}

	readClients() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
		});
		console.log(this.Clients);
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			dateofRent: ["", [Validators.required]],
			expiry: ["", [Validators.required]],
			Rented: [""],
		});
	}

	addRentable(rentable, i) {
		this.Rentables.splice(i, 1);
		this.addedRentables.push(rentable);
		this.createForm.value.Rented = this.addedRentables;
	}

	removeRentable(rentable, i) {
		this.addedRentables.splice(i, 1);
		this.Rentables.push(rentable);
		this.createForm.value.Rented = this.addedRentables;
	}

	submitForm() {
		if (!this.createForm.valid && this.addedRentables.length <= 0) {
			return false;
		} else {
			this.apiService.createRent(this.createForm.value).subscribe(
				(res) => {
					this.addedRentables.forEach((rentable) => {
						rentable.state = "RENTED";
						console.log(
							"RentCreateComponent -> submitForm -> rentable",
							rentable
						);
						this.apiService
							.updateRentable(rentable._id, rentable)
							.subscribe(
								() => {
									console.log("Updated!");
								},
								(error) => {
									console.log(error);
								}
							);
					});

					this.selected.Rents.push(res);
					this.apiService
						.updateClient(this.selected._id, this.selected)
						.subscribe(() => {
							console.log("Client updated!");
						});
					console.log("Rent successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
//TODO: This is a dialog! Put it in the dialog folder and refactor.
