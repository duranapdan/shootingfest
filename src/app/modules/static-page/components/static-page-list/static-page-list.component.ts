import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { StaticPageDto, StaticPageService } from '../../services/static-page.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';

@Component({
    selector: 'app-static-page-list',
    templateUrl: './static-page-list.component.html',
    styleUrls: ['./static-page-list.component.scss']
})
export class StaticPageListComponent implements OnInit {
    public get isLoading(): boolean {
        return this._staticPageService.isLoading;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    waitForSycn: boolean = true

    private _staticPages: PagedList<StaticPageDto> = { page: 0, count: 12 };
    public get staticPages(): PagedList<StaticPageDto> {
        return this._staticPages;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _staticPageService: StaticPageService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/static-pages/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getStaticPages();
        this._toolbarService.isVisibleToCreate(true)
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onDeleteStaticPage(sp: StaticPageDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._staticPageService.delete(Number(sp.id));
            await this.getStaticPages();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getStaticPages(): Promise<void> {
        this._staticPages = await this._staticPageService.getList(this._params);
        this.waitForSycn = false
        console.log(this._staticPages);
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        console.log("page", this.params.Page)
        await this.getStaticPages();
    }
}
