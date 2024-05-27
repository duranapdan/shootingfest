import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { environment } from "src/environments/environment";
import { CategoryDto, CategoryUpsertDto } from "../models/category.dto";
import { MultilanguageEntityRequestDto } from "src/app/shared/models/multilanguage-entity-request.dto copy";
import { PagedList } from "src/app/models/api-paged-data-result.model";

@Injectable()
export class CategoryService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<CategoryDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<CategoryDto>>>(id === 0 ? `${this._appService.apiUrl2}/Categories/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/Categories/GetWithTranslation?Id=${id}`));
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

    /*  public async getList(filter : any): Promise<PagedList<CategoryDto>> {
         try {
             this._isLoading = true;
 
             const res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<CategoryDto>>>(`${this._appService.apiUrl2}/sers/GetList`, filter));
 
             this._isLoading = false;
             return res.data;
         } catch (error: any) {
             this._isLoading = false;
             throw error.message ? [error.message] : error;
         }
     }
  */
    /*  public async getListByPage(params: any, filter: any): Promise<PagedList<CategoryDto>> {
         try {
             this._isLoading = true;
 
             const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<CategoryDto>>>(`${this._appService.apiUrl2}/Categories/GetList?Page=${params.Page}&PageSize=${params.Count}`, filter));
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
     } */

    public async upsert(model: MultilanguageEntityRequestDto<CategoryDto>): Promise<CategoryDto> {
        try {
            this._isLoading = true;
            if (model.data.entity.id === 0) {
                delete model.data.entity.id;
            }
            const res = model.data.entity.id
                ? await firstValueFrom(this._httpClient.put<IDataResult<CategoryDto>>(`${this._appService.apiUrl2}/Categories`, model))
                : await firstValueFrom(this._httpClient.post<IDataResult<CategoryDto>>(`${this._appService.apiUrl2}/Categories`, model))
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

    public async delete(categoryId: number): Promise<any> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/Categories`, { body: { id: categoryId } }));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            return res
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }
}