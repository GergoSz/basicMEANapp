import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { RentCreateComponent } from './components/rent-create/rent-create.component';
import { RentListComponent } from './components/rent-list/rent-list.component';
import { RentableAddComponent } from './components/rentable-add/rentable-add.component';
import { RentableListComponent } from './components/rentable-list/rentable-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'client-list' },
  { path: 'client-list' , component: ClientListComponent},
  { path: 'client-create' , component: ClientCreateComponent },
  { path: 'client-edit/:id', component: ClientEditComponent },
  { path: 'rentable-list', component: RentableListComponent },
  { path: 'rentable-add' , component: RentableAddComponent },
  { path: 'rent-create' , component: RentCreateComponent },
  { path: 'rent-list' , component: RentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
