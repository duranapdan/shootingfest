// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { PagedList } from 'src/app/models/api-paged-data-result.model';
// import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
// import { CompanyTypeDto } from '../../models/company-type.dto';
// import { CustomerDto } from '../../models/customer.dto';
// import { ManagementCustomerListParams } from '../../models/management-customer-list.model';
// import { CustomerService } from '../../services/customer.service';

// @Component({
//     selector: 'app-customer-list',
//     templateUrl: './customer-list.component.html',
//     styleUrls: ['./customer-list.component.scss']
// })
// export class CustomerListComponent implements OnInit, OnDestroy {
//     public get isLoading(): boolean {
//         return this._customerService.isLoading;
//     }


//     private _customersModel: PagedList<CustomerDto> = { page: 0, count: 12, totalCount: 12, data:{items: []} };
//     public get customersModel(): PagedList<CustomerDto> {
//         return this._customersModel;
//     }

//     private _params: ManagementCustomerListParams = new ManagementCustomerListParams();
//     public get params(): ManagementCustomerListParams {
//         return this._params;
//     }

//     private _companyTypes: Array<CompanyTypeDto> = [];
//     public get companyTypes(): Array<CompanyTypeDto> {
//         return this._companyTypes;
//     }

//     public isSortedByName: boolean = false;
//     public isSortedByContact: boolean = false;
//     public isSortedByExport: boolean = false;
//     public isSortedByType: boolean = false;

//     constructor(
//         private _router: Router,
//         private _customerService: CustomerService,
//         private _confirmationService: ConfirmationService
//     ) { }

//     public async ngOnInit(): Promise<void> {
//         await this.getCompanyTypes();
//         await this.getCustomers();
//     }

//     public ngOnDestroy(): void { }

//     public onCustomerDetailsClick(customer: CustomerDto): void {
//         this._router.navigateByUrl(`/apps/ecommerce/customers/details/${customer.id}`);
//     }

//     public async onDeleteCustomer(customer: CustomerDto): Promise<void> {
//         const result = await this._confirmationService.confirm();
//         if (!result) { return; }

//         await this._customerService.delete(Number(customer.id));
//         await this.getCustomers();
//     }


//     public async getCompanyTypes(): Promise<void> {
//         console.log(this._params)
//         this._companyTypes = await this._customerService.getCompanyTypes();
//         console.log(this._companyTypes)
//     }

//     public async onPageChange(e: number): Promise<void> {
//         this._params.page = e;
//         await this.getCustomers();
//     }

//     public getCompanyType(id: number): string {
//         const type = this._companyTypes.find(t => t.id === id);
//         return type && type.name ? type.name : '-';
//     }

//     public async onSortTableByName(): Promise<void> {
//         if (this.isSortedByName) {
//             this._customersModel.data = this._customersModel.data.sort((a: any, b: any) => {
//                 if (a.name < b.name) {
//                     return -1;
//                 } else if (a.name > b.name) {
//                     return 1;
//                 } else {
//                     return 0;
//                 }
//             });
//         }
//         else {
//             this._customersModel.data = this._customersModel.data.sort((a: any, b: any) => {
//                 if (a.name > b.name) {
//                     return -1;
//                 } else if (a.name < b.name) {
//                     return 1;
//                 } else {
//                     return 0;
//                 }
//             });
//         }
//         this.isSortedByName = !this.isSortedByName;
//     }

//     public async onSortTableByContact(): Promise<void> {
//         if (this.isSortedByContact) {
//             this._customersModel.data = this._customersModel.data.sort((a: any, b: any) => {
//                 if (a.contactName < b.contactName) {
//                     return -1;
//                 } else if (a.contactName > b.contactName) {
//                     return 1;
//                 } else {
//                     return 0;
//                 }
//             });
//         }
//         else {
//             this._customersModel.data = this._customersModel.data.sort((a: any, b: any) => {
//                 if (a.contactName > b.contactName) {
//                     return -1;
//                 } else if (a.contactName < b.contactName) {
//                     return 1;
//                 } else {
//                     return 0;
//                 }
//             });
//         }
//         this.isSortedByContact = !this.isSortedByContact;
//     }

//     public async searchTriggered(e: string) {
//         this._params.search = e;
//         await this.getCustomers();
//     }
// }
