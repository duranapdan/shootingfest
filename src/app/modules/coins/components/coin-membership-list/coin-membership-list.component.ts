import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { CoinsService } from '../../services/coins.service';

@Component({
    selector: 'app-coin-membership-list',
    templateUrl: './coin-membership-list.component.html',
    styleUrls: ['./coin-membership-list.component.css']
})
export class CoinMemberShipListComponent implements OnInit {

    public get isLoading(): boolean {
        return this._coinService.isLoading;
    }

    public coinMembershipList: any;
    public hasError: any;
    public hasSuccess: any;

    private _subsink = new SubSink();

    constructor(
        private _coinService: CoinsService,
        private _router: Router,
        private _appService: AppService,
        private _toolbarService: ToolbarService,
        private _confirmationService: ConfirmationService) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/coins/memberships/create') }));

    }

    ngOnInit(): void {
        this.getCoinMembershipList();
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async getCoinMembershipList() {
        this.coinMembershipList = await this._coinService.getCoinMembershipList();
        console.log(this.coinMembershipList);
    }


    public async onEditMembershipClick(membership: any) {
        this._router.navigateByUrl(`/apps/ecommerce/coins/memberships/edit/${membership.id}`);

    }

    public async onDeleteMembershipClick(membership: any) {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }
        await this._coinService.deleteCoinMembership(membership.id);
        this.getCoinMembershipList();
    }
}
