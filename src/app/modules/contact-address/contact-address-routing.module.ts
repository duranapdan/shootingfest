
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactAddressFormComponent } from './components/contact-address-form/contact-address-form.component';
import { ContactAddressListComponent } from './components/contact-address-list/contact-address-list.component';
import { ContactFormListComponent } from './components/contact-form-list/contact-form-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: ContactAddressFormComponent },
            { path: 'edit/:id', component: ContactAddressFormComponent },
            { path: 'list', component: ContactAddressListComponent },
            { path: 'forms', component: ContactFormListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class ContactAddressRoutingModule { }
