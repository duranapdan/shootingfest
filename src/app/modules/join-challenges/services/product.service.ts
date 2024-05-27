import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { PagedList } from "src/app/models/api-paged-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { JoinChallengesDto } from "../models/join-challenge-detail.dto";
import { ProductForListDto } from "../models/product-for-list.dto";
import { ProductUpsertDto } from "../models/product-upsert.dto";
import { ProductDto } from "../models/product.dto";
import { ProductTypeDto } from "../models/product-type.dto";
import { MultilanguageEntityRequestDto } from "src/app/shared/models/multilanguage-entity-request.dto copy";
import { JoinChangesPost } from "../models/join-changes-post.dto";

@Injectable()
export class ProductService {
    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async get(id: number): Promise<JoinChallengesDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<JoinChallengesDto>>(`${this._appService.apiUrl}/JoinChallenges/${id}`));
            if (!res.success) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getList(params: any): Promise<PagedList<JoinChallengesDto>> {
        try {
            this._isLoading = true;
            let res: any
            res = await firstValueFrom(this._httpClient.get<IDataResult<JoinChallengesDto>>(`${this._appService.apiUrl2}/JoinChallenges/GetListVideoRating/?PageIndex=${params.Page}&PageSize=${params.Count}`));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            console.log(res)
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }


    public async getListByRelations(): Promise<PagedList<ProductForListDto>> {
        try {
            this._isLoading = true;
            let res: any


            res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<ProductForListDto>>>(`${this._appService.apiUrl2}/JoinChallenges/GetListVideoRating`));

            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            console.log(res)
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }


    public async getListForPromotions(): Promise<PagedList<ProductForListDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ProductForListDto>>>(`${this._appService.apiUrl2}/users/getList`, {}));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getInstance(id: string): Promise<JoinChallengesDto> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.get<IDataResult<JoinChallengesDto>>(`${this._appService.apiUrl2}/JoinChallenges/${id}`));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            return res.data;

        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async upsert(model: JoinChangesPost): Promise<void> {
        try {
            this._isLoading = true;
            if (model?.userChallengeId == "") {
                return;
            }
            const res = await firstValueFrom(this._httpClient.post<IDataResult<JoinChangesPost>>(`${this._appService.apiUrl2}/UserScores/CreateUserScore `, model))
            // const res = await firstValueFrom(this._httpClient.put<IDataResult<MultilanguageEntityRequestDto<JoinChangesPost>>>(`${this._appService.apiUrl2}/Products`, model));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async delete(productId: string): Promise<void> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/JoinChallenges/${productId}`));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async triggerUpdateProductPrices(id: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductPriceById?id=${id}`));
            if (!res.success) {
                this._isLoading = false;
                alert(res.errorMessages.concat(res.validatonErrorMessages)[0]);
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
        } catch (error: any) {
            this._isLoading = false;

            alert(error.error.ErrorMessages[0] ? [error.error.ErrorMessages[0]] : error.message ? [error.message] : error);
            throw error.message ? [error.message] : error;
        }
    }

    public async syncStocks(): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductStocks`));
            if (!res.success) {
                this._isLoading = false;
                alert(res.errorMessages.concat(res.validatonErrorMessages)[0]);
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
        } catch (error: any) {
            this._isLoading = false;
            alert(error.error.ErrorMessages[0] ? [error.error.ErrorMessages[0]] : error.message ? [error.message] : error);
            throw error.message ? [error.message] : error;
        }
    }

    public async getCompanyTypeList(): Promise<any> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl}/CompanyType`));
            if (!res.success) {
                this._isLoading = false;
                alert(res.errorMessages.concat(res.validatonErrorMessages)[0]);
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            alert(error.error.ErrorMessages[0] ? [error.error.ErrorMessages[0]] : error.message ? [error.message] : error);
            throw error.message ? [error.message] : error;
        }
    }


    /*   public async getProductTypeList(): Promise<PagedList<ProductTypeDto>> {
          try {
              this._isLoading = true;
  
              const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ProductTypeDto>>>(`${this._appService.apiUrl2}/ProductTypes/GetList`, {}));
  
              if (!res.isSuccess) {
                  this._isLoading = false;
                  alert(res.errorMessages.concat(res.validatonErrorMessages)[0]);
                  throw res.errorMessages.concat(res.validatonErrorMessages);
              }
  
              else {
                  this._isLoading = false;
                  return res.data;
              }
  
          } catch (error: any) {
              this._isLoading = false;
              alert(error.error.ErrorMessages[0] ? [error.error.ErrorMessages[0]] : error.message ? [error.message] : error);
              throw error.message ? [error.message] : error;
          }
      }
   */
    public async deleteProductCompany(productId: number, companyTypeId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl}/ProductCompanyType/DeleteByProductId?productId=${productId}&companyTypeId=${companyTypeId}`));
            if (!res.success) {
                this._isLoading = false;
                alert(res.errorMessages.concat(res.validatonErrorMessages)[0]);
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
        } catch (error: any) {
            console.log(error);
            this._isLoading = false;
            alert(error.error.ErrorMessages[0] ? [error.error.ErrorMessages[0]] : error.message ? [error.message] : error);
            throw error.message ? [error.message] : error;
        }
    }


    public async addProductCompany(model: any): Promise<any> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl}/ProductCompanyType`, model));
            if (!res.success) {
                this._isLoading = false;
                alert(res.errorMessages.concat(res.validatonErrorMessages)[0]);
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

}
