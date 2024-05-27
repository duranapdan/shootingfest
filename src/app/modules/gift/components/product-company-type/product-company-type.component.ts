import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ProductCompanyTypeRequestModel } from '../../models/product-company-type-request.model';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-company-type',
    templateUrl: './product-company-type.component.html',
    styleUrls: ['./product-company-type.component.css']
})
export class ProductCompanyTypeComponent implements OnInit {

    public productCompanyTypeList: Array<any> = [];
    public companyTypeList: Array<any> = [];
    public finalList: Array<ProductCompanyTypeRequestModel> = [];
    public productId: any;
    public product: any;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService
    ) { }

    private _subsink = new SubSink();

    ngOnInit(): void {
        const source = this.product?.source;
    }

    public onBackClick(): void {
        this._router.navigateByUrl(`/users/list`);
    }

    async onDeleteCompanyTypeClick(companyType: any) {

        if (companyType.isSelected == true) {
            await this._productService.deleteProductCompany(this.productId, companyType.id);
        }

        else {
            await this._productService.addProductCompany({
                productId: this.productId,
                companyTypeId: companyType.id
            });


        }

    }
}
