import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { CatalogDto } from '../../models/catalog.dto';
import { CatalogService } from '../../services/catalog.sevice';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Component({
    selector: 'app-catalog-list',
    templateUrl: './catalog-list.component.html',
    styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._catalogService.isLoading;
    }

    private _catalogs: PagedList<CatalogDto> = {page:0, count:12};
    public get catalogs(): PagedList<CatalogDto> {
        return this._catalogs;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _catalogService: CatalogService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/catalogs/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getCatalogs();
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditCatalogClick(catalog: CatalogDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/catalogs/edit/${catalog.id}`);
    }

    public async onDeleteCatalog(catalog: CatalogDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._catalogService.delete(Number(catalog.id));
            await this.getCatalogs();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getCatalogs(): Promise<void> {
        this._catalogs = await this._catalogService.getList();

        console.log(this._catalogs);
    }
}
