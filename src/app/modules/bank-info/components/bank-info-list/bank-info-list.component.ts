import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { BankService } from '../../services/bank.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Component({
    selector: 'app-bank-info-list',
    templateUrl: './bank-info-list.component.html',
    styleUrls: ['./bank-info-list.component.css']
})
export class BankInfoListComponent implements OnInit {

    accountList: PagedList<any> = {page:0, count:12};;
    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _bankService: BankService,
        private _confirmationService: ConfirmationService

    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/bank-info/create') }));
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    async ngOnInit() {
        await this.getBankAccountInformation();
        this._toolbarService.isVisibleToCreate(true)
    }

    public async getBankAccountInformation() {
        this.accountList = (await this._bankService.getBankAccountInformation());
    }

    public onEditAccountClick(account: any): void {
        this._router.navigateByUrl(`/apps/administration/bank-info/edit/${account.id}`);
    }

    public onAddAccountClick(): void {
        this._router.navigateByUrl(`/apps/administration/bank-info/create`);
    }

    public async onDeleteAccountClick(account: any) {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }

        await this._bankService.delete(account.id)
        this.ngOnInit();
    }
}
