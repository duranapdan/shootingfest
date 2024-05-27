import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { SystemParameterDto } from '../../models/system-parameter.dto';
import { SystemParameterService } from '../../services/system-parameter.sevice';

@Component({
    selector: 'app-system-parameter-list',
    templateUrl: './system-parameter-list.component.html',
    styleUrls: ['./system-parameter-list.component.scss']
})
export class SystemParameterListComponent implements OnInit, OnDestroy {
    public get isLoading(): boolean {
        return this._systemParameterService.isLoading;
    }

    private _systemParameters: Array<SystemParameterDto> = [];
    public get systemParameters(): Array<SystemParameterDto> {
        return this._systemParameters;
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _systemParameterService: SystemParameterService,
        private _confirmationService: ConfirmationService
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/system-parameters/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getSystemParameters();
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public onEditSystemParameterClick(systemParameter: SystemParameterDto): void {
        this._router.navigateByUrl(`/apps/administration/system-parameters/edit/${systemParameter.id}`);
    }

    public async onDeleteSystemParameter(systemParameter: SystemParameterDto): Promise<void> {
        try {
            const result = await this._confirmationService.confirm();
            if (!result) { return; }

            await this._systemParameterService.delete(Number(systemParameter.id));
            await this.getSystemParameters();
        } catch (error: any) {
            alert(error.join('\n'));
        }
    }

    private async getSystemParameters(): Promise<void> {
        this._systemParameters = await this._systemParameterService.getList();

        console.log(this._systemParameters);
    }
}
