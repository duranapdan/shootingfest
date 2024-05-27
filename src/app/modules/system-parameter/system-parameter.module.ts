
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemParameterRoutingModule } from './system-parameter-routing.module';
import { SystemParameterListComponent } from './components/system-parameter-list/system-parameter-list.component';
import { SystemParameterFormComponent } from './components/system-parameter-form/system-parameter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemParameterService } from './services/system-parameter.sevice';

@NgModule({
    declarations: [
        SystemParameterListComponent,
        SystemParameterFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        SystemParameterRoutingModule
    ],
    providers: [SystemParameterService],
})
export class SystemParameterModule { }