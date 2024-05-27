import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordStatus } from 'src/app/complex-types';
import { SubSink } from 'subsink';
import { BankService } from '../../services/bank.service';
import { BankUpsertDto } from '../bank-info-list/models/bank.dto';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
    selector: 'app-bank-info-form',
    templateUrl: './bank-info-form.component.html',
    styleUrls: ['./bank-info-form.component.css'],
    providers: [ApiUrlPipe]
})
export class BankInfoFormComponent implements OnInit {
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _bankService: BankService,
        private _formBuilder: UntypedFormBuilder,
        private _apiUrlPipe: ApiUrlPipe,
        private _fileService: FileService,
        
    ) { }

    private _subsink = new SubSink();

    private _bankAccountForm = this._formBuilder.group({
        id: [0],
        accountName: ['', [Validators.required]],
        accountNo: ['', [Validators.required]],
        iban: ['', [Validators.required]],
        bankName: ['', [Validators.required]],
        branchCode: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        swiftCode: ['', [Validators.required]],
        tokens: [[]]
        // status: [RecordStatus.Passive, [Validators.required]]
    });
    public get bankAccountForm(): UntypedFormGroup {
        return this._bankAccountForm;
    }

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    private _formModel: any = undefined;
    public get formModel(): any {
        return this._formModel;
    }

    private _image: string = '/assets/media/svg/files/blank-image.svg';
    public get image(): string {
        return this._image;
    }

    ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const accountId = Number(p.get('id'));
            console.log(accountId);

            if (accountId) {
                this._formModel = await this._bankService.getBankAccountInformationById(accountId);
                console.log(this._formModel);

                this._bankAccountForm.setValue({
                    id: accountId,
                    accountName: this._formModel.accountName,
                    accountNo: this._formModel.accountNo,
                    iban: this._formModel.iban,
                    bankName: this._formModel.bankName,
                    branchCode: this._formModel.branchCode,
                    firstName: this._formModel.firstName,
                    lastName: this._formModel.lastName,
                    swiftCode: this._formModel.swiftCode,
                    tokens: []
                });

                if (this._formModel && this._formModel && this._formModel.image && this._formModel.image.imagePath) {
                    this._thumbImage = this._apiUrlPipe.transform(this._formModel.image.imagePath)
                }
            }
        }));
    }

    public async onSaveClick(): Promise<void> {
        console.log(this._bankAccountForm);
        console.log(this._bankAccountForm.invalid);

        if (this._bankAccountForm.invalid) { return; }
        const payload :BankUpsertDto = {
            data:  {
            ...this._bankAccountForm.value,
            }
        }
        await this._bankService.upsert(payload);
        this._router.navigateByUrl('/apps/administration/bank-info/list');
    }

    private _thumbImg: File | undefined = undefined;
    public get thumbImg(): File | undefined {
        return this._thumbImg;
    }
    private _thumbImage: string = '/assets/media/svg/files/blank-image.svg';
    public get thumbImage(): string {
        return this._thumbImage;
    }


@ViewChild('thumbInput', { static: false }) public thumbInput: ElementRef | undefined;

    public async onThumbChange(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._thumbImg = e.target.files[0];

        if (this._thumbImg) {
            this._thumbImage = await this._fileService.getLocalSource(this._thumbImg);

            (<any>this._bankAccountForm.get('tokens')).value.push((await this._fileService.postFile(this._thumbImg)).token);
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._bankAccountForm.get('tokens')?.value)
    }

}
