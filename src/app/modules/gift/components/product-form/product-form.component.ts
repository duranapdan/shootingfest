import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandDto } from 'src/app/modules/brand/models/brand.dto';
import { BrandService } from 'src/app/modules/brand/services/brand.sevice';
import { CategoryDto } from 'src/app/modules/category/models/category.dto';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { CompanyTypeDto } from 'src/app/modules/customer/models/company-type.dto';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { ProductFlagDto } from 'src/app/modules/product-flag/models/product-flag.dto';
import { ProductFlagService } from 'src/app/modules/product-flag/services/product-flag.service';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';
import { ProductPriceDto } from '../../models/product.dto';
import { ProductService } from '../../services/product.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ProductTypeDto } from '../../models/product-type.dto';
import { GenderDto } from '../../models/gender.dto';
import { ManagementProductListParams } from '../../models/management-product-list.model';
import { GiftDto } from '../../models/gift.dto';
import { AppService } from 'src/app/app.service';
import { CreateGiftDto } from '../../models/CreateGiftDto.dto';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    providers: [
        ApiUrlPipe,
        BrandService,
        CategoryService,
        ProductFlagService,
        CustomerService
    ]
})
export class ProductFormComponent implements OnInit {
    giftId: string | null = "";
    selectedCategoryName: string = ""
    selectedCategory: any = null
    private _isLoading: boolean = false;
    public get isLoading(): boolean {
        return this._giftService.isLoading || this._brandService.isLoading || this._categoryService.isLoading || this._isLoading;
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


    private _giftForm = this._formBuilder.group({
        id: [],
        giftName: ['', [Validators.required]],
        giftDescription: [''],
        giftImageUrl: [''],
        points: [''],
        status: [''],
        createdBy: [''],
        createdDate: [''],
        modifiedBy: [''],
        modifiedDate: [''],
        isDeleted: [],
        deletedDate: [],
        file: Blob,
        tokens: [''],
        fileName: ['']
    });

    public get giftForm(): UntypedFormGroup {
        return this._giftForm;
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

    private _formModel: GiftDto | undefined = undefined;
    public get formModel(): GiftDto | undefined {
        return this._formModel;
    }

    private _brands: PagedList<BrandDto> = { page: 0, count: 0 };
    public get brands(): PagedList<BrandDto> {
        return this._brands;
    }

    /* private _categories: PagedList<CategoryDto> = { count: 0 };
    public get categories(): PagedList<CategoryDto> {
        return this._categories;
    } */

    private _genders: Array<GenderDto> = [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
    ];
    public get genders(): Array<GenderDto> {
        return this._genders;
    }

    private _productFlags: Array<ProductFlagDto> = [];
    public get productFlags(): Array<ProductFlagDto> {
        return this._productFlags;
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

    productPrice: ProductPriceDto = {

        unitPrice: 0,
        currency: "₺",
        discountedPrice: 0,
        productId: 0,
        status: 1,

    }


    private _customerTypes: Array<CompanyTypeDto> = [];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _giftService: ProductService,
        private _brandService: BrandService,
        private _categoryService: CategoryService,
        private _productFlagService: ProductFlagService,
        private _fileService: FileService,
        private _toastService: ToastService,
        private _apiUrlPipe: ApiUrlPipe,
        private _customerServices: CustomerService,
        private _appService: AppService

    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            this.giftId = p.get('id');
            if (this.giftId !== "" && this.giftId != null) {
                const result = await this._giftService.getInstance(this.giftId);
                this._formModel = result;
                this.initForm();
            }


        }));
    }


    private initForm(): void {
        if (!this._formModel) { return; }

        this._giftForm.get('id')?.setValue(this.giftId);
        this._giftForm.get('giftName')?.setValue(this._formModel.giftName);
        this._giftForm.get('giftDescription')?.setValue(this._formModel.giftDescription);
        this._giftForm.get('giftImageUrl')?.setValue(this._appService.baseUrl + this._formModel.giftImageUrl);
        this._giftForm.get('points')?.setValue(this._formModel.points);
        this._giftForm.get('status')?.setValue(this._formModel.status);
        this._giftForm.get('createdBy')?.setValue(this._formModel.createdBy);
        this._giftForm.get('createdDate')?.setValue(this._formModel.createdDate);
        this._giftForm.get('modifiedBy')?.setValue(this._formModel.modifiedBy);
        this._giftForm.get('modifiedDate')?.setValue(this._formModel.modifiedDate);
        this._giftForm.get('isDeleted')?.setValue(this._formModel.isDeleted);
        this._giftForm.get('deletedDate')?.setValue(this._formModel.deletedDate);
        this._giftForm.get('fileName')?.setValue(this._formModel.fileName);

        if (this._formModel.giftImageUrl != null) {
            this._giftForm.get('productImages')?.setValue(this._formModel.giftImageUrl);
            //this._selectedImages = this._formModel.entity.productImages.map((pImage)=>{ return {token:'',name:'',path:pImage.image!.imagePath}});
        }
        else
            this._giftForm.get('productImages')?.setValue([]);



    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    public async onThumbChange(e: any): Promise<void> {
        const input = e.target as HTMLInputElement;

        if (!e.target.files[0]) { return; }
        const selectedFile = e.target.files[0];
        this._giftForm.get('fileName')?.setValue(selectedFile.name);
        this._giftForm.get('file')?.setValue(e.target.files[0]);
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.giftForm.controls['giftImageUrl'].setValue(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }


    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    public onSaveClick() {
        if (this._giftForm.invalid) { return; }
        try {
            this._giftService.upsert({ ...this._giftForm.value }).then((response) => {
                if (this._formModel)
                    this._toastService.show('Başarılı bir şekilde kaydedildi.', {
                        classname: 'bg-success text-light'
                    });
            });

        } catch (error: any) {
            this._formErrors = error;

            window.scrollTo({
                top: 0
            });
        }
    }

    public async onSelectCategory(category: any, event: Event) {
        this.selectedCategory = category
        this.selectedCategoryName = category.name
        this.selectedCategories = [{
            category: category,
            categoryId: category.id ? category.id : 0,
            giftId: this.giftId,
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
            giftId: this.giftId,
            displayOrder: 0
        }]
    }



    public onDeleteSelectedImage(token: string): void {
        const idx = this._selectedImages.findIndex(f => f.token === token);
        if (idx > -1) {
            this._selectedImages.splice(idx, 1);
        }

        const idx2 = this._giftForm.get('tokensImages')?.value.indexOf(token);
        if (idx2 > -1) {
            this._giftForm.get('tokensImages')?.value.splice(idx2, 1);
        }
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


    onCategorySelectionChange(event: Event, category: CategoryDto): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.checked) {
            const categoryModel =
                this.selectedCategories.push({
                    categoryId: category.id ? category.id : 0,
                });
            const idx = this.selectedCategories.findIndex((x: any) => x.categoryId == category.id)
            this.selectedCategories[idx].displayOrder = idx + 1
        } else {
            const index = this.selectedCategories.findIndex(c => c.categoryId === category.id);
            this.selectedCategories.splice(index, 1);
        }
    }

    onGenderSelectionChange(event: Event, gender: GenderDto): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.checked) {
            const idx = this.selectedGenders.findIndex((x: any) => x.id == gender.id)
        } else {
            const index = this.selectedGenders.findIndex(c => c.id === gender.id);
            this.selectedGenders.splice(index, 1);
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
            this._products = await this._giftService.getListByRelations(payload)
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
            this._products = await this._giftService.getListByRelations(payload)

            if (this._products.items?.length == 0) {
                this._toastService.show('Bu filtreye uygun ürün bulunamadı!', {
                    classname: 'bg-warning text-light'
                });
            }

            console.log(this._products)
        }
    }

    addForRelationProduct(e: any) {
        console.log(e.target.value)
        const value: any = this.products.items?.find(p => p.giftId == e.target.value)
        const productForDetail = {
            id: 0,
            giftId: this.giftId != `` ? this.giftId : ``,
            relatedProductId: value.product.id,
            relatedProduct: value.product,
            displayOrder: 0
        }
        const productRelateds = {
            id: 0,
            giftId: this.giftId != `` ? this.giftId : ``,
            relatedProductId: value.product.id,
            displayOrder: 0
        }

        if (this.selectedProducts.length == 0) {
            this.selectedProductsWithDetail.push(productForDetail)
            this.selectedProducts.push(productRelateds);
            console.log(this.selectedProducts)
        }
        else {
            const idx = this.selectedProducts.findIndex(p => p.relatedProductId === value.product.id);
            console.log(idx)
            if (idx === -1) {
                this.selectedProductsWithDetail.push(productForDetail)
                this.selectedProducts.push(productRelateds);
                console.log(this.selectedProducts)
            }
        }
        console.log(this.selectedProductsWithDetail)
    }

    removeFromRelativeList(id: number) {
        console.log(id)
        console.log(this.selectedProducts)
        const idx = this.selectedProducts.findIndex(p => p.relatedProductId === id);
        console.log(idx)
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
