import { Injectable } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Injectable({
	providedIn: "root",
})
export class FormErrorMatcherService implements ErrorStateMatcher {
	/** Error when invalid control is dirty, touched, or submitted. */
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const isSubmitted = form && form.submitted;
		return !!(
			control &&
			control.invalid &&
			(control.dirty || control.touched || isSubmitted)
		);
	}
}
