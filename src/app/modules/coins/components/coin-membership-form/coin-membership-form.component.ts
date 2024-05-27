import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyTypeDto } from 'src/app/modules/customer/models/company-type.dto';
import { ProductService } from 'src/app/modules/users/services/product.service';
import { SubSink } from 'subsink';
import { CoinsService } from '../../services/coins.service';

@Component({
    selector: 'app-coin-membership-form',
    templateUrl: './coin-membership-form.component.html',
    styleUrls: ['./coin-membership-form.component.css']
})
export class CoinMembershipFormComponent implements OnInit {

    public get isLoading(): boolean {
        return this._coinsService.isLoading;
    }

    public hasDuplicate: any;

    coinMembershipModel: any;
    companyTypeList: any = [];
    companyTypeIdList: any = [];

    private _subsink = new SubSink();

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    private _customerTypes: Array<CompanyTypeDto> = [];

    constructor(
        private _route: ActivatedRoute,
        private _productService: ProductService,
        private _router: Router,
        private _coinsService: CoinsService
    ) { }

    ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const id = p.get('id');
            if (id) {
                this.getMemberhipDetail(id);
            }

            else {
                this.getMemberhipInstance();
            }
        }));
        this.getCompanyTypeList();
    }

    public companyTypeName(id: number): string {
        const ct = this._customerTypes.find(c => c.id === id);
        return ct && ct.name ? ct.name : '-';
    }

    public async getCompanyTypeList() {
        this.companyTypeList = await this._productService.getCompanyTypeList();
    }

    async getMemberhipDetail(id: any) {
        this.coinMembershipModel = await this._coinsService.getcoinMembershipDetail(id);
        console.log(this.coinMembershipModel);
    }

    async getMemberhipInstance() {
        this.coinMembershipModel = await this._coinsService.getcoinMembershipInstance();
        console.log(this.coinMembershipModel);
    }

    async addCoinRuleClick() {
        const model = {
            coinType: 1,
            coinWinReward: 0,
            companyType: null,
            companyTypeId: 1,
            id: 0,
            maxOrderAmount: 0,
            minOrderAmount: 0,
        }
        model.companyTypeId = Number(model.companyTypeId)
        this.coinMembershipModel?.entity?.coinRules.push(model);
    }

    public async onSelectCoinType(e: any, idx: any) {
        console.log(e.target.value);
        this.coinMembershipModel.entity.coinRules[idx].companyTypeId = Number(e.target.value);
    }

    async onSaveClick() {
        console.log(this.coinMembershipModel.entity.coinRules);

        const ids = this.coinMembershipModel?.entity?.coinRules.map((obj: any) => obj.companyTypeId);
        const set = new Set(ids);
        this.hasDuplicate = set.size < this.coinMembershipModel?.entity?.coinRules.length;
        console.log(this.hasDuplicate);

        if (this.hasDuplicate) {
            return;
        }

        else {
            this._coinsService.upsertMembership(this.coinMembershipModel);
            this._router.navigateByUrl('/apps/ecommerce/coins/memberships');
        }

    }
}
