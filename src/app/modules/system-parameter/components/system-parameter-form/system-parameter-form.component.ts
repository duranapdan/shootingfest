import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordStatus } from 'src/app/complex-types';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { SystemParameterDto } from '../../models/system-parameter.dto';
import { SystemParameterService } from '../../services/system-parameter.sevice';

@Component({
    selector: 'app-system-parameter-form',
    templateUrl: './system-parameter-form.component.html',
    styleUrls: ['./system-parameter-form.component.scss'],
    providers: [ApiUrlPipe]
})
export class SystemParameterFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._systemParameterService.isLoading || this._fileService.isLoading;
    }

    private _systemParameterForm = this._formBuilder.group({
        id: [0, [Validators.required]],
        parameterKey: ['', [Validators.required]],
        parameterValue: ['', [Validators.required]],
        description: [''],
        status: [RecordStatus.Passive, [Validators.required]]
    });
    public get systemParameterForm(): UntypedFormGroup {
        return this._systemParameterForm;
    }

    private _subsink = new SubSink();

    private _formModel: SystemParameterDto | undefined = undefined;
    public get formModel(): SystemParameterDto | undefined {
        return this._formModel;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _systemParameterService: SystemParameterService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const systemParameterId = Number(p.get('id'));
            this._formModel = await this._systemParameterService.get(systemParameterId);

            console.log(this._formModel);

            if (this._formModel) {
                this._systemParameterForm.setValue({
                    id: this._formModel.id,
                    parameterKey: this._formModel.parameterKey || '',
                    parameterValue: this._formModel.parameterValue || '',
                    description: this._formModel.description || '',
                    status: this._formModel.status || RecordStatus.Passive
                });
            } else {
                this._systemParameterForm.setValue({
                    id: 0,
                    parameterKey: '',
                    parameterValue: '',
                    description: '',
                    status: RecordStatus.Active
                });
            }
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
        console.log(this._systemParameterForm)
        if (this._systemParameterForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            await this._systemParameterService.upsert(this._systemParameterForm.value);
            this._router.navigateByUrl('/apps/administration/system-parameters/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }
}
