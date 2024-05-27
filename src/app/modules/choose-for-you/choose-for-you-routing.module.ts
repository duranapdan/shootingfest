import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChooseForYouFormComponent } from './components/choose-for-you-form/choose-for-you-form.component';
import { ChooseForYouListComponent } from './components/choose-for-you-list/choose-for-you-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: ChooseForYouFormComponent },
            { path: 'edit/:id', component: ChooseForYouFormComponent },
            { path: 'list', component: ChooseForYouListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class ChooseForYouRoutingModule { }