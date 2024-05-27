import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { CoinPeriodExportDto, CoinPeriodModel } from '../../models/coin-period.model';
import { CoinsService } from '../../services/coins.service';

@Component({
    selector: 'app-coin-period-form',
    templateUrl: './coin-period-form.component.html',
    styleUrls: ['./coin-period-form.component.css']
})
export class CoinPeriodFormComponent implements OnInit {

    coinPeriod: CoinPeriodModel = {
        id: 0,
        statement: "",
    };

    public getList: Array<CoinPeriodExportDto> = [];

    public get isLoading(): boolean {
        return this._coinService.isLoading;
    }

    private _subsink = new SubSink();

    constructor(
        private _coinService: CoinsService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) { }


    ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const accountId = Number(p.get('id'));
            console.log(accountId);

            if (accountId) {
                const res = await this._coinService.getCoinPeriodById(accountId);

                var startDate: any;
                var endDate: any;
                if (res.startDate) {
                    var d = new Date(res!.startDate),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    startDate = [year, month, day].join('-');
                }

                if (res.endDate) {
                    var d = new Date(res!.endDate),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    endDate = [year, month, day].join('-');
                }
                this.coinPeriod.id = res.id;
                this.coinPeriod.statement = res.statement;
                this.coinPeriod.startDate = startDate;
                this.coinPeriod.endDate = endDate;
            }
        }));
    }

    public async onSaveClick() {
        console.log(this.coinPeriod);
        try {
            if (this.coinPeriod?.startDate && this.coinPeriod?.endDate) {
                await this._coinService.upsertCoinPeriod(this.coinPeriod);
                this._router.navigateByUrl('/apps/ecommerce/coins/periods');
            }
        } catch (error: any) {
        }
    }

    public async onGetListClick() {
        console.log(this.coinPeriod);
        try {
            if (this.coinPeriod?.startDate && this.coinPeriod?.endDate) {
                this.getList = await this._coinService.getList(this.coinPeriod);
                console.log(this.getList);
            }
        } catch (error: any) {
        }
    }

}
