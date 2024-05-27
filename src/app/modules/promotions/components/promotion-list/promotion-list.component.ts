import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { PromotionService } from '../../services/promotion.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { PromotionGetDto } from 'src/app/modules/order/models/order.dto';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';

@Component({
    selector: 'app-promotion-list',
    templateUrl: './promotion-list.component.html',
    styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {

    public get isLoading(): boolean {
        return this._promotionService.isLoading;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    waitForSycn: boolean = true
    private _subsink = new SubSink();


    private _promotionList: PagedList<PromotionGetDto> = { count: 0, page: 0 };
    public get promotionList(): PagedList<PromotionGetDto> {
        return this._promotionList;
    };
    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _confirmationService: ConfirmationService,
        private _promotionService: PromotionService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/promotions/create') }));
    }

    ngOnInit(): void {
        this.getPromotionList();
        this._toolbarService.isVisibleToCreate(true)
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onEditPromotionClick(promotion: any) {
        this._router.navigateByUrl(`/apps/ecommerce/promotions/edit/${promotion.id}`);
    }

    public async onDeletePromotionClick(promotion: any) {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }
        await this._promotionService.delete(promotion.id);
        this.getPromotionList();
    }

    private async getPromotionList(): Promise<void> {
        this._promotionList = await this._promotionService.getListByPage(this._params);
        this.waitForSycn = false
        console.log(this.promotionList);
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        console.log("page", this.params.Page)
        await this.getPromotionList();
    }

}
