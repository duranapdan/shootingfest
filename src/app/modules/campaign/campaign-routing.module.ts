
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampaignFormComponent } from './components/campaign-form/campaign-form/campaign-form.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list/campaign-list.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: CampaignFormComponent },
            { path: 'edit/:id', component: CampaignFormComponent },
            { path: 'list', component: CampaignListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class CampaignRoutingModule { }
