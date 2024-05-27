import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaticPageFormComponent } from './components/static-page-form/static-page-form.component';
import { StaticPageListComponent } from './components/static-page-list/static-page-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: StaticPageFormComponent },
            { path: 'edit/:id', component: StaticPageFormComponent },
            { path: 'list', component: StaticPageListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class StaticPageRoutingModule { }