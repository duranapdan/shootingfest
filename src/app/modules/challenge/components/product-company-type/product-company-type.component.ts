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

        this._subsink.add(this._route.paramMap.subscribe(async p => {
            this.productId = Number(p.get('id'));
            console.log(this.productId);

            if (this.productId) {
                this.product = await this._productService.get(this.productId);
                console.log(this.product);

                // this.productCompanyTypeList = await this._productService.getProductCompanyTypeList(this.productId);
                this.companyTypeList = await this._productService.getCompanyTypeList();

                for (let i = 0; i < this.companyTypeList.length; i++) {
                    const element = this.companyTypeList[i];

                    for (let j = 0; j < this.productCompanyTypeList.length; j++) {
                        const item = this.productCompanyTypeList[j];
                        if (item.id == element.id) {
                            const newElement = element;
                            newElement.isSelected = true;
                            this.finalList.push(newElement);
                        }

                    }
                }

                console.log(this.finalList);
            }

        }));
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
