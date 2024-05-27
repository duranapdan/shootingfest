
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CampaignFormComponent } from './components/campaign-form/campaign-form/campaign-form.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list/campaign-list.component';
import { CampaignService } from './services/campaign.service';
import { CampaignRoutingModule } from './campaign-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        CampaignListComponent,
        CampaignFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        CampaignRoutingModule,
        NgbModule
    ],
    providers: [CampaignService],
})
export class CampaignModule { }