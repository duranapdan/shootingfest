import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ManagementProductListParams } from '../../models/management-product-list.model';
import { ProductService } from '../../services/product.service';
import { DynamicFilter, DynamicFilterBase, Filter } from '../../models/dynamic-filter.model';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ChallangeDto } from '../../models/product-for-list.dto';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._productService.isLoading;
    }

    waitForSycn: boolean = true

    private _productsModel: PagedList<ChallangeDto> = { page: 0, count: 0 };
    public get productsModel(): PagedList<ChallangeDto> {
        return this._productsModel;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    private _productFilter: DynamicFilterBase = { filter: { field: "id", logic: "and", operator: "isnotnull", filters: [] }, sort: [] }
    public get productFilter(): any {

        return this._productFilter
    }

    /*     private _categories: PagedList<CategoryDto> = { page: 0, count: 0 };
        public get categories(): PagedList<CategoryDto> {
            return this._categories;
        } */

    public isSortedByName: boolean = false;
    public isSortedByBrand: boolean = false;
    public isSortedByCategory: boolean = false;
    public isSortedByFlag: boolean = false;

    private _subsink = new SubSink();


    companyTypeList: any = [];

    constructor(
        private _router: Router,
        private _productService: ProductService,
        private _confirmationService: ConfirmationService,
        private _toolbarService: ToolbarService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/challenge/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await Promise.all([
            await this.getProducts(),
        ]);
        this._toolbarService.isVisibleToCreate(true) // create disabled edildi.
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onDeleteProduct(product: ChallangeDto): Promise<void> {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }
        await this._productService.delete(product.id);
        await this.getProducts();
    }

    public async getProducts(): Promise<void> {
        if (sessionStorage.getItem("challengePageParams")) {
            const data: any = sessionStorage.getItem('challengePageParams');
            const historyFilter: any = sessionStorage.getItem('challengePageFilter');
            this._params = JSON.parse(data)
            this._productFilter = JSON.parse(historyFilter)
        }
        console.log('  this._params :>> ', this._params);
        this._productsModel = await this._productService.getList(this._params);
        this.waitForSycn = false
        console.log(this._params.Page)
        sessionStorage.removeItem("challengePageParams")
        sessionStorage.removeItem("challengePageFilter")

    }

    /*     public async getCategories(): Promise<void> {
            this._categories = await this._categoryService.getList({});
            console.log(this._categories)
        }
     */
    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        await this.getProducts();
    }

    public async onSortTableByName(): Promise<void> {
        this._params.sort = this.isSortedByName ? 'name desc' : 'name asc';
        await this.getProducts();
        this.isSortedByName = !this.isSortedByName;
    }

    public async onSortTableByBrand(): Promise<void> {
        this._params.sort = this.isSortedByBrand ? 'brandId desc' : 'brandId asc';
        await this.getProducts();
        this.isSortedByBrand = !this.isSortedByBrand;
    }

    public async onSortTableByCategory(): Promise<void> {
        this._params.sort = this.isSortedByCategory ? 'categoryName desc' : 'categoryName asc';
        await this.getProducts();
        this.isSortedByCategory = !this.isSortedByCategory;
    }

    public async onSortTableByFlag(): Promise<void> {
        this._params.sort = this.isSortedByFlag ? 'flagName desc' : 'flagName asc';
        await this.getProducts();
        this.isSortedByFlag = !this.isSortedByFlag;
    }

    public async onSyncPricesClick(): Promise<void> {
        if (this.isLoading) { return; }
        await this._productService.syncPrices();
    }

    public async onSyncTranslationsClick(): Promise<void> {
        if (this.isLoading) { return; }
        await this._productService.syncTranslations();
    }

    public async onSyncNewProductsClick(): Promise<void> {
        if (this.isLoading) { return; }
        // await this._productService.syncNewProducts();
        await this.getProducts();
    }

    public async onSyncStockClick(): Promise<void> {
        if (this.isLoading) { return; }
        await this._productService.syncStocks();
    }

    public async searchTriggered(searchValue: string) {
        if (!searchValue) {
            await this.removeFilter("name")
        }
        else {
            await this.removeFilter("name")
            this._productFilter.filter?.filters?.push({ field: "name", operator: "contains", value: searchValue })
        }
        await this.getProducts();
    }

    public async onStatusChanged(e: any): Promise<void> {
        const status = e.target.value
        await this.removeFilter("isActive")
        this._productFilter.filter?.filters?.push({ field: "isActive", operator: "eq", value: status })
        await this.getProducts();

    }

    public async categoryChanged(e: any): Promise<void> {
        const categoryId = e.target.value
        if (categoryId != null) {
            this._productFilter.filter?.filters?.push({ field: "productCategories", logic: "and", operator: "any", filters: [{ field: "categoryId", logic: "and", operator: "eq", value: categoryId.toString() }] })
        }
        await this.getProducts();
    }



    public async removeFilter(field: string) {
        if (this._productFilter.filter && this._productFilter.filter.filters) {
            this._productFilter.filter.filters = this._productFilter.filter.filters.filter(filter => filter.field !== field);
        }
    }

    setPageHistory() {
        sessionStorage.setItem("challengePageParams", JSON.stringify(this._params))
        sessionStorage.setItem("challengePageFilter", JSON.stringify(this._productFilter))
    }
}
