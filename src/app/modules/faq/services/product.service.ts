import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { PagedList } from "src/app/models/api-paged-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { ProductDetailDto } from "../models/product-detail.dto";
import { ProductForListDto } from "../models/product-for-list.dto";
import { ProductTypeDto } from "../models/product-type.dto";

@Injectable()
export class ProductService {
    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async get(id: number): Promise<ProductDetailDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<ProductDetailDto>>(`${this._appService.apiUrl}/Faqs/${id}`));
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

    public async getList(params: any, filter: any): Promise<PagedList<ProductForListDto>> {
        try {
            this._isLoading = true;
            let res: any
            res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<ProductForListDto>>>(`${this._appService.apiUrl2}/Faqs/GetList?PageIndex=${params.Page}&PageSize=${params.Count}`, filter));
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


    public async getListByRelations(filter: any): Promise<PagedList<ProductForListDto>> {
        try {
            this._isLoading = true;
            let res: any
            res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ProductForListDto>>>('http://alialpayapi.technofaceapps.com/api/ProductCategories/GetList', filter));
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


    public async getListForPromotions(): Promise<PagedList<ProductDetailDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ProductDetailDto>>>(`${this._appService.apiUrl2}/Products/getList`, {}));
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

    public async getInstance(id: string): Promise<ProductDetailDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<ProductDetailDto>>(`${this._appService.apiUrl2}/Faqs/${id}`));
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

    public async upsert(model: ProductDetailDto): Promise<void> {
        let sendedModel = {};
        console.log('model :>> ', model);
        if (model.id) {
            sendedModel = {
                id: model.id,
                questionText: model.questionText,
                answerText: model.answerText,
                faqOrder: model.faqOrder,
                userId: model.id,
            }
        } else {
            sendedModel = {
                questionText: model.questionText,
                answerText: model.answerText,
                faqOrder: model.faqOrder,
                userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            }

        }
        try {
            this._isLoading = true;

            const res = model.id
                ? await firstValueFrom(this._httpClient.put<IDataResult<ProductDetailDto>>(`${this._appService.apiUrl2}/Faqs`, sendedModel))
                : await firstValueFrom(this._httpClient.post<IDataResult<ProductDetailDto>>(`${this._appService.apiUrl2}/Faqs`, sendedModel))
            // const res = await firstValueFrom(this._httpClient.put<IDataResult<MultilanguageEntityRequestDto<ProductUpsertDto>>>(`${this._appService.apiUrl2}/Products`, model));
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
            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/Faqs/${productId}`));
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

    public async syncPrices(): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductPrices`));
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

    public async syncTranslations(): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductAllTranslations`));
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

    public async syncNewProducts(): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProducts`));
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

    public async triggerUpdateStock(id: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductStockById?id=${id}`));
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

    public async triggerUpdateTranslations(id: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductTranslationById?id=${id}`));
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

    public async triggerUpdateProduct(id: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductById?id=${id}`));
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


    public async getProductTypeList(): Promise<PagedList<ProductTypeDto>> {
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
