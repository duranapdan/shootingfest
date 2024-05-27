import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { SubSink } from 'subsink';
import { LanguageDto } from 'src/app/modules/translation/services/translation.service';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss'],
  providers: [ApiUrlPipe]
})
export class LanguageFormComponent implements OnInit {

  public get isLoading(): boolean {
    return this._languageService.isLoading;
}


private _languageForm = this._formBuilder.group({
    id:[0],
    name: ['',[Validators.required]],
    symbol: ['',[Validators.required]],
    flag: [[]]
});
public get languageForm(): UntypedFormGroup {
    return this._languageForm;
}

private _subsink = new SubSink();

private _formModel: LanguageDto | undefined = undefined;
public get formModel(): LanguageDto | undefined {
    return this._formModel;
}
  constructor(   private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: UntypedFormBuilder,
    private _languageService: LanguageService,
    private _apiUrlPipe: ApiUrlPipe) { }

  ngOnInit(): void {
    this._subsink.add(this._route.paramMap.subscribe(async p => {
      const languageId = Number(p.get('id'));
      if(languageId){
        this._formModel = await this._languageService.getInstance(languageId);
        console.log(this._formModel)

      this._languageForm.setValue({
          id:languageId,
          name: this._formModel?.name,
          symbol: this._formModel?.symbol,
          flag:this._formModel?.symbol,
      });
      }

      

      console.log(this._languageForm.value);
  }));
  }
  public ngOnDestroy(): void {
    this._subsink.unsubscribe();
}

private _formErrors: Array<string> = [];
public get formErrors(): Array<string> {
    return this._formErrors;
}

public async onSaveClick(): Promise<void> {
  if (this._languageForm.invalid || this.isLoading) { return; }
  try {
      this._formErrors = [];
      const payload = {
              data: {
              ...this._languageForm.value,
              flag: this._languageForm?.value.symbol,
              }
          
      }
      await this._languageService.upsert(payload);
      this._router.navigateByUrl('/apps/administration/languages/list');
  } catch (error: any) {
      this._formErrors = error;
  }
}

}
