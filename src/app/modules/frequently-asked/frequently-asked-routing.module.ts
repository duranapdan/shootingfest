import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrequentlyAskedListComponent } from './frequently-asked-list/frequently-asked-list.component';
import { FrequentlyAskedFormComponent } from './frequently-asked-form/frequently-asked-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: FrequentlyAskedListComponent },
            { path: 'edit/:id', component: FrequentlyAskedFormComponent },
            { path: 'create', component: FrequentlyAskedFormComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule],
})
export class FrequentlyAskedRoutingModule {}