import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCompanyTypeComponent } from './components/product-company-type/product-company-type.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: ProductFormComponent },
            { path: 'companytypes/:id', component: ProductCompanyTypeComponent },
            { path: 'edit/:id', component: ProductFormComponent },
            { path: 'list', component: ProductListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule],
})
export class ProductRoutingModule { }