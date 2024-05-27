import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from 'src/app/complex-types';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { SubSink } from 'subsink';
import { OrderListRequestParams } from '../../models/order-list-request-params.dto';
import { OrderDto } from '../../models/order.dto';
import { OrderService } from '../../services/order.service';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


    

    public get isLoading(): boolean {
        return this._orderService.isLoading;
    }

    private _params: OrderListRequestParams = new OrderListRequestParams();
    public get params(): OrderListRequestParams {
        return this._params;
    }

    private _orders: PagedList<OrderDto> = { page: 1, count: 12, items: [] };
    public get orders(): PagedList<OrderDto> {
        return this._orders;
    }

    orderStatus: any = [
    {id:1, name: 'Onay Bekliyor'},
    {id:2, name: 'Ödeme Bekliyor'},
    {id:3, name: 'Onaylandı'},
    {id:4, name: 'Teslim edildi'},
    {id:5, name: 'İptal edildi'},
    // {id:6, name: 'İade edildi'},
    {id:7, name: 'Ödendi'}]
 

    private _subsink = new SubSink();

    //
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _orderService: OrderService,
        public _toolbarService:ToolbarService
    ) {
        this._params.sort = 'id desc';
    }

    public async ngOnInit(): Promise<void> {
        this._params.search = "";
        this._subsink.add(this._route.queryParams.subscribe(async p => {
            this._params.orderStatus = p['activeStatus'] ? <OrderStatus>p['activeStatus'] : OrderStatus.AwaitingApproval;
            await this.getOrders();
            this._toolbarService.isVisibleToCreate(false)
        }));
           
        if(location.pathname === "/apps/ecommerce/orders/list"){
            this._router.navigateByUrl('/apps/ecommerce/orders/list?activeStatus=1')
        }
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onApproveClick(order: OrderDto): Promise<void> {

    }
    public async onRejectClick(order: OrderDto): Promise<void> {

    }

    public async onPageChange(e: number): Promise<void> {
        this._params.Page = e;
        await this.getOrders();
    }

    private async getOrders(): Promise<void> {
        this._orders = await this._orderService.getList(this._params);
        console.log(this._orders)
    }

    public onViewDetailsClick(order: OrderDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/orders/details/${order.id}`);
    }
    
    public async searchTriggered(e: string) {
        this._params.search = e;
        await this.getOrders();
  
    }
 

    setStatus(e:any,id:number){
        const statusId = e.target.value
        console.log(statusId)
        const payload:any = {
            id:id ,
            orderStatus: Number(statusId)
        }
        this._orderService.changeStatus(payload)
    }
}
