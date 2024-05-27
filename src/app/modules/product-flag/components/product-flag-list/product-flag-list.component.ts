import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ProductFlagDto } from '../../models/product-flag.dto';
import { ProductFlagService } from '../../services/product-flag.service';

@Component({
    selector: 'app-product-flag-list',
    templateUrl: './product-flag-list.component.html',
    styleUrls: ['./product-flag-list.component.scss']
})
export class ProductFlagListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._productFlagService.isLoading;
    }

    private _productFlags: Array<ProductFlagDto> = [];
    public get productFlags(): Array<ProductFlagDto> {
        return this._productFlags;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _productFlagService: ProductFlagService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/product-flags/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getProductFlags();
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditProductFlagClick(productFlag: ProductFlagDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/product-flags/edit/${productFlag.id}`);
    }

    public async onDeleteProductFlagClick(productFlag: ProductFlagDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._productFlagService.delete(Number(productFlag.id));
            await this.getProductFlags();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getProductFlags(): Promise<void> {
        this._productFlags = await this._productFlagService.getList();
    }
}
