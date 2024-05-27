import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { SubSink } from 'subsink';
import { ChooseForYouDto, ChooseForYouService, ChooseForYouUpsertDto } from '../../services/choose-for-you.service';
import { FileService } from 'src/app/shared/services/file.service';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';

@Component({
    selector: 'app-choose-for-you-form',
    templateUrl: './choose-for-you-form.component.html',
    styleUrls: ['./choose-for-you-form.component.scss'],
    providers: [ApiUrlPipe, ChooseForYouService]
})
export class ChooseForYouFormComponent implements OnInit {
    public get isLoading(): boolean {
        return this._chooseForYouService.isLoading;
    }

    private _chooseForYouForm = this._formBuilder.group({
        id: [0],
        redirectUrl: [''],
        key: ['', [Validators.required]],
        contentKey: ['', [Validators.required]],
        headerKey: ['', [Validators.required]],
        redirectUrlKey: ['', [Validators.required]],
        name:[''],
        content:[''],
        header:[''],
        order:[0],
        tokens: [[]]
        
    });
    public get chooseForYouForm(): UntypedFormGroup {
        return this._chooseForYouForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<ChooseForYouUpsertDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<ChooseForYouUpsertDto> | undefined {
        return this._formModel;
    }

    private _keyTranslations: Array<TranslationEntryDto> = [];
    public get keyTranslations(): Array<TranslationEntryDto> {
        return this._keyTranslations;
    }

    private _headerTranslations: Array<TranslationEntryDto> = [];
    public get headerTranslations(): Array<TranslationEntryDto> {
        return this._headerTranslations;
    }
    private _contentTranslations: Array<TranslationEntryDto> = [];
    public get contentTranslations(): Array<TranslationEntryDto> {
        return this._contentTranslations;
    }
    private _redirectUrlTranslations: Array<TranslationEntryDto> = [];
    public get redirectUrlTranslations(): Array<TranslationEntryDto> {
        return this._redirectUrlTranslations;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _apiUrlPipe: ApiUrlPipe,
        private _fileService: FileService,
        private _chooseForYouService: ChooseForYouService,
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const id = Number(p.get('id'));
            this._formModel = await this._chooseForYouService.getInstance(id);

            this._chooseForYouForm.setValue({
                id: id,
                key: this._formModel.entity?.key,
                headerKey: this._formModel.entity?.headerKey,
                contentKey: this._formModel.entity?.contentKey,
                redirectUrlKey: this._formModel.entity?.redirectUrlKey,
                name: this._formModel.entity?.name,
                header:this._formModel.entity?.header,
                content:this._formModel.entity?.content,
                redirectUrl:this._formModel.entity?.redirectUrl,
                order:this._formModel.entity?.order,
                tokens: []                
            });

            this._keyTranslations = this._formModel.translations.filter(t => t.property === 'Name');
            this._headerTranslations = this._formModel.translations.filter(t => t.property === 'Header');
            this._contentTranslations = this._formModel.translations.filter(t => t.property === 'Content');
            this._redirectUrlTranslations = this._formModel.translations.filter(t => t.property === 'RedirectUrl');

            if (this.formModel && this.formModel.entity && this.formModel.entity.image && this.formModel.entity.image.imagePath) {
                this._thumbImage = this._apiUrlPipe.transform(this.formModel.entity.image.imagePath)
            }

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

            (<any>this._chooseForYouForm.get('tokens')).value.push((await this._fileService.postFile(this._thumbImg)).token);
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._chooseForYouForm.get('tokens')?.value)
    }
    
    public async onSaveClick(): Promise<void> {
        console.log(this._chooseForYouForm.value);
        if (this._chooseForYouForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            await this._chooseForYouService.upsert({
                data: {
                entity: {
                    ...this._chooseForYouForm.value,
                    name: this._keyTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Name")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Name")?.entryValue,
                    content: this._contentTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Content")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Content")?.entryValue,
                    header: this._headerTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Header")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Header")?.entryValue,
                    redirectUrl: this._redirectUrlTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "RedirectUrl")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "RedirectUrl")?.entryValue,
                   
                },
                translations: this._keyTranslations.concat(this._contentTranslations).concat(this._headerTranslations).concat(this._redirectUrlTranslations)
                
                }
            });
            this._router.navigateByUrl('/apps/ecommerce/choose-for-yous/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }
}
