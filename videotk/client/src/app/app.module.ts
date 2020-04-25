import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { RentCreateComponent } from './components/rent-create/rent-create.component';
import { RentListComponent } from './components/rent-list/rent-list.component';
import { RentableAddComponent } from './components/rentable-add/rentable-add.component';
import { RentableListComponent } from './components/rentable-list/rentable-list.component';
import { DeleteRentableComponent } from './dialog/delete-rentable/delete-rentable.component';
import { EditRentableComponent } from './dialog/edit-rentable/edit-rentable.component';
import { MaterialModule } from './material.module';
import { ApiService } from './service/api.service';



@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientCreateComponent,
    ClientEditComponent,
    RentableAddComponent,
    RentableListComponent,
    RentCreateComponent,
    RentListComponent,
    DeleteRentableComponent,
    EditRentableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [ApiService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
