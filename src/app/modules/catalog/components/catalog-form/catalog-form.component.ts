import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordStatus } from 'src/app/complex-types';
import { BrandDto } from 'src/app/modules/brand/models/brand.dto';
import { BrandService } from 'src/app/modules/brand/services/brand.sevice';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { CatalogDto } from '../../models/catalog.dto';
import { CatalogService } from '../../services/catalog.sevice';

@Component({
    selector: 'app-catalog-form',
    templateUrl: './catalog-form.component.html',
    styleUrls: ['./catalog-form.component.scss'],
    providers: [ApiUrlPipe, BrandService]
})
export class CatalogFormComponent implements OnInit, OnDestroy {

    public get isLoading(): boolean {
        return this._catalogService.isLoading || this._fileService.isLoading;
    }

    private _catalogImage: string | undefined = undefined;
    public get catalogImage(): string | undefined {
        return this._catalogImage;
    }

    private _catalogForm = this._formBuilder.group({
        id: [0, [Validators.required]],
        brandId: [0, [Validators.required]],
        name: [''],
        key: ['', [Validators.required]],
        tokens: [[]],
        tokenDocument: [null],
        status: RecordStatus.Passive
    });
    public get catalogForm(): UntypedFormGroup {
        return this._catalogForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<CatalogDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<CatalogDto> | undefined {
        return this._formModel;
    }

    private _brands: Array<BrandDto> = [];
    public get brands(): Array<BrandDto> {
        return this._brands;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _catalogService: CatalogService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe,
        private _brandService: BrandService
    ) { }

    public async ngOnInit(): Promise<void> {
        this._brands = await this._brandService.getList();
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const catalogId = Number(p.get('id'));
            this._formModel = await this._catalogService.getInstance(catalogId);

            console.log(this._formModel);

            this._catalogForm.setValue({
                id: this._formModel.entity?.id,
                name: this._formModel.entity?.name,
                key: this._formModel.entity.key,
                tokens: [],
                tokenDocument: null,
                brandId: this._formModel.entity.brandId,
                status: this._formModel.entity.status
            });

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
        console.log(this._catalogForm.invalid || this.isLoading);
        console.log(this.formModel);
        console.log(this._catalogForm);
        
        
        if (this._catalogForm.invalid || this.isLoading) {alert("Form Invalid."); return; }

        if (!(this.formModel && this.formModel.entity && this.formModel.entity.image) && this._catalogForm.get('tokens')?.value.length === 0) { alert("Catalog Image Invalid."); return; }
        if (!(this.formModel && this.formModel.entity && this.formModel.entity.document) && !this._catalogForm.get('tokenDocument')?.value) { alert("Catalog Document Invalid."); return; }


        try {
            this._formErrors = [];
            await this._catalogService.upsert({
                entity: this._catalogForm.value,
                translations: this._formModel ? this._formModel.translations : []
            });
            this._router.navigateByUrl('/apps/ecommerce/catalogs/list');
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

            (<any>this._catalogForm.get('tokens')).value.push(await this._fileService.postFile(this._thumbImg));
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._catalogForm.get('tokens')?.value)
    }

    private _doc: File | undefined = undefined;
    public get doc(): File | undefined {
        return this._doc;
    }

    private _document: string = '/assets/media/svg/files/blank-image.svg';
    public get document(): string {
        return this._document;
    }

    @ViewChild('docInput', { static: false }) public docInput: ElementRef | undefined;

    public async onDocChange(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._doc = e.target.files[0];

        if (this._doc) {
            this._document = await this._fileService.getLocalSource(this._doc);

            (<any>this._catalogForm.get('tokenDocument')).setValue(await this._fileService.postFile(this._doc));
        }

        console.log(this._catalogForm.get('tokenDocument')?.value)
    }
}
