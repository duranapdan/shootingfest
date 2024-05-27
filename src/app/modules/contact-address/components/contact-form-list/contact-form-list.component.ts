import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SubSink } from 'subsink';
import { ContactFormDto } from '../../models/contact-address.dto';
import { ContactAddressService } from '../../services/contact-address.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
    selector: 'app-contact-form-list',
    templateUrl: './contact-form-list.component.html',
    styleUrls: ['./contact-form-list.component.scss']
})
export class ContactFormListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._contactAddressService.isLoading;
    }

    private _contactForms: PagedList<ContactFormDto> = { page: 0, count: 0 };
    public get contactForms(): PagedList<ContactFormDto> {
        return this._contactForms;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _contactAddressService: ContactAddressService,
        private _appService: AppService,
        public _toolbarService: ToolbarService

    ) { }

    public async ngOnInit(): Promise<void> {
        await this.getContactFormes();
        this._toolbarService.isVisibleToCreate(false)

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    private async getContactFormes(): Promise<void> {
        this._contactForms = await this._contactAddressService.getContactForms(this._params);
        console.log(this._contactForms);
    }
    public async onExportClick() {
        console.log("test");
        const res = await this._contactAddressService.export();

        const baseApiUrl = this._appService.apiUrl.replace('/Web', '/');
        window.open(baseApiUrl + res);
    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e - 1;
        await this.getContactFormes();
    }
}
