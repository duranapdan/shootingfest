import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SupportRequestStatus,
  SupportRequestType,
} from 'src/app/complex-types';
import { SubSink } from 'subsink';
import {
  SupportRequestDto,
  AnswerSupportRequestDto,
} from '../../models/support-request.dto';
import { SupportRequestService } from '../../services/support-request.sevice';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
})
export class TicketEditComponent implements OnInit {
  public get isLoading(): boolean {
    return this._supportRequestService.isLoading;
  }

  private _model: SupportRequestDto | undefined = undefined;
  public get model(): SupportRequestDto | undefined {
    return this._model;
  }
  private _subsink = new SubSink();

  private _supportRequestForm = this._formBuilder.group({
    id: [0, [Validators.required]],
    answerContent: ['', [Validators.required]],
  });
  public get supportRequestForm(): UntypedFormGroup {
    return this._supportRequestForm;
  }

  private _formModel: AnswerSupportRequestDto | undefined = undefined;
  public get formModel(): AnswerSupportRequestDto | undefined {
    return this._formModel;
  }
  private _formErrors: Array<string> = [];
  public get formErrors(): Array<string> {
    return this._formErrors;
  }

  //
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: UntypedFormBuilder,
    private _supportRequestService: SupportRequestService,
    private _toolbarService:ToolbarService
  ) {}

  public async ngOnInit(): Promise<void> {
    this._subsink.add(
      this._route.paramMap.subscribe(async (p) => {
        console.log(p);
        const id = Number(p.get('code'));
        this._model = await this._supportRequestService.getInstance(
          id
        );
        console.log(this._model);

        this._supportRequestForm.setValue({
          id: this._model?.id,
          answerContent: this._model?.answerContent,
        });

      })
    );
    this._toolbarService.isVisibleToCreate(false)

  }

  public ngOnDestroy(): void {
    this._subsink.unsubscribe();
  }

  public async onSaveClick(): Promise<void> {
    console.log(this._supportRequestForm.value);
    if (this._supportRequestForm.invalid || this.isLoading) {
      return;
    }
    try {
      this._formErrors = [];
      await this._supportRequestService.upsert(this._supportRequestForm.value);
      this._router.navigateByUrl('/apps/administration/tickets/list');
    } catch (error: any) {
      this._formErrors = error;
    }
  }
}
