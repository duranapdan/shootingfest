import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ContainerVolumeDto } from '../../models/container-volume-dto';
import { OrderDetailDto } from '../../models/order.detail.dto';
import { ContainerTypeDto, OrderCancellationTypeDto, OrderDto } from '../../models/order.dto';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    //
    _orderId:number | undefined;

    private _orderDetail: OrderDetailDto | undefined = undefined;
    public get orderDetail(): OrderDetailDto | undefined {
        return this._orderDetail;
    }

    public get isPayerUser(): boolean {
        return Boolean(this._orderDetail?.orderSummary?.user?.payerUser);
    }

    //
    public isTicketFormActive: boolean = false;
    //
    public ticketLimited: boolean = false;

    public get containerVolume(): ContainerVolumeDto | undefined {
        return this.orderDetail?.orderSummary?.containerVolume;
    }

    public get containerType(): ContainerTypeDto | undefined {
        return this.orderDetail?.orderSummary?.containerType;
    }
    public get palettePercentage(): number {
        if (!this.containerVolume) { return 0; }
        return (this.containerVolume?.cartItemsPalletCount / this.containerVolume?.containerPalletCapacity) * 100;
    }

    public get weightPercentage(): number {
        if (!this.containerVolume) { return 0; }
        return (this.containerVolume?.cartItemsWeight / this.containerVolume?.containerWeightCapacity) * 100;
    }

    public get volumePercentage(): number {
        if (!this.containerVolume) { return 0; }
        return (this.containerVolume?.cartItemsVolume / this.containerVolume?.containerVolumeCapacity) * 100;
    }

    public get productTotalPrice(): number {
        if (this._orderDetail && this._orderDetail.orderSummary && this._orderDetail.orderSummary.containerVolume && this._orderDetail.orderSummary.containerVolume.cartItemsPalletCount) {
            return this._orderDetail.orderSummary.price -
                this._orderDetail.orderSummary.containerVolume.cartItemsPalletPrice;
        }
        return 0;
    }

    private _orderCancellationTypeList: any;
    public get orderCancellationTypeList():any {
        return this._orderCancellationTypeList;
    }

    refundMessageForm = this._formBuilder.group({
        refundMessageText: ['', [Validators.required]], 
    });

    cancelMessageForm = this._formBuilder.group({
        cancellationMessageText: ['', [Validators.required]], 
        cancellationMessageType: ['', [Validators.required]], 
    });

    private _subsink = new SubSink();

    refundMessageFormStatus = false;
    cancellationFormStatus = false;
    refundMessageText: string  = '';
    cancellationMessageText: string  = '';


    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrderService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
    ) { }

    async ngOnInit(): Promise<void> {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const orderId = Number(p.get('id'));
            this._orderId = orderId;
            this._orderDetail = await this._orderService.getOrderDetailByOrderId(orderId);
        }));

        await Promise.all([
            await this.getOrderCancellationTypeList(),
        ]);
    }

    cancelOrder() {
        console.log(this.cancelMessageForm.value);
  
        let data = {
            orderId: this._orderId,
            orderCancellationTypeId: this.cancelMessageForm.value.cancellationMessageType,
            orderCancellationMessage: this.cancelMessageForm.value.cancellationMessageText
        } 
        this._orderService.cancelOrder(data).then(() => {
            this.goBack()
        });
    }

    refundOrder() {
        let data = {
            orderId: this._orderId,
            refundMessage: this.refundMessageForm.value.refundMessageText
        } 
        this._orderService.refundOrder(data).then(() => {
            this.goBack()
        });
        console.log(this.refundMessageForm.value);
    }

    goBack(){
        this._router.navigateByUrl(`/apps/ecommerce/orders/list`);
    }

    public async getOrderCancellationTypeList(): Promise<void> {
        this._orderCancellationTypeList = await this._orderService.getOrderCancellationTypes();
     }
}
