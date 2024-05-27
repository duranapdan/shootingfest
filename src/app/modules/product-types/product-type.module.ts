
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductTypeService } from './services/product-type.service';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeFormComponent } from './components/product-type-form/product-type-form.component';
import { ProductTypeRoutingModule } from './product-type-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ProductTypeListComponent,
        ProductTypeFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        ProductTypeRoutingModule,
        NgbModule
    ],
    providers: [ProductTypeService],
})
export class ProductTypeModule { }