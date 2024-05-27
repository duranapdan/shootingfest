import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { CategoryDto } from '../../models/category.dto';
import { CategoryService } from '../../services/category.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {


    public get isLoading(): boolean {
        return this._categoryService.isLoading;
    }


    private _categories: PagedList<CategoryDto> = { count: 0 };
    public get categories(): PagedList<CategoryDto> {
        return this._categories;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    waitForSycn: boolean = true
    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _categoryService: CategoryService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/categories/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getCategoryListByPage();
        this._toolbarService.isVisibleToCreate(true)

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditCategoryClick(category: CategoryDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/categories/edit/${category.id}`);
    }

    public async onDeleteCategory(category: CategoryDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._categoryService.delete(Number(category.id));
            await this.getCategoryListByPage();
        } catch (error: any) {
            await this.getCategoryListByPage();
        }
    }

    // private async getCategories(): Promise<void> {
    //     const filter = {
    //         filter: {
    //             "field": "parentId",
    //             "operator": "isnull",
    //           }
    //     }
    //     this._categories =await this._categoryService.getList(filter);
    //     this.waitForSycn = false
    // }

    async getCategoryListByPage() {
        const filter = {
            filter: {
                "field": "parentId",
                "operator": "isnull",
            }
        }
        this._categories = await this._categoryService.getListByPage(this.params, filter);
        this.waitForSycn = false
    }

    // public async searchTriggered(e: string) {
    //     this._params.search = e;
    //     this.getCategoryListByPage();
    // }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        console.log("page", this.params.Page)
        await this.getCategoryListByPage();
    }
}
