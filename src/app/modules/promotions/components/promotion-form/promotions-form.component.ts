import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { CoinsService } from 'src/app/modules/coins/services/coins.service';
import { CustomerDto } from 'src/app/modules/customer/models/customer.dto';
import { ManagementCustomerListParams } from 'src/app/modules/customer/models/management-customer-list.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { ManagementProductListParams } from 'src/app/modules/users/models/management-product-list.model';
import { ProductService } from 'src/app/modules/users/services/product.service';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { PromotionService } from '../../services/promotion.service';
import { ProductForListDto } from 'src/app/modules/users/models/product-for-list.dto';
import { ProductDto } from 'src/app/modules/users/models/product.dto';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
    selector: 'app-promotions-form',
    templateUrl: './promotions-form.component.html',
    styleUrls: ['./promotions-form.component.css']
})
export class PromotionsFormComponent implements OnInit {

    promotionModel: any;

    private _productList: PagedList<ProductForListDto> = { page: 0, count: 0 };
    public get productList(): PagedList<ProductForListDto> {
        return this._productList;
    }
    selectedProduct: any
    promotionId: any;

    selectedPromotedProductId: any;
    selectedRequiredProductId: any;

    isAddModeForPromoted: boolean = false;
    isAddModeForRequired: boolean = false;

    nameTranslations: any = [];
    descTranslations: any = [];

    companyTypeList: any = [];
    membershipStatusList: any = [];
    customersList: any = [];
    containerTypeList: any = [];

