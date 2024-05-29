import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';
import { ProductService } from '../../services/product.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ProductTypeDto } from '../../models/product-type.dto';
import { GenderDto } from '../../models/gender.dto';
import { ManagementProductListParams } from '../../models/management-product-list.model';
import { ProductDetailDto } from '../../models/product-detail.dto';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    providers: [
        ApiUrlPipe,
    ]
})
export class ProductFormComponent implements OnInit {
    productId: string = "";
    selectedCategoryName: string = ""
    selectedCategory: any = null
    private _isLoading: boolean = false;
    public get isLoading(): boolean {
        return this._productService.isLoading || this._isLoading;
    }

    private _categoryImage: string | undefined = undefined;
    public get categoryImage(): string | undefined {
        return this._categoryImage;
    }

    private _thumbImg: File | undefined = undefined;
    public get thumbImg(): File | undefined {
        return this._thumbImg;
    }

    private _params: ManagementProductListParams = new ManagementProductListParams();
    public get params(): ManagementProductListParams {
        return this._params;
    }

    categoryForRelation: any = null
    brandForRelation: any = null
    @ViewChild('thumbInput', { static: false }) public thumbInput: ElementRef | undefined;
    public selectedCategories: any[] = [];
    public selectedGenders: GenderDto[] = [];
    selectedProducts: any[] = []
    selectedProductsWithDetail: any[] = []

    private _productForm = this._formBuilder.group({
        id: [''],
        questionText: [''],
        answerText: [''],
        faqOrder: [0],
        status: [0],
        createdBy: [''],
        createdDate: [''],
        modifiedBy: [''],
        modifiedDate: [''],
        isDeleted: [false],
        deletedDate: [''],
        userId: ['']
    });

    public get productForm(): UntypedFormGroup {
        return this._productForm;
    }


    private _subsink = new SubSink();

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

    private _formModel: ProductDetailDto | undefined = undefined;
    public get formModel(): ProductDetailDto | undefined {
        return this._formModel;
    }

    private _genders: Array<GenderDto> = [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
    ];
    public get genders(): Array<GenderDto> {
        return this._genders;
    }

    private _productTypes: PagedList<ProductTypeDto> = { page: 0, count: 0 };
    public get productTypes(): PagedList<ProductTypeDto> {
        return this._productTypes;
    }

    private _products: PagedList<any> = { page: 0, count: 0 };
    public get products(): PagedList<any> {
        return this._products;
    }

    private _selectedImages: Array<{ token: string, path: string, name: string }> = [];
    public get selectedImages(): Array<{ token: string, path: string, name: string }> {
        return this._selectedImages;
    }
    @ViewChild('imgInput', { static: false }) public imgInput: ElementRef | undefined;


    private _selectedDocuments: Array<{ token: string, path: string, name: string }> = [];
    public get selectedDocuments(): Array<{ token: string, path: string, name: string }> {
        return this._selectedDocuments;
    }
    @ViewChild('docInput', { static: false }) public docInput: ElementRef | undefined;


    private _thumbImage: string = '/assets/media/svg/files/blank-image.svg';
    public get thumbImage(): string {
        return this._thumbImage;
    }

    newVideos: Array<{ linkUrl: string, name: string }> = [];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _productService: ProductService,
        private _fileService: FileService,
        private _toastService: ToastService,
        private _apiUrlPipe: ApiUrlPipe,
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            let faqIq = p.get('id');
            if (faqIq) {
                const result = await Promise.all([
                    this._productService.getInstance(faqIq),
                ])
                console.log(result)
                this._formModel = result[0];

            }

