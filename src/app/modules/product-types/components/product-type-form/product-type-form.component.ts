import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';

import { ProductTypeService } from '../../services/product-type.service';
import { ProductTypeDto } from 'src/app/modules/users/models/product-type.dto';

@Component({
    selector: 'app-product-type-form',
    templateUrl: './product-type-form.component.html',
    styleUrls: ['./product-type-form.component.scss'],
    providers: [ApiUrlPipe]
})
export class ProductTypeFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._productTypeService.isLoading || this._fileService.isLoading;
    }

    private _productTypeImage: string | undefined = undefined;
    public get productTypeImage(): string | undefined {
        return this._productTypeImage;
    }

    private _productTypeForm = this._formBuilder.group({
        id: [0],
        name: [''],
        key: [''],
        imageId: [0],
        tokens: [[]]
    });
    public get productTypeForm(): any {
        return this._productTypeForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<ProductTypeDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<ProductTypeDto> | undefined {
        return this._formModel;
    }

    private _subProductTypes: Array<ProductTypeDto> = [];
    public get subProductTypes(): Array<ProductTypeDto> {
        return this._subProductTypes;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _productTypeService: ProductTypeService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const productTypeId = Number(p.get('id'));
            this._formModel = await this._productTypeService.getInstance(productTypeId);

            this._productTypeForm.setValue({
                id: productTypeId,
                name: this._formModel.entity?.name,
                key: this._formModel.entity.key,
                imageId: this._formModel.entity.imageId || 0,
                tokens: []
            });
            console.log(this._productTypeForm.value)
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
        if (this._productTypeForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            const payload = {
                data: {
                    entity: {

                        ...this._productTypeForm.value,
                        name: this._formModel?.translations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,

                    },
                    translations: this._formModel ? this._formModel.translations : []
                }

            }
            await this._productTypeService.upsert(payload);
            this._router.navigateByUrl('/apps/ecommerce/product-types/list');
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
            (<any>this._productTypeForm.get('tokens')).value.push(fileData.token);
            this._productTypeForm.patchValue({ imageId: fileData.id })
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._productTypeForm.get('tokens')?.value)
    }
}
