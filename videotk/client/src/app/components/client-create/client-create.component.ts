import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-client-create",
	templateUrl: "./client-create.component.html",
	styleUrls: ["./client-create.component.css"],
})
export class ClientCreateComponent implements OnInit {
	createForm: FormGroup;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
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

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			console.log(
				"ClientCreateComponent -> this.createForm.value",
				this.createForm.value
			);
			this.apiService.createClient(this.createForm.value).subscribe(
				() => {
					console.log("Client successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

//TODO: This is a dialog! Put it in the dialog folder and refactor.
