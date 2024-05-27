import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDto } from 'src/app/modules/approval-request/models/confirmation.dto';
import { ApprovalRequestService } from 'src/app/modules/approval-request/services/approval-request.service';
import {
  CityReadDto,
  CountryReadDto,
} from 'src/app/modules/order/models/order.dto';
import { SystemParameterService } from 'src/app/modules/system-parameter/services/system-parameter.sevice';
import { CityService } from 'src/app/shared/services/city.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';
import { CompanyTypeDto } from '../../models/company-type.dto';
import { CustomerDto } from '../../models/customer.dto';
import { FavouriteProductListDto } from '../../models/favourite-product-list.dto';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [ApprovalRequestService],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  private _isSaveCodeLoading: boolean = false;
  public get isSaveCodeLoading(): boolean {
    return this._isSaveCodeLoading;
  }

  private _isErpLoading: boolean = false;
  public get isErpLoading(): boolean {
    return this._isErpLoading;
  }

  public activeTab: number = 1;

  private _subsink = new SubSink();

  private _customer: CustomerDto | undefined = undefined;
  public get customer(): CustomerDto | undefined {
    return this._customer;
  }

  private _companyType: string | undefined = undefined;
  public get companyType(): string | undefined {
    return this._companyType;
  }

  private _favouriteProducts: Array<FavouriteProductListDto> | undefined;
  public get favouriteProducts(): Array<FavouriteProductListDto> | undefined {
    return this._favouriteProducts;
  }

  private _companyTypes: Array<CompanyTypeDto> = [];

  private _countries: Array<CountryReadDto> = [];
  private _cities: Array<CityReadDto> = [];

  constructor(
    private _customerService: CustomerService,
    private _activatedRoute: ActivatedRoute,
    private _countryService: CountryService,
    private _cityService: CityService,
    private _approvalRequestService: ApprovalRequestService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _toastService: ToastService,
  ) { }

  private _arid: number | undefined = undefined;
  public get arid(): number | undefined {
    return this._arid;
  }

  public appUrl: string="";
  private _customerId = 0;
  async ngOnInit(): Promise<void> {
    this._subsink.add(
      this._activatedRoute.paramMap.subscribe(async (params) => {
        this._customerId = Number(params.get('id'));

        await this.getCustomer(this._customerId);
        await this.getCompanyType();
        await this.getFavouriteProductList(this._customerId);
      })
    );

    this._subsink.add(
      this._activatedRoute.queryParamMap.subscribe((params) => {
        this._arid = Number(params.get('arid'));
      })
    );

    this._countries = await this._countryService.getAll();
    this._cities = await this._cityService.getAll();
  }

  async ngOnDestroy(): Promise<void> {
    this._subsink.unsubscribe();
  }

  private async getCustomer(id: number): Promise<void> {
    this._customer = await this._customerService.get(id);
    console.log(this._customer);
    this.newErpCode = this._customer?.erpCode;
    // const list = await this._customerService.getList(new ManagementCustomerListParams());
    // this._customer = list.data.find(c => c.id == id);
    // console.log(this._customer);
  }

  private async getCompanyType(): Promise<void> {
    this._companyTypes = await this._customerService.getCompanyTypes();
    console.log(this._companyTypes);

    const type = this._companyTypes.find(
      (ct) => ct.id === this._customer?.companyTypeId
    );

    if (!type) {
      return;
    }
    this._companyType = type.name;
  }
  private async getFavouriteProductList(companyId: number) {
    var res = await this._customerService.getFavouriteProductList(companyId);
    if (res.success) this._favouriteProducts = res.data;
  }
  public cityName(id: number): string | undefined {
    return this._cities.find((c) => c.id == id)?.cityName;
  }

  public countryName(id: number): string | undefined {
    return this._countries.find((c) => c.id == id)?.name;
  }

  public async onApproveClick(): Promise<void> {
    if (!this._arid) {
      return;
    }
    const result = await this._confirmationService.confirm();
    if (!result) {
      return;
    }

    await this._approvalRequestService.approve(this._arid);
    this._router.navigateByUrl(
      `/apps/ecommerce/customers/details/${this._customerId}`
    );
  }

  public async onRejectClick(): Promise<void> {
    if (!this._arid) {
      return;
    }
    this._router.navigateByUrl(
      `/apps/administration/approval-requests/reject?id=${this._arid
      }&&callback=${`/apps/ecommerce/customers/details/${this._customerId}`}`
    );
  }

  public async onSendToErpClick(): Promise<void> {
    const result = await this._confirmationService.confirm();
    if (!result) {
      return;
    }

    const res = await this._customerService.createCustomerGfws(
      this._customerId
    );
    this.newErpCode = res.data;

    if (res.success) {
      this._toastService.show('Successfully sent!', {
        classname: 'bg-success text-light',
      });
    } else {
      this._toastService.show('Something went wrong!!', {
        classname: 'bg-danger text-light',
      });
    }
  }

  public newErpCode: string | undefined = undefined;
  public saveErpCode: string | undefined = undefined;
  public async onSaveErpCodeClick(): Promise<void> {
    if (!this.newErpCode) {
      return;
    }

    const result = await this._confirmationService.confirm();
    if (!result) {
      return;
    }

    const res = await this._customerService.updateCompanyErpCode(
      this._customerId,
      this.newErpCode
    );
    if (res.success) {
      this.saveErpCode = this.newErpCode;
      this._toastService.show('Successfully saved!', {
        classname: 'bg-success text-light',
      });
    } else {
      this._toastService.show(
        res.validatonErrorMessages[0] || 'Something went wrong!!',
        {
          classname: 'bg-danger text-light',
        }
      );
    }
  }
}
