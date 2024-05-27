import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { BrandDto } from '../../models/brand.dto';
import { BrandService } from '../../services/brand.sevice';

@Component({
    selector: 'app-brand-form',
    templateUrl: './brand-form.component.html',
    styleUrls: ['./brand-form.component.scss'],
    providers: [ApiUrlPipe]
})
export class BrandFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._brandService.isLoading || this._fileService.isLoading;
    }

    private _brandImage: string | undefined = undefined;
    public get brandImage(): string | undefined {
        return this._brandImage;
    }

    private _brandForm = this._formBuilder.group({
        id: [0],
        name: [''],
        key: [''],
        tokens: [[]]
    });
    public get brandForm(): any {
        return this._brandForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<BrandDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<BrandDto> | undefined {
        return this._formModel;
    }

    private _subBrands: Array<BrandDto> = [];
    public get subBrands(): Array<BrandDto> {
        return this._subBrands;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _brandService: BrandService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const brandId = Number(p.get('id'));
            this._formModel = await this._brandService.getInstance(brandId);

            this._brandForm.setValue({
                id:brandId,
                name: this._formModel.entity?.name,
                key: this._formModel.entity.key,
                tokens: []
            });
            console.log(this._brandForm.value)
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
        if (this._brandForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            const payload = {
                    data: {
                        entity: {
                           
                            ...this._brandForm.value,
                            name: this._formModel?.translations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                            
                          },
                    translations: this._formModel ? this._formModel.translations : []
                    }
                
            }
            await this._brandService.upsert(payload);
            this._router.navigateByUrl('/apps/ecommerce/brands/list');
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

            (<any>this._brandForm.get('tokens')).value.push((await this._fileService.postFile(this._thumbImg)).token);
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._brandForm.get('tokens')?.value)
    }
}
