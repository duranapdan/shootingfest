import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { LanguageDto } from 'src/app/modules/translation/services/translation.service';
import { MultilanguageEntityRequestDto } from 'src/app/shared/models/multilanguage-entity-request.dto copy';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  
  private _isLoading = false;
  public get isLoading(): boolean {
      return this._isLoading;
  }

  constructor(private _httpClient: HttpClient, private _appService: AppService) { }

  public async getInstance(id: number): Promise<LanguageDto> {
      try {
          this._isLoading = true;

          const res = await firstValueFrom(this._httpClient.get<IDataResult<LanguageDto>>(`${this._appService.apiUrl2}/Languages/${id}`));
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


  public async getList(): Promise<PagedList<LanguageDto>> {
    try {
        this._isLoading = true;

        const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<LanguageDto>>>(`${this._appService.apiUrl2}/Languages/GetList`,{}));
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

public async upsert(model: any): Promise<LanguageDto> {
    try {
        this._isLoading = true;
        console.log(model)
        if(model.data.id == 0){
            delete model.data.id
        }
        const res = model.data.id 
        ? await firstValueFrom(this._httpClient.put<IDataResult<LanguageDto>>(`${this._appService.apiUrl2}/Languages`, model)) 
        : await firstValueFrom(this._httpClient.post<IDataResult<LanguageDto>>(`${this._appService.apiUrl2}/Languages`, model)) 
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


public async delete(languageId: number): Promise<void> {
    try {
        this._isLoading = true;
        const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/Languages`, {body : {id:languageId}}));
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
