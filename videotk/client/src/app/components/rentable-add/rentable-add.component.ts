import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { FormErrorMatcherService } from 'src/app/service/form-error-matcher.service';


interface IOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rentable-add',
  templateUrl: './rentable-add.component.html',
  styleUrls: ['./rentable-add.component.css']
})
export class RentableAddComponent implements OnInit {

  submitted = false;

  createForm: FormGroup;

  matcher = new FormErrorMatcherService();

  states: IOptions[] = [
    {value: 'AVAILABLE', viewValue: 'Available'},
    {value: 'RENTED', viewValue: 'Rented'},
    {value: 'RUINED', viewValue: 'Ruined'}
  ];

  types: IOptions[] = [
    {value: 'DVD', viewValue: 'DVD'},
    {value: 'CASSETTE', viewValue: 'Cassette'},
    {value: 'OTHER', viewValue: 'Other'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  get myForm() {
    return this.createForm.controls;
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[A-Z].+$')]],
      dateofAcquisition: ['', [Validators.required]],
      serNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      state: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      this.apiService.createRentable(this.createForm.value).subscribe(
        (res) => {
          console.log('Rentable successfully created!!');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
