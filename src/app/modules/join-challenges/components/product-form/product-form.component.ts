import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { FileService } from 'src/app/shared/services/file.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';
import { ProductDto, ProductPriceDto } from '../../models/product.dto';
import { ProductService } from '../../services/product.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { ProductTypeDto } from '../../models/product-type.dto';
import { GenderDto } from '../../models/gender.dto';
import { ManagementProductListParams } from '../../models/management-product-list.model';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { JoinChallengesDto } from '../../models/join-challenge-detail.dto';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-product-form',
    templateUrl: '/product-form.component.html',
    styleUrls: ['/product-form.component.scss'],
    providers: [
        ApiUrlPipe,

    ]
})
export class ProductFormComponent implements OnInit {
    userId: string = "";
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
        id: [0],
        userId: [''],
        userChallengeId: [''],
        mediaContentUrl: [''],
        mediaContentFullUrl: [''],
        timeStamp: [0],
        contentType: [''],
        challengeName: [''],
        challengeHeader: [''],
        challengeDescription: [''],
        targetScore: [0],
        score: [0],
        count: [0],
        joinChallengeId: [""]
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

    private _formModel: JoinChallengesDto | undefined = undefined;
    public get formModel(): JoinChallengesDto | undefined {
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

    productPrice: ProductPriceDto = {
        unitPrice: 0,
        currency: "₺",
        discountedPrice: 0,
        // userId: this.userId,
        status: 1,
    }



    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _productService: ProductService,
        private _fileService: FileService,
        private _toastService: ToastService,
        private _apiUrlPipe: ApiUrlPipe,
        private _toolbarService: ToolbarService,
        private _appService: AppService
    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            let getId = p.get('id')
            if (getId) {
                this.userId = getId;
            }
            const result = await Promise.all([
                this._productService.getInstance(this.userId),
            ])
            console.log(result)
            this._formModel = result[0];
            this.initForm();
        }));
    }

    private initForm(): void {
        if (!this._formModel) { return; }

        this._productForm.get('id')?.setValue(this.userId);
        this._productForm.get('userId')?.setValue(this._formModel.userId);
        this._productForm.get('userChallengeId')?.setValue(this._formModel.userChallengeId);
        this._productForm.get('joinChallengeId')?.setValue(this._formModel.joinChallengeId);
        this._productForm.get('mediaContentUrl')?.setValue(this._formModel.mediaContentUrl);
        this._productForm.get('timeStamp')?.setValue(this._formModel.timeStamp);
        this._productForm.get('contentType')?.setValue(this._formModel.contentType);
        this._productForm.get('challengeName')?.setValue(this._formModel.challengeName);
        this._productForm.get('challengeHeader')?.setValue(this._formModel.challengeHeader);
        this._productForm.get('challengeDescription')?.setValue(this._formModel.challengeDescription);
        this._productForm.get('targetScore')?.setValue(this._formModel.targetScore);
        this._productForm.get('points')?.setValue(this._formModel.points);
        this._productForm.get('myScore')?.setValue(this._formModel.myScore);
        this._productForm.get('fullName')?.setValue(this._formModel.fullName);
        this._productForm.get('imagePath')?.setValue(this._formModel.imagePath);
        this._productForm.get('country')?.setValue(this._formModel.country);
        this._productForm.get('count')?.setValue(this._formModel.count);
        this._productForm.get('mediaContentFullUrl')?.setValue(this._appService.baseUrl + this._formModel.mediaContentUrl);

        this._toolbarService.isVisibleToCreate(false)

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

        try {
            this._formErrors = [];
            this._productService.upsert({
                userChallengeId: this.productForm.value.userChallengeId,
                joinChallengeId: this.productForm.value.id,
                count: this.productForm.value.count,
                timeStamp: this.productForm.value.timeStamp,
                score: this.productForm.value.score
            }).then((response) => {

                this._toastService.show('Başarılı bir şekilde kaydedildi.', {
                    classname: 'bg-success text-light'
                });
                this._router.navigateByUrl('/users/list');
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
            userId: this.userId,
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
            userId: this.userId,
            displayOrder: 0
        }]
    }


    public async onImageFileSelect(e: any) {
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

    addForRelationProduct(e: any) {
        console.log(e.target.value)
        const value: any = this.products.items?.find(p => p.userId == e.target.value)
        const productForDetail = {
            id: 0,
            /* s */
            relatedProduct: value.product,
            displayOrder: 0
        }
        const productRelateds = {
            id: 0,
            /* userId: this.userId != 0 ? this.userId : 0, */
            displayOrder: 0
        }

        if (this.selectedProducts.length == 0) {
            this.selectedProductsWithDetail.push(productForDetail)
            this.selectedProducts.push(productRelateds);
            console.log(this.selectedProducts)
        }
        else {
            const idx = this.selectedProducts.findIndex(p => p.userId === value.product.id);
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
        const idx = this.selectedProducts.findIndex(p => p.userId === id);
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
