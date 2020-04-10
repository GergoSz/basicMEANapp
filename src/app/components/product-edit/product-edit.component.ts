import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  updateForm: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  get myForm() {
    return this.updateForm.controls;
  }

  ngOnInit(): void {
    this.mainForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(id);
  }


  mainForm() {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z][a-z].+([a-z])+$')]],
      cost: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.updateForm.setValue({
        name: data.name,
        amount: data.amount,
        cost: data.cost
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      const dialogRef = this.dialog.open(UpdateDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = this.route.snapshot.paramMap.get('id');
          this.apiService.updateEmployee(id, this.updateForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/product-list');
              console.log('Content updated successfully!');
            }, (error) => {
              console.log(error);
            });
        }
      });
    }
  }

}
