import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SupportRequestStatus,
  SupportRequestType,
} from 'src/app/complex-types';
import { SubSink } from 'subsink';
import { SupportRequestDto } from '../../models/support-request.dto';
import { SupportRequestService } from '../../services/support-request.sevice';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  public get isLoading(): boolean {
    return this._supportRequestService.isLoading;
  }

  private _params: ManagementProductListParams = new ManagementProductListParams();
  public get params(): ManagementProductListParams {
    return this._params;
  }

  waitForSycn: boolean = true

  private _status: SupportRequestStatus = SupportRequestStatus.Open;
  public get status(): SupportRequestStatus {
    return this._status;
  }

  private _model: PagedList<SupportRequestDto> = { count: 12, page: 0 };
  public get model(): PagedList<SupportRequestDto> {
    return this._model;
  }
  private _subsink = new SubSink();

  //
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _supportRequestService: SupportRequestService,
    private _toolbarService: ToolbarService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._subsink.add(
      this._route.queryParams.subscribe(async (p) => {
        this._status = p['status']
          ? <SupportRequestStatus>p['status']
          : SupportRequestStatus.Open;
        await this.getList()
      })
    );
    this._toolbarService.isVisibleToCreate(false)
  }

  async getList() {
    this._model = await this._supportRequestService.getListByPage(this._status, this._params);
    this.waitForSycn = false
    console.log(this._model);
  }

  public ngOnDestroy(): void {
    this._subsink.unsubscribe();
  }

  public onViewEditClick(supportRequest: SupportRequestDto): void {
    this._router.navigateByUrl(
      `/apps/administration/tickets/edit/${supportRequest.id}`
    );
  }

  public async onPageChange(e: number): Promise<void> {
    this._params.Page = e - 1;
    console.log("page", this.params.Page)
    await this.getList();
  }
}
