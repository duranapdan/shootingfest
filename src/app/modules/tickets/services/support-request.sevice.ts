import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SupportRequestStatus } from 'src/app/complex-types';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { environment } from 'src/environments/environment';
import {
  SupportRequestDto,
  SupportRequestTypeDto,
  AnswerSupportRequestDto,
} from '../models/support-request.dto';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { MultilanguageEntityRequestDto } from 'src/app/shared/models/multilanguage-entity-request.dto copy';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';

@Injectable()
export class SupportRequestService {
  private _isLoading = false;
  public get isLoading(): boolean {
    return this._isLoading;
  }

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService
  ) {}

  public async getInstance(id: number): Promise<SupportRequestDto> {
    try {
      this._isLoading = true;

      const res = await firstValueFrom(
        this._httpClient.get<IDataResult<SupportRequestDto>>(
          `${this._appService.apiUrl2}/SupportRequest/${id}`
        )
      );
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

  public async getList(supportStatus: number): Promise<PagedList<SupportRequestDto>> {
    try {
      this._isLoading = true;
      const payload = {
        filter: {
          field: "supportStatus",
          operator: "eq",
          value: supportStatus.toString(),
        }
      }
      const res = await firstValueFrom(
        this._httpClient.post<IDataResult<PagedList<SupportRequestDto>>>(
          `${this._appService.apiUrl2}/SupportRequest/GetList?Page=0&PageSize=1000`, payload
        )
      );
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

  public async getListByPage(supportStatus: number , params:any): Promise<PagedList<SupportRequestDto>> {
    try {
      this._isLoading = true;
      const payload = {
        filter: {
          field: "supportStatus",
          operator: "eq",
          value: supportStatus.toString(),
        }
      }
      const res = await firstValueFrom(
        this._httpClient.post<IDataResult<PagedList<SupportRequestDto>>>(
          `${this._appService.apiUrl2}/SupportRequest/GetList?Page=${params.Page}&PageSize=${params.Count}`, payload
        )
      );
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

  public async upsert(
    model: AnswerSupportRequestDto
  ): Promise<AnswerSupportRequestDto> {
    try {
      this._isLoading = true;
      const payload = {
        data: {
          ...model
        }
      }
      const res = await firstValueFrom(
        this._httpClient.put<IDataResult<AnswerSupportRequestDto>>(
          `${this._appService.apiUrl2}/SupportRequest/Answer`,
          payload
        )
      );
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

  public async getTicketTypes(): Promise<any> {
    const res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<any>>>(`${this._appService.apiUrl2}/SupportRequestTypes`));
    return res.data;
}

public async getInstanceTicketType(id: number): Promise<MultilanguageEntityDto<any>> {
    try {
        this._isLoading = true;

        const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(id === 0 ? `${this._appService.apiUrl2}/SupportRequestTypes/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/SupportRequestTypes/GetWithTranslation?Id=${id}`));
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

public async upsertTicketType(model: MultilanguageEntityRequestDto<any>): Promise<any> {
    try {
        this._isLoading = true;
            if(model.data.entity.id == 0){
                delete model.data.entity.id;
            }
            const res = model.data.entity.id
            ? await firstValueFrom(this._httpClient.put<IDataResult<any>>(`${this._appService.apiUrl2}/SupportRequestTypes`, model))
            : await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl2}/SupportRequestTypes`, model))
       
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

public async deleteCancellationType(data: any):  Promise<void> {

        try {
            this._isLoading = true;
            const payload: any =  {
                id:data
            }
            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/SupportRequestTypes`,{ body: payload}));
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
