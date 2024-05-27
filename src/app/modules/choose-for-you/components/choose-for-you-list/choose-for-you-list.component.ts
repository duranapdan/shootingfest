import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ChooseForYouDto, ChooseForYouService } from '../../services/choose-for-you.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Component({
    selector: 'app-choose-for-you-list',
    templateUrl: './choose-for-you-list.component.html',
    styleUrls: ['./choose-for-you-list.component.scss']
})
export class ChooseForYouListComponent implements OnInit {
    public get isLoading(): boolean {
        return this._chooseForYouService.isLoading;
    }

    private _chooseForYous: PagedList<ChooseForYouDto> = {page:0 ,count:12};
    public get chooseForYous(): PagedList<ChooseForYouDto> {
        return this._chooseForYous;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _chooseForYouService: ChooseForYouService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/choose-for-yous/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getChooseForYous();
        this._toolbarService.isVisibleToCreate(true)

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onDeleteChooseForYou(sp: ChooseForYouDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._chooseForYouService.delete(Number(sp.id));
            await this.getChooseForYous();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getChooseForYous(): Promise<void> {
        this._chooseForYous = await this._chooseForYouService.getList();
        console.log(this._chooseForYous);
    }
}
