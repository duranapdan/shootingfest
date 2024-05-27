import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageDto, TranslationService } from 'src/app/modules/translation/services/translation.service';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { BannerDto, BannerUpsertDto } from '../../models/banner.dto';
import { BannerService } from '../../services/banner.sevice';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Component({
    selector: 'app-banner-form',
    templateUrl: './banner-form.component.html',
    styleUrls: ['./banner-form.component.scss'],
    providers: [ApiUrlPipe, TranslationService]
})
export class BannerFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._bannerService.isLoading || this._fileService.isLoading;
    }

    private _brandImage: string | undefined = undefined;
    public get brandImage(): string | undefined {
        return this._brandImage;
    }

    private _bannerForm = this._formBuilder.group({
        id: [0],
        redirectUrl: ['', [Validators.required]],
        expireDate: [''],
        languageId: [0, [Validators.required]],
        tokens: [[]]
    });
    public get bannerForm(): UntypedFormGroup {
        return this._bannerForm;
    }

    private _subsink = new SubSink();

    private _formModel: BannerDto | undefined = undefined;
    public get formModel(): BannerDto | undefined {
        return this._formModel;
    }


    private _languages: PagedList<LanguageDto> = {page:0, count:12};
    public get languages(): PagedList<LanguageDto> {
        return this._languages;
    }


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _bannerService: BannerService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe,
        private _translationService: TranslationService
    ) { }

    public async ngOnInit(): Promise<void> {
        this._languages = await this._translationService.getLanguages();
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const bannerId = Number(p.get('id'));
            if (bannerId) {
                this._formModel = await this._bannerService.get(bannerId);
                var expiredDate: any;
                if (this._formModel.expireDate) {
                    var d = new Date(this.formModel!.expireDate),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    expiredDate = [year, month, day].join('-');
                }
                this._bannerForm.setValue({
                    id: this._formModel.id || 0,
                    redirectUrl: this._formModel.redirectUrl || '',
                    expireDate: expiredDate || null,
                    languageId: this._formModel.languageId || 0,
                    tokens: []
                });

                if (this._formModel && this._formModel && this._formModel.image && this._formModel.image.imagePath) {
                    this._image = this._apiUrlPipe.transform(this._formModel.image.imagePath)
                }
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
        console.log(this.formModel);
        
        if (this._bannerForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            const payload :BannerUpsertDto = {
                data:  {
                ...this._bannerForm.value,
                languageId: Number(this._bannerForm.value.languageId)
                }
            }
            // this._bannerForm.patchValue({languageId: Number(this._bannerForm.value.languageId)})
            await this._bannerService.upsert(payload);
            console.log(this._bannerForm.value);
            this._router.navigateByUrl('/apps/ecommerce/banners/list');
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

    private _image: string = '/assets/media/svg/files/blank-image.svg';
    public get image(): string {
        return this._image;
    }

    @ViewChild('imageInput', { static: false }) public imageInput: ElementRef | undefined;

    public async onImgChange(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._thumbImg = e.target.files[0];

        if (this._thumbImg) {
            this._image = await this._fileService.getLocalSource(this._thumbImg);

            (<any>this._bannerForm.get('tokens')).value.push((await this._fileService.postFile(this._thumbImg)).token);
        }

        if (this.imageInput) {
            this.imageInput.nativeElement.value = '';
        }

        console.log(this._bannerForm.get('tokens')?.value)
    }
}