    public get isLoading(): boolean {
        return this._promotionService.isLoading;
    }

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    private _params: ManagementCustomerListParams = new ManagementCustomerListParams();
    public get params(): ManagementCustomerListParams {
        return this._params;
    }
    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _coinService: CoinsService,
        private _route: ActivatedRoute,
        private _productService: ProductService,
        private _customerService: CustomerService,
        private _promotionService: PromotionService,
        private _confirmationService: ConfirmationService,
        private _toolbarService: ToolbarService


    ) { }

    ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            this.promotionId = p.get('id');
            if (this.promotionId) {
                await this.getPromotionDetail(this.promotionId);
            }
            else {
                await this.getPromotionInstance();
            }
        }));

        this.getProducts();
        this.getCompanyTypeList();
        this.getCoinMembershipList();
        this._toolbarService.isVisibleToCreate(false)


    }

    async getPromotionInstance() {
        this.promotionModel = await this._promotionService.getInstance();
        console.log(this.promotionModel);

        this.nameTranslations = this.promotionModel.translations ? this.promotionModel.translations.filter((t: any) => t.property === 'Name') : [];
        this.descTranslations = this.promotionModel.translations ? this.promotionModel.translations.filter((t: any) => t.property === 'Description') : [];
    }

    async getPromotionDetail(id: any) {
        this.promotionModel = await this._promotionService.getWithTranslation(id);
        console.log(this.promotionModel);
        this.nameTranslations = this.promotionModel.translations ? this.promotionModel.translations.filter((t: any) => t.property === 'Name') : [];
        this.descTranslations = this.promotionModel.translations ? this.promotionModel.translations.filter((t: any) => t.property === 'Description') : [];

        var startDate: any;
        var endDate: any;
        console.log(this.promotionModel.entity.startDate)
        if (this.promotionModel.entity.startDate) {
            var d = new Date(this.promotionModel!.entity.startDate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            startDate = [year, month, day].join('-');
        }

        if (this.promotionModel.entity.endDate) {
            var d = new Date(this.promotionModel!.entity.endDate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            endDate = [year, month, day].join('-');
        }
        this.promotionModel.entity.startDate = startDate;
        this.promotionModel.entity.endDate = endDate;
        console.log(this.promotionModel.entity.startDate)
    }

    async onSelectRequiredProduct(e: any) {
        const idx: number = this._productList.items!.findIndex((x: any) => x.id == e.target.value) || 0;
        this.selectedProduct = this._productList.items![idx]
    }
    async onSelectPromotedProduct(e: any) {
        this.selectedPromotedProductId = e.target.value;
        const idx = this.productList.items!.findIndex((x: any) => x.id == this.selectedPromotedProductId);
        this.selectedProduct = this._productList.items![idx]
        console.log(this.selectedProduct);
    }

    async onAddPromotedProduct() {
        const idx = this.productList.items!.findIndex((x: any) => x.id == this.selectedPromotedProductId);
        const selectedProduct = this._productList.items![idx]

        const model = {
            id: 0,
            optional: false,
            productQuantity: 1,
            promotedProductId: Number(this.selectedPromotedProductId),
            product: selectedProduct,
            discountType: 3,
            promotionId: Number(this.promotionId)
        }

        this.promotionModel.entity.promotionPromotedProducts.push(model);
        this.selectedPromotedProductId = null;
    }

    async onAddReqiredProduct() {
        if (this.selectedRequiredProductId) {
            const idx: any = this._productList.items?.findIndex((x: any) => x.id == this.selectedRequiredProductId);
            console.log(this._productList.items![idx])
            this.selectedProduct = this._productList.items![idx]

            const model = {
                id: 0,
                optional: false,
                productQuantity: 1,
                product: this.selectedProduct,
                requiredProductId: Number(this.selectedRequiredProductId),
                promotionId: Number(this.promotionId)
            }

            this.promotionModel.entity.promotionRequiredProducts.push(model);
            this.selectedRequiredProductId = null;
        }
    }

    async onDeleteRequiredProduct(product: any) {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }
        const idx = this.promotionModel?.entity.promotionRequiredProducts.findIndex((x: any) => x.id == product.id);
        this.promotionModel?.entity.promotionRequiredProducts.splice(idx, 1);
    }

    async onDeletePromotedProduct(product: any) {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }
        const idx = this.promotionModel?.entity.promotionPromotedProducts.findIndex((x: any) => x.id == product.id);
        this.promotionModel?.entity.promotionPromotedProducts.splice(idx, 1);
    }

    public async getProducts(): Promise<void> {
        this._productList = await this._productService.getListForPromotions();
        console.log(this.productList)
    }

    public async getCompanyTypeList() {
        this.companyTypeList = await this._productService.getCompanyTypeList();
        console.log(this.companyTypeList);

    }

    public async getCoinMembershipList() {
        this.membershipStatusList = await this._coinService.getCoinMembershipList();
    }





    public async onSaveClick() {

        if (this.promotionModel.entity.membershipStatusId != null) {
            this.promotionModel.entity.membershipStatusId = Number(this.promotionModel.entity.membershipStatusId);
        }
        if (this.promotionModel.entity.promotionType != null) {
            this.promotionModel.entity.promotionType = Number(this.promotionModel.entity.promotionType);
        }
        if (this.promotionModel.entity.discountType != null) {
            this.promotionModel.entity.discountType = Number(this.promotionModel.entity.discountType);
        }

        this.promotionModel.entity.description = this.descTranslations?.find((item: any) => item.language.symbol === "tr-TR")?.entryValue || this.descTranslations?.find((item: any) => item.language.symbol === 'en-US')?.entryValue;

        this.promotionModel.entity.name = this.nameTranslations?.find((item: any) => item.language.symbol === "tr-TR")?.entryValue || this.nameTranslations?.find((item: any) => item.language.symbol === 'en-US')?.entryValue;

        this.promotionModel.translations = this.nameTranslations.concat(this.descTranslations);

        try {
            this._formErrors = [];
            await this._promotionService.upsertPromotion({
                data: {
                    entity: {
                        ...this.promotionModel.entity
                    },
                    translations: this.promotionModel.translations
                }
            });
            this._router.navigateByUrl('/apps/ecommerce/promotions/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }

}
