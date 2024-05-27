import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductFlagFormComponent } from './components/product-flag-form/product-flag-form.component';
import { ProductFlagListComponent } from './components/product-flag-list/product-flag-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: ProductFlagFormComponent },
            { path: 'edit/:id', component: ProductFlagFormComponent },
            { path: 'list', component: ProductFlagListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule],
})
export class ProductFlagRoutingModule {}