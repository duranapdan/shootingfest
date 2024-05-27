import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { MultilanguageEntityRequestDto } from 'src/app/shared/models/multilanguage-entity-request.dto copy';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';

@Injectable({
  providedIn: 'root'
})
export class FrequentlyAskedService {

 
  private _isLoading = false;
  public get isLoading(): boolean {
      return this._isLoading;
  }

  constructor(private _httpClient: HttpClient, private _appService: AppService) { }

  public async getInstance(id: number): Promise<MultilanguageEntityDto<any>> {
      try {
          this._isLoading = true;

          const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(id === 0 ? `${this._appService.apiUrl2}/FrequentlyAskedQuestion/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/FrequentlyAskedQuestion/GetWithTranslation?Id=${id}`));
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

  public async getList(): Promise<any> {
      try {
          this._isLoading = true;

          const res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<any>>>(`${this._appService.apiUrl2}/FrequentlyAskedQuestion/`));
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

  
  

  public async upsert(model: MultilanguageEntityRequestDto<any>): Promise<any> {
      try {
          this._isLoading = true;
              if(model.data.entity.id == 0){
                  delete model.data.entity.id;
              }
              const res = model.data.entity.id
              ? await firstValueFrom(this._httpClient.put<IDataResult<any>>(`${this._appService.apiUrl2}/FrequentlyAskedQuestion`, model))
              : await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl2}/FrequentlyAskedQuestion`, model))
         
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

  public async delete(brandId: number): Promise<void> {
      try {
          this._isLoading = true;
          const payload: any =  {
              id:brandId
          }
          const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/FrequentlyAskedQuestion`,{ body: payload}));
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
