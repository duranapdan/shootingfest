import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CampaignDto } from '../../../models/campaign.dto';
import { SubSink } from 'subsink';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { CampaignService } from '../../../services/campaign.service';
import { FileService } from 'src/app/shared/services/file.service';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-campaign-form',
    templateUrl: './campaign-form.component.html',
    styleUrls: ['./campaign-form.component.scss'],
    providers: [ApiUrlPipe, DatePipe]
})
export class CampaignFormComponent implements OnInit {

    public get isLoading(): boolean {
        return this._campaignService.isLoading || this._fileService.isLoading;
    }

    private _campaignImage: string | undefined = undefined;
    public get campaignImage(): string | undefined {
        return this._campaignImage;
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
    private _nameTranslations: Array<TranslationEntryDto> = [];
    public get nameTranslations(): Array<TranslationEntryDto> {
        return this._nameTranslations;
    }

    private _campaignForm = this._formBuilder.group({
        id: [0],
        key: [''],
        headerKey: [''],
        contentKey: [''],
        redirectUrlKey: [''],
        name: [''],
        header: [''],
        content: [''],
        redirectUrl: [''],
        imageId: [0],
        order: [0],
        startDate: [''],
        endDate: [''],
        tokens: []
    });
    public get campaignForm(): any {
        return this._campaignForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<CampaignDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<CampaignDto> | undefined {
        return this._formModel;
    }


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _campaignService: CampaignService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe,
        private datePipe: DatePipe
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const campaignId = Number(p.get('id'));
            this._formModel = await this._campaignService.getInstance(campaignId);

            this._campaignForm.patchValue({
                id: this._formModel.entity?.id,
                key: this._formModel.entity?.key,
                headerKey: this._formModel.entity?.headerKey || "xx",
                contentKey: this._formModel.entity?.contentKey || "xx",
                name: this._formModel.entity?.name,
                header: this._formModel.entity?.header,
                content: this._formModel.entity?.content,
                redirectUrl: this._formModel.entity?.redirectUrl,
                redirectUrlKey: this._formModel.entity?.redirectUrlKey,
                imageId: this._formModel.entity?.imageId,
                order: this._formModel.entity?.order,
                startDate: this._formModel.entity?.startDate,
                endDate: this._formModel.entity?.endDate,
                tokens: []
            });
            this._campaignForm.patchValue({ startDate: this.datePipe.transform(this._formModel.entity?.startDate, 'yyyy-MM-dd', 'en-US') })
            this._campaignForm.patchValue({ endDate: this.datePipe.transform(this._formModel.entity?.endDate, 'yyyy-MM-dd', 'en-US') })


            this._nameTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Name') : [];
            this._headerTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Header'): [];
            this._contentTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Content'): [];
            this._redirectUrlTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'RedirectUrl'): [];

            console.log(this._campaignForm.value)
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

    public async onSaveClick(): Promise<void> {
        if (this._campaignForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            const payload = {
                data: {
                    entity: {

                        ...this._campaignForm.value,
                        name: this._nameTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Name")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Name")?.entryValue,
                        content: this._contentTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Content")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Content")?.entryValue,
                        header: this._headerTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Header")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Header")?.entryValue,
                        redirectUrl: this._redirectUrlTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "RedirectUrl")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "RedirectUrl")?.entryValue,
                       
                    },
                    translations: this._nameTranslations.concat(this._contentTranslations).concat(this._headerTranslations).concat(this._redirectUrlTranslations)
                }

            }
            await this._campaignService.upsert(payload);
            this._router.navigateByUrl('/apps/ecommerce/campaigns/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }

    public onTranslationEntryChange(): void {
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
            const fileData = await this._fileService.postFile(this._thumbImg);
            (<any>this._campaignForm.get('tokens')).value.push(fileData.token);
            this._campaignForm.patchValue({ imageId: fileData.id })
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._campaignForm.get('tokens')?.value)
    }
}
