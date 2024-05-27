import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceType } from 'src/app/complex-types';
import { CompanyTypeDto } from 'src/app/modules/customer/models/company-type.dto';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { AdditionalServiceUpsertDto } from '../../models/additional-service.dto';
import { AdditionalServicesService } from '../../services/additional-services.sevice';

@Component({
    selector: 'app-additional-service-form',
    templateUrl: './additional-service-form.component.html',
    styleUrls: ['./additional-service-form.component.scss'],
    providers: [CustomerService]
})
export class AdditionalServiceFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._additionalServicesService.isLoading || this._fileService.isLoading;
    }

    private _additionalServiceForm = this._formBuilder.group({
        key: ['', [Validators.required]],
        code: ['', [Validators.required]],
        companyTypePrices: [[], [Validators.required]],
        type: [ServiceType.AdditionalService, [Validators.required]],
        isActive: [false, [Validators.required]]
    });
    public get additionalServiceForm(): UntypedFormGroup {
        return this._additionalServiceForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<AdditionalServiceUpsertDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<AdditionalServiceUpsertDto> | undefined {
        return this._formModel;
    }

    private _customerTypes: Array<CompanyTypeDto> = [];
    public get customerTypes(): Array<CompanyTypeDto> {
        return this._customerTypes;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _additionalServicesService: AdditionalServicesService,
        private _fileService: FileService,
        private _customerService: CustomerService,
        private _confirmation: ConfirmationService
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const code = p.get('code');
            if (!code) {
                this._router.navigateByUrl('/additional-services');
                return;
            }

            const result = await Promise.all([
                this._customerService.getCompanyTypes(),
                this._additionalServicesService.getInstance(code)
            ]);
            console.log(result);

            this._customerTypes = result[0];
            this._formModel = result[1];

            this._additionalServiceForm.setValue({
                key: this._formModel.entity.key,
                code: this._formModel.entity.code,
                companyTypePrices: this._formModel.entity.companyTypePrices || [],
                type: <ServiceType>Number(this._formModel.entity.type),
                isActive: this._formModel.entity.isActive
            });
            console.log(this._formModel);
        }));
    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    public async onSaveClick(): Promise<void> {
        this._additionalServiceForm.get('companyTypePrices')?.setValue(this._formModel?.entity.companyTypePrices);

        if (this._additionalServiceForm.invalid || this.isLoading) { return; }
        console.log(this._additionalServiceForm);

        try {
            this._formErrors = [];
            await this._additionalServicesService.upsert({
                entity: {
                    id: this._additionalServiceForm.value.id,
                    code: this._additionalServiceForm.value.code,
                    companyTypePrices: this._additionalServiceForm.value.companyTypePrices,
                    isActive: typeof (this._additionalServiceForm.value.isActive) === 'string' ? this._additionalServiceForm.value.isActive == 'true' : this._additionalServiceForm.value.isActive,
                    key: this._additionalServiceForm.value.key,
                    type: Number(this._additionalServiceForm.value.type)
                },
                translations: this._formModel ? this._formModel.translations : []
            });
            this._router.navigateByUrl('/apps/ecommerce/additional-services/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }

    public addNewPrice(): void {
        if (this._formModel && !this._formModel.entity.companyTypePrices) {
            this._formModel.entity.companyTypePrices = [];
        }

        this._formModel?.entity.companyTypePrices.push({})
    }

    public async removePrice(priceId: number | undefined) {
        if (!(await this._confirmation.confirm())) {
            return;
        }

        if (!this._formModel) { return; }

        if (priceId) {
            await this._additionalServicesService.delete(priceId);
        }

        this._formModel.entity.companyTypePrices = this._formModel.entity.companyTypePrices.filter(p => p.id !== priceId);
    }
}
