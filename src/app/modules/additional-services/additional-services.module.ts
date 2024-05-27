
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdditionalServiceListComponent } from './components/additional-service-list/additional-service-list.component';
import { AdditionalServiceFormComponent } from './components/additional-service-form/additional-service-form.component';
import { AdditionalServicesRoutingModule } from './additional-services-routing.module';
import { AdditionalServicesService } from './services/additional-services.sevice';
import { AdditionalServiceTypePipe } from './pipes/additional-service-type.pipe';

@NgModule({
    declarations: [
        AdditionalServiceListComponent,
        AdditionalServiceFormComponent,
        AdditionalServiceTypePipe
    ],
    imports: [
        FormsModule,
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        AdditionalServicesRoutingModule
    ],
    providers: [AdditionalServicesService],
})
export class AdditionalServicesModule { }