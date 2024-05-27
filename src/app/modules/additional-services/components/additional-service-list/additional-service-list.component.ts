import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/modules/users/services/product.service';
import { GetGroupListDto } from '../../models/additional-service.dto';
import { AdditionalServicesService } from '../../services/additional-services.sevice';

@Component({
    selector: 'app-additional-service-list',
    templateUrl: './additional-service-list.component.html',
    styleUrls: ['./additional-service-list.component.scss']
})
export class AdditionalServiceListComponent implements OnInit {
    public get isLoading(): boolean {
        return this._additionalServicesService.isLoading;
    }

    private _additionalServices: Array<GetGroupListDto> = [];
    public get additionalServices(): Array<GetGroupListDto> {
        return this._additionalServices;
    }

    constructor(
        private _router: Router,
        private _additionalServicesService: AdditionalServicesService
    ) {
    }

    public async ngOnInit(): Promise<void> {
        await this.getAditionalServices();
    }

    public onEditAdditionalServiceClick(additionalService: GetGroupListDto): void {
        this._router.navigateByUrl(`/apps/ecommerce/additional-services/edit/${additionalService.serviceDetails[0].code}`);
    }

    private async getAditionalServices(): Promise<void> {
        this._additionalServices = await this._additionalServicesService.getList();
        console.log(this._additionalServices);
    }

    public async onSyncTranslationsClick(): Promise<void> {
        if (this.isLoading) { return; }
        await this._additionalServicesService.syncTranslations();
    }
}
