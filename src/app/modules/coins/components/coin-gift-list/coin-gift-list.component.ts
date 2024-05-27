import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../../services/coins.service';

@Component({
    selector: 'app-coin-gift-list',
    templateUrl: './coin-gift-list.component.html',
    styleUrls: ['./coin-gift-list.component.css']
})
export class CoinGiftListComponent implements OnInit {

    coinGiftList: any;

    public get isLoading(): boolean {
        return this._coinService.isLoading;
    }

    constructor(
        private _coinService: CoinsService,
    ) { }

    ngOnInit(): void {
        this.getCoinGiftList();
    }


    public async getCoinGiftList() {
        this.coinGiftList = await this._coinService.getCoinGiftList();
        console.log(this.coinGiftList);
    }

}
