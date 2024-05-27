import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFlagRoutingModule } from './product-flag-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductFlagListComponent } from './components/product-flag-list/product-flag-list.component';
import { ProductFlagFormComponent } from './components/product-flag-form/product-flag-form.component';
import { ProductFlagService } from './services/product-flag.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ProductFlagFormComponent,
        ProductFlagListComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        ReactiveFormsModule,
        ProductFlagRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [
        ProductFlagService
    ],
})
export class ProductFlagModule { }