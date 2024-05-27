
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandFormComponent } from './components/brand-form/brand-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrandService } from './services/brand.sevice';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        BrandListComponent,
        BrandFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        BrandRoutingModule,
        NgbModule
    ],
    providers: [BrandService],
})
export class BrandModule { }