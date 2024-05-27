import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { FileService } from 'src/app/shared/services/file.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';
import { CoinsService } from '../../services/coins.service';

@Component({
    selector: 'app-coin-period-list',
    templateUrl: './coin-period-list.component.html',
    styleUrls: ['./coin-period-list.component.css']
})
export class CoinPeriodListComponent implements OnInit {

    public coinPeriodList: any;
    public hasError: any;
    public hasSuccess: any;

    public get isLoading(): boolean {
        return this._coinService.isLoading;
    }

    private _file: File | undefined = undefined;
    public get file(): File | undefined {
        return this._file;
    }

    private _subsink = new SubSink();

    constructor(
        private _toastService: ToastService,
        private _coinService: CoinsService,
        private _router: Router,
        private _appService: AppService,
        private _toolbarService: ToolbarService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/coins/periods/create') }));

    }

    ngOnInit(): void {
        this.getCoinPeriodList();
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async getCoinPeriodList() {
        this.coinPeriodList = await this._coinService.getCoinPeriodList();
        console.log(this.coinPeriodList);
    }

    public async onDeletePeriodClick(period: any) {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }

        await this._coinService.deleteCoinPeriod(period.id)
        this.ngOnInit();
    }

    public async onEditPeriodClick(period: any) {
        this._router.navigateByUrl(`/apps/ecommerce/coins/periods/edit/${period.id}`);
    }

    public async onExportPeriodClick(period: any) {
        const res = await this._coinService.exportCoinPeriod(period.id);
        const baseApiUrl = this._appService.apiUrl.replace('/Web', '/');
        window.open(baseApiUrl + res);
    }

    public async onImportPeriodClick(e: any): Promise<void> {

        if (!e.target.files[0]) { return; }
        this._file = e.target.files[0];
        if (this._file) {

            const res = await this._coinService.importCoinPeriod(this._file);
            if (res == "") {
                this.hasError = true;
            }
            else {
                this.hasSuccess = true;
            }
        }
    }

}
