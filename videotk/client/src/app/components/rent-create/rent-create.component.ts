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

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
		this.readRentables();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	readRentables() {
		this.apiService.getRentables().subscribe((data) => {
			this.Rentables = data;
		});
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
		if (!this.createForm.valid) {
			return false;
		} else {
			this.apiService.createRent(this.createForm.value).subscribe(
				() => {
					//TODO: Update status of rented rentables
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