            this.initForm();
        }));
    }

    private initForm(): void {
        if (!this._formModel) { return; }

        this._productForm.get('id')?.setValue(this._formModel.id);
        this._productForm.get('questionText')?.setValue(this._formModel.questionText);
        this._productForm.get('answerText')?.setValue(this._formModel.answerText);
        this._productForm.get('faqOrder')?.setValue(this._formModel.faqOrder);
        this._productForm.get('status')?.setValue(this._formModel.status);
        this._productForm.get('createdBy')?.setValue(this._formModel.createdBy);
        this._productForm.get('createdDate')?.setValue(this._formModel.createdDate);
        this._productForm.get('modifiedBy')?.setValue(this._formModel.modifiedBy);
        this._productForm.get('modifiedBy')?.setValue(this._formModel.modifiedBy);
        this._productForm.get('isDeleted')?.setValue(this._formModel.isDeleted);
        this._productForm.get('deletedDate')?.setValue(this._formModel.deletedDate);
        this._productForm.get('userId')?.setValue(this._formModel.id);

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onThumbChange(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }
        (<any>this._productForm.get('tokens')).value = [];
        this._isLoading = true;
        this._thumbImg = e.target.files[0];

        if (this._thumbImg) {
            this._thumbImage = await this._fileService.getLocalSource(this._thumbImg);

            (<any>this._productForm.get('tokens')).value.push((await this._fileService.postFile(this._thumbImg)).token);
        }
        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }
        this._isLoading = false;

        console.log(this._productForm)
    }


    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    public onSaveClick() {
        if (this._productForm.invalid) { return; }
        console.log('this._productForm.value :>> ', this._productForm.value);

        try {
            this._productService.upsert({
                ...this._productForm.value,

            }).then((response) => {

                this._toastService.show('Başarılı bir şekilde kaydedildi.', {
                    classname: 'bg-success text-light'
                });

                this._router.navigateByUrl('/faq/list');
            });

        } catch (error: any) {
            this._formErrors = error;

            window.scrollTo({
                top: 0
            });
        }
    }


    public async onSelectCategory(category: any, event: Event) {
        console.log(category, event)
        this.selectedCategory = category
        this.selectedCategoryName = category.name
        this.selectedCategories = [{
            category: category,
            categoryId: category.id ? category.id : 0,
            productId: this.productId,
            displayOrder: 0
        }]

        event.stopPropagation();

    }

    onSelectCategoryForComp(category: any) {
        console.log(category)
        this.selectedCategory = category
        this.selectedCategoryName = category.name
        this.selectedCategories = [{
            category: category,
            categoryId: category.id ? category.id : 0,
            productId: this.productId,
            displayOrder: 0
        }]
    }


    public async onImageFileSelect(e: any) {
        console.log(e.target.files);
        console.log(e.target.files.length);

        if (this.imgInput) {
            this.imgInput.nativeElement.value = '';
        }
        this._isLoading = false;
    }

    public onDeleteSelectedImage(token: string): void {
        const idx = this._selectedImages.findIndex(f => f.token === token);
        if (idx > -1) {
            this._selectedImages.splice(idx, 1);
        }

        const idx2 = this._productForm.get('tokensImages')?.value.indexOf(token);
        if (idx2 > -1) {
            this._productForm.get('tokensImages')?.value.splice(idx2, 1);
        }
    }

    public onDeleteProductImage(id: number): void {

    }

    public addNewVideo(): void {
        this.newVideos.push({
            linkUrl: '',
            name: ''
        });
    }

    public removeVideo(url: string): void {
        const idx = this.newVideos.findIndex((v: any) => v.linkUrl !== url)
        if (idx > -1) {
            this.newVideos.splice(idx, 1);
        }
    }



    async onChangeCategoryForRelative(e: any) {

        this.categoryForRelation = e.target.value
        if (this.brandForRelation && this.categoryForRelation) {
            const payload: any = {
                filter: {
                    field: "categoryId", operator: "eq", value: this.categoryForRelation.toString(), logic: "and", filters: [{ field: "product.brandId", operator: "eq", value: this.brandForRelation.toString() }]
                }
            }
            this._products = await this._productService.getListByRelations(payload)
            if (this._products.items?.length == 0) {
                this._toastService.show('Bu filtreye ait uygun ürün bulunamadı!', {
                    classname: 'bg-danger text-light'
                });
            }
        }

    }

    async onChangeBrandForRelative(e: any) {
        this.brandForRelation = e.target.value
        if (this.brandForRelation && this.categoryForRelation) {
            const payload: any = {
                filter: {
                    field: "categoryId", operator: "eq", value: this.categoryForRelation.toString(), logic: "and", filters: [{ field: "product.brandId", operator: "eq", value: this.brandForRelation.toString() }]
                }
            }
            this._products = await this._productService.getListByRelations(payload)

            if (this._products.items?.length == 0) {
                this._toastService.show('Bu filtreye uygun ürün bulunamadı!', {
                    classname: 'bg-warning text-light'
                });
            }
        }
    }

    removeFromRelativeList(id: number) {
        const idx = this.selectedProducts.findIndex(p => p.relatedProductId === id);
        if (idx !== -1) {
            this.selectedProductsWithDetail.splice(idx, 1);
            this.selectedProducts.splice(idx, 1);
        }

    }

    reArrangeRelationsProduct() {
        for (let index = 0; index < this.selectedProducts.length; index++) {
            this.selectedProducts[index].displayOrder = index
        }
        return this.selectedProducts
    }

}
