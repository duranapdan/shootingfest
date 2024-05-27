
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: CategoryFormComponent },
            { path: 'edit/:id', component: CategoryFormComponent },
            { path: 'list', component: CategoryListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
