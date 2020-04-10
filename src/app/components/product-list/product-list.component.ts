import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: any = [];

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.readProduct();
  }

  ngOnInit(): void {
  }

  readProduct() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Products = data;
    });
  }

  removeProduct(product, index) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteEmployee(product._id).subscribe((data) => {
          this.Products.splice(index, 1);
        }
        );
      }
    });
  }

}
