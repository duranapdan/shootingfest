import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ProductTypeService } from '../../services/product-type.service';
import { ProductTypeDto } from 'src/app/modules/users/models/product-type.dto';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';

@Component({
    selector: 'app-product-type-list',
    templateUrl: './product-type-list.component.html',
    styleUrls: ['./product-type-list.component.scss']
})
export class ProductTypeListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._productTypeService.isLoading;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }
    waitForSycn: boolean = true

    private _productTypes: PagedList<ProductTypeDto> = { page: 0, count: 0 };
    public get productTypes(): PagedList<ProductTypeDto> {
        return this._productTypes;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _productTypeService: ProductTypeService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/product-types/create') }));
    }

    public async ngOnInit(): Promise<void> {
        // this._subProductTypes = await this._productTypeService.getAllSubProductTypes();
        await this.getProductTypes();
        this._toolbarService.isVisibleToCreate(true)
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditProductTypeClick(productType: ProductTypeDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/product-types/edit/${productType.id}`);
    }

    public async onDeleteProductType(productType: ProductTypeDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._productTypeService.delete(Number(productType.id));
            await this.getProductTypes();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getProductTypes(): Promise<void> {
        this._productTypes = await this._productTypeService.getListByPage(this._params);
        this.waitForSycn = false
        console.log(this._productTypes);
    }

    getProductTypeNameByFind(id: number) {
        return this._productTypes.items?.find(x => x.id === id)?.name;
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        console.log("page", this.params.Page)
        await this.getProductTypes();
    }
}
