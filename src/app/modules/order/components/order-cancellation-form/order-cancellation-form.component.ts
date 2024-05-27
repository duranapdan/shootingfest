import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-order-cancellation-form',
    templateUrl: './order-cancellation-form.component.html',
    styleUrls: ['./order-cancellation-form.component.scss'],
    providers: [ApiUrlPipe]
})
export class OrderCancellationFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._orderService.isLoading;
    }


    private _orderCancellationForm = this._formBuilder.group({
        id: [0],
        name: [''],
        key: [''],
    });
    public get orderCancellationForm(): any {
        return this._orderCancellationForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<any> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<any> | undefined {
        return this._formModel;
    }


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _orderService:OrderService
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const cancellationId = Number(p.get('id'));
            this._formModel = await this._orderService.getInstance(cancellationId);

            this._orderCancellationForm.setValue({
                id:cancellationId,
                name: this._formModel.entity?.name,
                key: this._formModel.entity.key,
            });
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
        if (this._orderCancellationForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            const payload = {
                    data: {
                        entity: {
                           
                            ...this._orderCancellationForm.value,
                            name: this._formModel?.translations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                            
                          },
                    translations: this._formModel ? this._formModel.translations : []
                    }
                
            }
            await this._orderService.upsert(payload);
            this._router.navigateByUrl('/apps/ecommerce/orders/cancellation-types/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }

    public onTranslationEntryChange(): void {
    }


  
}
