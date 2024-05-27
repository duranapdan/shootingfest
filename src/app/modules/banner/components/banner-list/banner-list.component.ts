import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { BannerDto } from '../../models/banner.dto';
import { BannerService } from '../../services/banner.sevice';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';

@Component({
    selector: 'app-banner-list',
    templateUrl: './banner-list.component.html',
    styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._bannerService.isLoading;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    waitForSycn: boolean = true

    private _banners: PagedList<BannerDto> = { page: 0, count: 12 };
    public get banners(): PagedList<BannerDto> {
        return this._banners;
    }



    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _bannerService: BannerService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/banners/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getBanners();
        this._toolbarService.isVisibleToCreate(true)
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditBannerClick(banner: BannerDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/banners/edit/${banner.id}`);
    }

    public async onDeleteBanner(banner: BannerDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._bannerService.delete(Number(banner.id));
            await this.getBanners();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getBanners(): Promise<void> {
        this._banners = await this._bannerService.getList();
        this.waitForSycn = false

        console.log(this._banners);
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        await this.getBanners();
    }
}
