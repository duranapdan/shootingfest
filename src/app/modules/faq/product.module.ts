import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductService } from './services/product.service';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCompanyTypeComponent } from './components/product-company-type/product-company-type.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CategoryComponent } from '../category/components/category/category.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductFormComponent,
        ProductCompanyTypeComponent
    ],
    imports: [
        //Angular Modules
        FormsModule,

        CommonModule,
        InlineSVGModule,
        PipesModule,
        SharedModule,
        ProductRoutingModule,
        NgbModule,
        PipesModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        MatTreeModule,
        MatExpansionModule,
    ],
    exports: [],
    providers: [ProductService],
})
export class ProductModule { }