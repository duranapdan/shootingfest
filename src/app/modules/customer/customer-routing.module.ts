import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: CustomerFormComponent },
            { path: 'details/:id', component: CustomerDetailsComponent },
            { path: 'sub-users/:id', component: CustomerFormComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule],
})
export class CustomerRoutingModule { }