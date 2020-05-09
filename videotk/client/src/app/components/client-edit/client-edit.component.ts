import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/dialog/edit-rentable/edit-rentable.component";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-client-edit",
	templateUrl: "./client-edit.component.html",
	styleUrls: ["./client-edit.component.css"],
})
export class ClientEditComponent implements OnInit {
	editForm: FormGroup;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.mainForm();
		this.setForm(this.data.myobj._id);
	}

	ngOnInit(): void {}

	get myForm() {
		return this.editForm.controls;
	}

	mainForm() {
		this.editForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			phoneNum: [
				"",
				[Validators.required, Validators.pattern("^[0-9]+$")],
			],
			IDnum: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			address: this.formBuilder.group({
				city: [
					"",
					[Validators.required, Validators.pattern("^[A-Z].+$")],
				],
				street: [
					"",
					[Validators.required, Validators.pattern("^[A-Z].+$")],
				],
				house: [
					"",
					[Validators.required, Validators.pattern("^[0-9]+$")],
				],
			}),
		});
	}

	setForm(id) {
		this.apiService.getClient(id).subscribe((data) => {
			this.editForm.setValue({
				name: data["name"],
				phoneNum: data["phoneNum"],
				IDnum: data["IDnum"],
				address: data["address"],
			});
			/*this.editForm.patchValue({
				name: data.name,
			});*/

			/*this.editForm.controls.address
				.get("city")
				.setValue(data.address.city);*/
		});
	}

	submitForm() {
		if (!this.editForm.valid) {
			return false;
		} else {
			this.apiService
				.updateClient(this.data.myobj._id, this.editForm.value)
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
//TODO: This is a dialog! Put it in the dialog folder and refactor.
