import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from './services/customer.service';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AddresFilterPipe } from './pipes/address-filter.pipe';

@NgModule({
    declarations: [
      
        CustomerFormComponent,
        CustomerDetailsComponent,
        AddresFilterPipe
    ],
    imports: [
        FormsModule,

        CommonModule,
        PipesModule,
        SharedModule,
        CustomerRoutingModule,
        NgbModule
    ],
    exports: [],
    providers: [CustomerService],
})
export class CustomerModule { }