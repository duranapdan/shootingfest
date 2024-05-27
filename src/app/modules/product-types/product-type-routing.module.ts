
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeFormComponent } from './components/product-type-form/product-type-form.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: ProductTypeFormComponent },
            { path: 'edit/:id', component: ProductTypeFormComponent },
            { path: 'list', component: ProductTypeListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class ProductTypeRoutingModule { }
