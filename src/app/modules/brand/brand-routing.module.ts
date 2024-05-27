
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandFormComponent } from './components/brand-form/brand-form.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: BrandFormComponent },
            { path: 'edit/:id', component: BrandFormComponent },
            { path: 'list', component: BrandListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class BrandRoutingModule { }
