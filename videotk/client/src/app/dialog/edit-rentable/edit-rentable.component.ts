import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

export interface DialogData {
	myobj: any;
	id: number;
}

@Component({
	selector: "app-edit-rentable",
	templateUrl: "./edit-rentable.component.html",
	styleUrls: ["./edit-rentable.component.css"],
})
export class EditRentableComponent implements OnInit {
	editForm: FormGroup;

	matcher = new FormErrorMatcherService();

	states: IOptions[] = [
		{ value: "AVAILABLE", viewValue: "Available" },
		{ value: "RENTED", viewValue: "Rented" },
		{ value: "RUINED", viewValue: "Ruined" },
	];

	types: IOptions[] = [
		{ value: "DVD", viewValue: "DVD" },
		{ value: "CASSETTE", viewValue: "Cassette" },
		{ value: "OTHER", viewValue: "Other" },
	];

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.setForm(this.data.myobj._id);
		this.mainForm();
	}

	ngOnInit(): void {}

	get myForm() {
		return this.editForm.controls;
	}

	mainForm() {
		this.editForm = this.formBuilder.group({
			title: ["", [Validators.required]],
			dateofAcquisition: ["", [Validators.required]],
			serNum: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			state: ["", [Validators.required]],
			type: ["", [Validators.required]],
		});
	}

	setForm(id) {
		this.apiService.getRentable(id).subscribe((data) => {
			this.editForm.setValue({
				title: data["title"],
				dateofAcquisition: data["dateofAcquisition"],
				serNum: data["serNum"],
				state: data["state"],
				type: data["type"],
			});
		});
	}

	onSubmit() {}

	submitForm() {
		if (!this.editForm.valid) {
			return false;
		} else {
			this.apiService
				.updateRentable(this.data.myobj._id, this.editForm.value)
				.subscribe(
					(res) => {
						console.log("Content updated successfully!");
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}
}
