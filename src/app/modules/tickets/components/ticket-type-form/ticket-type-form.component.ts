import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { SubSink } from 'subsink';
import { SupportRequestService } from '../../services/support-request.sevice';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
  selector: 'app-ticket-type-form',
  templateUrl: './ticket-type-form.component.html',
  styleUrls: ['./ticket-type-form.component.scss']
})
export class TicketTypeFormComponent implements OnInit {
  public get isLoading(): boolean {
    return this._supportRequestService.isLoading;
}


private _ticketTypeForm = this._formBuilder.group({
    id: [0],
    supportRequestName: [''],
    key: [''],
});
public get ticketTypeForm(): any {
    return this._ticketTypeForm;
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
    private _supportRequestService:SupportRequestService,
    private _toolbarService:ToolbarService
) { }

public ngOnInit(): void {
    this._subsink.add(this._route.paramMap.subscribe(async p => {
        const ticketTypeId = Number(p.get('id'));
        this._formModel = await this._supportRequestService.getInstanceTicketType(ticketTypeId);

        this._ticketTypeForm.setValue({
            id:ticketTypeId,
            supportRequestName: this._formModel.entity?.supportRequestName,
            key: this._formModel.entity.key,
        });
    }));
    this._toolbarService.isVisibleToCreate(false)

}

public ngOnDestroy(): void {
    this._subsink.unsubscribe();
}

private _formErrors: Array<string> = [];
public get formErrors(): Array<string> {
    return this._formErrors;
}

public async onSaveClick(): Promise<void> {
    if (this._ticketTypeForm.invalid || this.isLoading) { return; }
    try {
        this._formErrors = [];
        const payload = {
                data: {
                    entity: {
                       
                        ...this._ticketTypeForm.value,
                        supportRequestName: this._formModel?.translations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                        
                      },
                translations: this._formModel ? this._formModel.translations : []
                }
            
        }
        await this._supportRequestService.upsertTicketType(payload);
        this._router.navigateByUrl('/apps/administration/tickets/ticket-types/list');
    } catch (error: any) {
        this._formErrors = error;
    }
}

public onTranslationEntryChange(): void {
}


}
