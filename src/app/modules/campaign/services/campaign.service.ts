import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { PagedList } from "src/app/models/api-paged-data-result.model";
import { CampaignDto } from "../models/campaign.dto";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";

@Injectable()
export class CampaignService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<CampaignDto>> {
      try {
          this._isLoading = true;

          const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<CampaignDto>>>(id === 0 ? `${this._appService.apiUrl2}/Campaigns/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/Campaigns/GetWithTranslation?Id=${id}`));
          if (!res.isSuccess) {
              this._isLoading = false;
              throw res.errorMessages || res.validatonErrorMessages;
          }

          this._isLoading = false;
          return res.data;
      } catch (error: any) {
          this._isLoading = false;
          throw error.message ? [error.message] : error;
      }
  }

    public async get(id: number): Promise<CampaignDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<CampaignDto>>(`${this._appService.apiUrl2}/Campaigns/${id}`));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getList(): Promise<PagedList<CampaignDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<CampaignDto>>>(`${this._appService.apiUrl2}/Campaigns/GetList?Page=0&PageSize=1000`, {}));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getListByPage(params:any): Promise<PagedList<CampaignDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<CampaignDto>>>(`${this._appService.apiUrl2}/Campaigns/GetList?Page=${params.Page}&PageSize=${params.Count}`, {}));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }
    

    public async upsert(model: any): Promise<CampaignDto> {
        try {
            this._isLoading = true;

            if(model.data.entity.id == 0){
                delete model.data.entity.id;
            }
            const res = model.data.entity.id
            ? await firstValueFrom(this._httpClient.put<IDataResult<CampaignDto>>(`${this._appService.apiUrl2}/Campaigns`, model))
            : await firstValueFrom(this._httpClient.post<IDataResult<CampaignDto>>(`${this._appService.apiUrl2}/Campaigns`, model))
           
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async delete(campaignId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/Campaigns`, {body:{id:campaignId}}));
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
}