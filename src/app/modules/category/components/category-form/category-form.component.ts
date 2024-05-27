import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordStatus } from 'src/app/complex-types';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { CategoryDto } from '../../models/category.dto';
import { CategoryService } from '../../services/category.service';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    providers: [ApiUrlPipe]
})
export class CategoryFormComponent implements OnInit, OnDestroy {
    public parentCategoryId: number | undefined = 0;

    public get isLoading(): boolean {
        return this._categoryService.isLoading || this._fileService.isLoading;
    }
    selectedCategory: any = null
    selectedCategoryName: string = ""


    private _categoryImage: string | undefined = undefined;
    public get categoryImage(): string | undefined {
        return this._categoryImage;
    }

    private _nameTranslations: Array<TranslationEntryDto> = [];
    public get nameTranslations(): Array<TranslationEntryDto> {
        return this._nameTranslations;
    }

    private _descTranslations: Array<TranslationEntryDto> = [];
    public get descTranslations(): Array<TranslationEntryDto> {
        return this._descTranslations;
    }

    private _seoTitleTranslations: Array<TranslationEntryDto> = [];
    public get seoTitleTranslations(): Array<TranslationEntryDto> {
        return this._seoTitleTranslations;
    }

    private _seoDescriptionTranslations: Array<TranslationEntryDto> = [];
    public get seoDescriptionTranslations(): Array<TranslationEntryDto> {
        return this._seoDescriptionTranslations;
    }

    private _seoUrlTranslations: Array<TranslationEntryDto> = [];
    public get seoUrlTranslations(): Array<TranslationEntryDto> {
        return this._seoUrlTranslations;
    }


    private _categories: PagedList<CategoryDto> = { count: 0 };
    public get categories(): PagedList<CategoryDto> {
        return this._categories;
    }


    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    private _modifiedCategoryList: Array<CategoryDto> = [];
    public get modifiedCategoryList(): Array<CategoryDto> {
        return this._modifiedCategoryList;
    }

    private _categoryForm = this._formBuilder.group({
        id: [0],
        name: [''],
        isActive: [false, [Validators.required]],
        key: ['', [Validators.required]],
        tokens: [[]],
        parentId: [null],
        showOnHomepage: [false],
        seoTitleKey: [''],
        seoTitle: [''],
        seoDescriptionKey: [''],
        seoDescription: [''],
        seoUrlKey: [''],
        seoUrl: [''],
    });
    public get categoryForm(): UntypedFormGroup {
        return this._categoryForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<CategoryDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<CategoryDto> | undefined {
        return this._formModel;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _categoryService: CategoryService,
        private _fileService: FileService,
        private _apiUrlPipe: ApiUrlPipe,
        private _toolbarService: ToolbarService
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const categoryId = Number(p.get('id'));
            this._formModel = await this._categoryService.getInstance(categoryId);

            this._categoryForm.setValue({
                id: categoryId,
                name: this._formModel.entity?.name,
                isActive: this._formModel.entity?.isActive,
                key: this._formModel.entity.key,
                tokens: [],
                parentId: this._formModel.entity.parentId,
                showOnHomepage: this._formModel.entity.showOnHomepage,
                seoTitleKey: this._formModel.entity.seoTitleKey,
                seoTitle: this._formModel.entity.seoTitle,
                seoDescriptionKey: this._formModel.entity.seoDescriptionKey,
                seoDescription: this._formModel.entity.seoDescription,
                seoUrlKey: this._formModel.entity.seoUrlKey,
                seoUrl: this._formModel.entity.seoUrl,
            });
            console.log(this._categoryForm);
            this._nameTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Name') : [];
            this._descTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Description') : [];
            this._seoTitleTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'SeoTitle') : [];
            this._seoDescriptionTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'SeoDescription') : [];
            this._seoUrlTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'SeoUrl') : [];

            if (this.formModel && this.formModel.entity && this.formModel.entity.image && this.formModel.entity.image.imagePath) {
                this._thumbImage = this._apiUrlPipe.transform(this.formModel.entity.image.imagePath)
            }
            this.selectedCategory = this._formModel.entity.parent
            this.selectedCategoryName = this._formModel.entity.parent?.name


        }));
        this.getCategories()
        this._toolbarService.isVisibleToCreate(false)

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    public async onSaveClick(): Promise<void> {
        if (this._categoryForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            const payload = {
                data: {
                    entity: {
                        ...this._categoryForm.value,
                        isActive: typeof (this._categoryForm.value.isActive) === 'string' ? this._categoryForm.value.isActive == 'true' : this._categoryForm.value.isActive,
                        name: this._formModel?.translations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                        seoTitle: this._seoTitleTranslations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                        seoDescription: this._descTranslations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                        seoUrl: this._descTranslations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                    },
                    translations: this._formModel ? this._formModel.translations : []
                }
            }
            await this._categoryService.upsert(payload);
            this._router.navigateByUrl('/apps/ecommerce/categories/list');
        } catch (error: any) {
            this._formErrors = error;
            window.scrollTo({ top: 0 })
        }
    }

    public onTranslationEntryChange(): void {
    }

    async getCategories(): Promise<void> {
        this._params.Page = 0;
        this._params.Count = 200;
        const filter = {
            filter: {
                "field": "parentId",
                "operator": "isnull",
            }
        }
        this._categories = await this._categoryService.getListByPage(this.params, filter);

    }



    public async onSelectCategory(category: any, event: Event) {
        console.log(category, event)
        this.selectedCategory = category
        this.selectedCategoryName = category.name
        this._categoryForm.patchValue({ parentId: category.id })

        event.stopPropagation();

    }

    onSelectCategoryForComp(category: any) {
        console.log(category)
        this.selectedCategory = category
        this.selectedCategoryName = category.name
        this._categoryForm.patchValue({ parentId: category.id })
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

            (<any>this._categoryForm.get('tokens')).value.push((await this._fileService.postFile(this._thumbImg)).token);
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._categoryForm.get('tokens')?.value)
    }


}
