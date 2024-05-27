import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageFormComponent } from './components/language-form/language-form.component';
import { LanguageListComponent } from './components/language-list/language-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            // { path: 'create', component: LanguageFormComponent },
            // { path: 'edit/:id', component: LanguageFormComponent },
            { path: 'list', component: LanguageListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule],
})
export class LanguageRoutingModule {}