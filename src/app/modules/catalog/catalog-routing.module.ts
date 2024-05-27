
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatalogFormComponent } from './components/catalog-form/catalog-form.component';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: CatalogFormComponent },
            { path: 'edit/:id', component: CatalogFormComponent },
            { path: 'list', component: CatalogListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class CatalogRoutingModule { }
