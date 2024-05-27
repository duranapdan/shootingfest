import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { SubSink } from 'subsink';
import { SupportRequestService } from '../../services/support-request.sevice';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';

@Component({
  selector: 'app-ticket-type-list',
  templateUrl: './ticket-type-list.component.html',
  styleUrls: ['./ticket-type-list.component.scss']
})
export class TicketTypeListComponent implements OnInit {
  public get isLoading(): boolean {
    return this._supportRequestService.isLoading;
}

private _ticketTypes: Array<any> = [];
public get ticketTypes(): Array<any> {
    return this._ticketTypes;
}

private _subsink = new SubSink();

constructor(
    private _router: Router,
    private _toolbarService: ToolbarService,
    private _supportRequestService: SupportRequestService,
    private _confirmationService: ConfirmationService
) {
    this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/tickets/ticket-types/create') }));
}

public async ngOnInit(): Promise<void> {
    // this._subBrands = await this._brandService.getAllSubBrands();
    await this.getTicketTypes();
    this._toolbarService.isVisibleToCreate(true)

}

public ngOnDestroy(): void {
    this._subsink.unsubscribe();
}

public onEditTicketTypeClick(ticketType: any): void {
    this._router.navigateByUrl(`/apps/administration/tickets/ticket-types/edit/${ticketType.id}`);
}

public async onDeleteTicketTypes(orderCancellation: any): Promise<void> {
    try {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }

        await this._supportRequestService.deleteCancellationType(Number(orderCancellation.id));
        await this.getTicketTypes();
    } catch (error: any) {
        alert(error.join('\n'));
    }
}

private async getTicketTypes(): Promise<void> {
  let ticketTypesResponse = await this._supportRequestService.getTicketTypes();
  this._ticketTypes = ticketTypesResponse.items
}

getBrandNameByFind(id: number) {
    return this._ticketTypes.find(x => x.id === id)?.name;
}
}
