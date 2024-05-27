import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationTypes, ConfirmStatus } from 'src/app/complex-types';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ConfirmationDto } from '../../models/confirmation.dto';
import { ApprovalRequestParams, ApprovalRequestService } from '../../services/approval-request.service';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-approval-request-list',
    templateUrl: './approval-request-list.component.html',
    styleUrls: ['./approval-request-list.component.css']
})
export class ApprovalRequestListComponent implements OnInit {
    public get isLoading(): boolean {
        return this._approvalRequestService.isLoading;
    }

    private _requests: Array<ConfirmationDto> = [];
    public get requests(): Array<ConfirmationDto> {
        return this._requests;
    }

    private _requestsModel: Array<ConfirmationDto> = [];
    public get requestsModel(): Array<ConfirmationDto> {
        return this._requestsModel;
    }


    public get status(): ConfirmStatus {
        return ApprovalRequestParams.Status;
    }

    public get type(): ConfirmationTypes {
        return ApprovalRequestParams.Type;
    }

    private _subsink = new SubSink();

    constructor(
        private _route: ActivatedRoute,
        private _approvalRequestService: ApprovalRequestService,
        private _confirmationService: ConfirmationService,
        private _appService: AppService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this._subsink.add(this._route.queryParams.subscribe(async p => {
            ApprovalRequestParams.Status = p['status'] ? <ConfirmStatus>p['status'] : ConfirmStatus.Waiting;
            ApprovalRequestParams.Type = p['type'] ? <ConfirmationTypes>p['type'] : ConfirmationTypes.UserEdit;
            await this.getAll();
        }));
    }

    public async onApproveClick(c: ConfirmationDto): Promise<void> {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }

        await this._approvalRequestService.approve(c.id);
        await this.getAll();
    }

    private async getAll(): Promise<void> {
        this._requests = await this._approvalRequestService.getAll();
        this._requestsModel = Object.assign(this._requests);
    }

    public async onExportClick() {
        console.log("test");
        const res = await this._approvalRequestService.export();

        const baseApiUrl = this._appService.apiUrl.replace('/Web', '/');
        window.open(baseApiUrl + res);
    }

    public async searchTriggered(e: string) {
        this._requestsModel = this.requests.filter(x => x.changeUserAndCompanyName.toLocaleLowerCase().includes(e.toLocaleLowerCase()));
    }
}
