import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { ProductFlagDto } from '../../models/product-flag.dto';
import { ProductFlagService } from '../../services/product-flag.service';

@Component({
    selector: 'app-product-flag-form',
    templateUrl: './product-flag-form.component.html',
    styleUrls: ['./product-flag-form.component.scss'],
    providers: [
        ApiUrlPipe
    ]
})
export class ProductFlagFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._productFlagService.isLoading;
    }

    public tokenList: Array<any> = [];

    private _productFlagImage: string | undefined = undefined;
    public get productFlagImage(): string | undefined {
        return this._productFlagImage;
    }

    private _imgFile: File | undefined = undefined;
    public get imgFile(): File | undefined {
        return this._imgFile;
    }

    private _productFlagForm = this._formBuilder.group({
        id: [0, [Validators.required]],
        key: ['', [Validators.required]],
        name: [''],
    });
    public get productFlagForm(): UntypedFormGroup {
        return this._productFlagForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<ProductFlagDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<ProductFlagDto> | undefined {
        return this._formModel;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _productFlagService: ProductFlagService,
        private _apiUrlPipe: ApiUrlPipe,
        private _fileService: FileService
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const productFlagId = Number(p.get('id'));
            this._formModel = await this._productFlagService.getInstance(productFlagId);
            console.log(this._formModel);

            this._productFlagForm.setValue({
                id: this._formModel.entity.id,
                name: this._formModel.entity.name,
                key: this._formModel.entity.key,
            });

            if (this.formModel && this.formModel.entity && this.formModel.entity.images) {

                const trIdx = this.formModel.entity.images.findIndex(x => x.languageId == 3);
                if (trIdx > -1) {
                    this._thumbImageTr = this._apiUrlPipe.transform(this.formModel.entity.images[trIdx].image.imagePath);
                }

                const enIdx = this.formModel.entity.images.findIndex(x => x.languageId == 1);
                if (enIdx > -1) {
                    this._thumbImageEn = this._apiUrlPipe.transform(this.formModel.entity.images[enIdx].image.imagePath);
                }

                const deIdx = this.formModel.entity.images.findIndex(x => x.languageId == 2);
                if (deIdx > -1) {
                    this._thumbImageDe = this._apiUrlPipe.transform(this.formModel.entity.images[deIdx].image.imagePath);

                }
            }
            console.log(this._thumbImageDe);
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
        if (this._productFlagForm.invalid) { return; }
        this._productFlagForm.value.images = this.tokenList;
        const x = {
            entity: this._productFlagForm.value,
            translations: this._formModel ? this._formModel.translations : []
        }

        console.log(x);

        console.log(this._productFlagForm.value);
        console.log(this._formModel!.translations)

        try {
            this._formErrors = [];
            await this._productFlagService.upsert({
                entity: this._productFlagForm.value,
                translations: this._formModel ? this._formModel.translations : []
            });
            this._router.navigateByUrl('/apps/ecommerce/product-flags/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }

    private _thumbImg: File | undefined = undefined;
    public get thumbImg(): File | undefined {
        return this._thumbImg;
    }

    private _thumbImageTr: string = '/assets/media/svg/files/blank-image.svg';
    public get thumbImageTr(): string {
        return this._thumbImageTr;
    }

    private _thumbImgEn: File | undefined = undefined;
    public get thumbImgEn(): File | undefined {
        return this._thumbImgEn;
    }

    private _thumbImageEn: string = '/assets/media/svg/files/blank-image.svg';
    public get thumbImageEn(): string {
        return this._thumbImageEn;
    }

    private _thumbImgDe: File | undefined = undefined;
    public get thumbImgDe(): File | undefined {
        return this._thumbImgDe;
    }

    private _thumbImageDe: string = '/assets/media/svg/files/blank-image.svg';
    public get thumbImageDe(): string {
        return this._thumbImageDe;
    }

    @ViewChild('thumbInput', { static: false }) public thumbInput: ElementRef | undefined;
    @ViewChild('thumbInputEn', { static: false }) public thumbInputEn: ElementRef | undefined;
    @ViewChild('thumbInputDe', { static: false }) public thumbInputDe: ElementRef | undefined;

    public async onThumbChange(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._thumbImg = e.target.files[0];

        if (this._thumbImg) {
            this._thumbImageTr = await this._fileService.getLocalSource(this._thumbImg);

            const token = await this._fileService.postFile(this._thumbImg);
            const item = {
                tokens: [token],
                languageId: 3
            }
            this.tokenList.push(item);
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }
    }

    public async onThumbChangeEn(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._thumbImgEn = e.target.files[0];

        if (this._thumbImgEn) {
            this._thumbImageEn = await this._fileService.getLocalSource(this._thumbImgEn);

            const token = await this._fileService.postFile(this._thumbImgEn);
            const item = {
                tokens: [token],
                languageId: 1
            }
            this.tokenList.push(item);
        }

        if (this.thumbInputEn) {
            this.thumbInputEn.nativeElement.value = '';
        }
    }

    public async onThumbChangeDe(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._thumbImgDe = e.target.files[0];

        if (this._thumbImgDe) {
            this._thumbImageDe = await this._fileService.getLocalSource(this._thumbImgDe);

            const token = await this._fileService.postFile(this._thumbImgDe);
            const item = {
                tokens: [token],
                languageId: 2
            }
            this.tokenList.push(item);
        }

        if (this.thumbInputDe) {
            this.thumbInputDe.nativeElement.value = '';
        }
    }
}
