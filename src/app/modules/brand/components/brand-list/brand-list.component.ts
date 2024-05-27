import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { BrandDto } from '../../models/brand.dto';
import { BrandService } from '../../services/brand.sevice';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._brandService.isLoading;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    waitForSycn: boolean = true

    private _subBrands: Array<BrandDto> = [];
    public get subBrands(): Array<BrandDto> {
        return this._subBrands;
    }

    private _brands: PagedList<BrandDto> = { page: 0, count: 0 };
    public get brands(): PagedList<BrandDto> {
        return this._brands;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _brandService: BrandService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/brands/create') }));
    }

    public async ngOnInit(): Promise<void> {
        // this._subBrands = await this._brandService.getAllSubBrands();
        await this.getBrands();
        this._toolbarService.isVisibleToCreate(true)
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditBrandClick(brand: BrandDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/brands/edit/${brand.id}`);
    }

    public async onDeleteBrand(brand: BrandDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._brandService.delete(Number(brand.id));
            await this.getBrands();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getBrands(): Promise<void> {

        this._brands = await this._brandService.getListByPage(this._params);
        this.waitForSycn = false
        console.log(this._brands);
    }

    getBrandNameByFind(id: number) {
        return this._subBrands.find(x => x.id === id)?.name;
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        await this.getBrands();
    }
}
