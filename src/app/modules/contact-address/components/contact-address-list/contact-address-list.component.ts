import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ContactAddressDto } from '../../models/contact-address.dto';
import { ContactAddressService } from '../../services/contact-address.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Component({
    selector: 'app-contact-address-list',
    templateUrl: './contact-address-list.component.html',
    styleUrls: ['./contact-address-list.component.scss']
})
export class ContactAddressListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._contactAddressService.isLoading;
    }

    private _contactAddresses: PagedList<ContactAddressDto> | undefined;
    public get contactAddresses(): PagedList<ContactAddressDto> | undefined {
        return this._contactAddresses;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _contactAddressService: ContactAddressService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/contact-addresses/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getContactAddresses();
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditContactAddressClick(contactAddress: ContactAddressDto): void {
        this._router.navigateByUrl(`/apps/administration/contact-addresses/edit/${contactAddress.id}`);
    }

    public async onDeleteContactAddress(contactAddress: ContactAddressDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._contactAddressService.delete(Number(contactAddress.id));
            await this.getContactAddresses();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getContactAddresses(): Promise<void> {
        this._contactAddresses = await this._contactAddressService.getList();

        console.log(this._contactAddresses);
    }
}
