import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationFormComponent } from './components/translation-form/translation-form.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: TranslationFormComponent },
            { path: 'edit/:key', component: TranslationFormComponent },
            { path: 'list', component: TranslationListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class TranslationRoutingModule { }