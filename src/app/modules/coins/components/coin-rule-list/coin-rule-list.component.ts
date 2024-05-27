import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../../services/coins.service';

@Component({
    selector: 'app-coin-rule-list',
    templateUrl: './coin-rule-list.component.html',
    styleUrls: ['./coin-rule-list.component.css']
})
export class CoinRuleListComponent implements OnInit {
    public get isLoading(): boolean {
        return this._coinService.isLoading;
    }

    public coinRuleList: any;

    constructor(
        private _coinService: CoinsService
    ) { }

    ngOnInit(): void {
        this.getCoinRuleList();
    }

    public async getCoinRuleList() {
        this.coinRuleList = await this._coinService.getCoinRuleList();
        console.log(this.coinRuleList);
    }
}
