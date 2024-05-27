import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { OrderCancellationTypeDto } from '../../models/order.dto';

@Component({
  selector: 'app-order-cancellation-list',
  templateUrl: './order-cancellation-list.component.html',
  styleUrls: ['./order-cancellation-list.component.scss']
})
export class OrderCancellationListComponent implements OnInit {

  public get isLoading(): boolean {
    return this._orderService.isLoading;
}

private _orderCancellations: Array<OrderCancellationTypeDto> = [];
public get orderCancellations(): Array<OrderCancellationTypeDto> {
    return this._orderCancellations;
}

private _subsink = new SubSink();

constructor(
    private _router: Router,
    private _toolbarService: ToolbarService,
    private _orderService: OrderService,
    private _confirmationService: ConfirmationService
) {
    this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/ecommerce/orders/cancellation-types/create') }));
}

public async ngOnInit(): Promise<void> {
    // this._subBrands = await this._brandService.getAllSubBrands();
    await this.getOrderCancellations();
    this._toolbarService.isVisibleToCreate(true)

}

public ngOnDestroy(): void {
    this._subsink.unsubscribe();
}

public onEditCancellationTypeClick(orderCancellation: any): void {
    this._router.navigateByUrl(`/apps/ecommerce/orders/cancellation-types/edit/${orderCancellation.id}`);
}

public async onDeleteCancellationTypes(orderCancellation: any): Promise<void> {
    try {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }

        await this._orderService.deleteCancellationType(Number(orderCancellation.id));
        await this.getOrderCancellations();
    } catch (error: any) {
        alert(error.join('\n'));
    }
}

private async getOrderCancellations(): Promise<void> {
  let orderCancellationResponse = await this._orderService.getOrderCancellationTypes();
  this._orderCancellations = orderCancellationResponse.items
}

getBrandNameByFind(id: number) {
    return this._orderCancellations.find(x => x.id === id)?.name;
}
}
