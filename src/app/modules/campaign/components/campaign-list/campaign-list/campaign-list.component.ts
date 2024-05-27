import { Component, OnInit } from '@angular/core';
import { CampaignDto } from '../../../models/campaign.dto';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { SubSink } from 'subsink';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { CampaignService } from '../../../services/campaign.service';
import { Router } from '@angular/router';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';

@Component({
    selector: 'app-campaign-list',
    templateUrl: './campaign-list.component.html',
    styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {

    public get isLoading(): boolean {
        return this._campaignService.isLoading;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    waitForSycn: boolean = true


    private _campaigns: PagedList<CampaignDto> = { page: 0, count: 12 };
    public get campaigns(): PagedList<CampaignDto> {
        return this._campaigns;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _campaignService: CampaignService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/campaigns/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getCampaigns();
        this._toolbarService.isVisibleToCreate(true)
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditCampaignClick(campaign: CampaignDto): void {
        console.log(campaign)
        this._router.navigateByUrl(`/apps/ecommerce/campaigns/edit/${campaign.id}`);
    }

    public async onDeleteCampaign(campaign: CampaignDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._campaignService.delete(Number(campaign.id));
            await this.getCampaigns();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getCampaigns(): Promise<void> {
        this._campaigns = await this._campaignService.getList();
        this.waitForSycn = false
        console.log(this._campaigns);
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        console.log("page", this.params.Page)
        await this.getCampaigns();
    }
}

