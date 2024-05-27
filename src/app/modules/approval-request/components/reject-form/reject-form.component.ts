import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { ConfirmationDto } from '../../models/confirmation.dto';
import { ApprovalRequestService } from '../../services/approval-request.service';

@Component({
  selector: 'app-reject-form',
  templateUrl: './reject-form.component.html',
  styleUrls: ['./reject-form.component.scss'],
})
export class ApprovalRejectFormComponent implements OnInit, OnDestroy {
  private _subsink = new SubSink();

  private _isLoading: boolean = false;
  public get isLoading(): boolean {
    return this._isLoading || this._approvalRequestService.isLoading;
  }

  private _form: FormGroup = this._formBuilder.group({
    id: [0, [Validators.required]],
    message: [''],
    isSilent: [false],
    requiredModifyFields: [[]],
  });
  public get form(): FormGroup {
    return this._form;
  }

  private _callback: string | null = null;
  public get callback(): string | null {
    return this._callback;
  }
  
  private _confirmation: ConfirmationDto | undefined;
  public get confirmation(): ConfirmationDto | undefined {
    return this._confirmation;
  }

  private _fields: Array<{ field: string; checked: boolean }> = [
    { field: 'FirstName', checked: false },
    { field: 'LastName', checked: false },
    { field: 'UserPhone', checked: false },
    { field: 'UserEmail', checked: false },
    { field: 'CompanyType', checked: false },
    { field: 'Export', checked: false },
    { field: 'Name', checked: false },
    { field: 'TaxOffice', checked: false },
    { field: 'TaxNo', checked: false },
    { field: 'CompanyPhone', checked: false },
    { field: 'CompanyEmail', checked: false },
    { field: 'PostalCode', checked: false },
    { field: 'Country', checked: false },
    { field: 'City', checked: false },
    { field: 'Address', checked: false },
    { field: 'Documents', checked: false },
  ];
  public get fields(): Array<{ field: string; checked: boolean }> {
    return this._fields;
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _approvalRequestService: ApprovalRequestService
  ) {}

  public ngOnInit(): void {
    this._subsink.add(
      this._route.queryParamMap.subscribe(async (p) => {
        const id = Number(p.get('id'));
        this._callback = p.get('callback');

        if (!id) {
          this._router.navigateByUrl('/apps/administration/approval-requests');
        }

        this._form.get('id')?.setValue(id);
        this._confirmation = await this._approvalRequestService.getById(id);
      })
    );
  }

  public ngOnDestroy(): void {
    this._subsink.unsubscribe();
  }

  public async onSaveClick(): Promise<void> {
    const result = await this._confirmationService.confirm();
    if (!result) {
      return;
    }

    this._form
      .get('requiredModifyFields')
      ?.setValue(this._fields.filter((f) => f.checked).map((f) => f.field));
    await this._approvalRequestService.reject(this._form.value);
    this._router.navigateByUrl(
      this._callback || '/apps/administration/approval-requests'
    );
  }
}
