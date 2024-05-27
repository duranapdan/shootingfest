
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactAddressRoutingModule } from './contact-address-routing.module';
import { ContactAddressListComponent } from './components/contact-address-list/contact-address-list.component';
import { ContactAddressFormComponent } from './components/contact-address-form/contact-address-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactAddressService } from './services/contact-address.service';
import { ContactFormListComponent } from './components/contact-form-list/contact-form-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ContactAddressListComponent,
        ContactAddressFormComponent,
        ContactFormListComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        ContactAddressRoutingModule,
        NgbModule
    ],
    providers: [ContactAddressService],
})
export class ContactAddressModule { }