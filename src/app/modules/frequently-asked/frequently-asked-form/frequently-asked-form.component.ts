import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { SubSink } from 'subsink';
import { FrequentlyAskedService } from '../frequently-asked.service';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';

@Component({
  selector: 'app-frequently-asked-form',
  templateUrl: './frequently-asked-form.component.html',
  styleUrls: ['./frequently-asked-form.component.scss']
})
export class FrequentlyAskedFormComponent implements OnInit {

  public get isLoading(): boolean {
    return this._frequentlyAskedService.isLoading;
}


private _frequentylAskedForm = this._formBuilder.group({
    id: [0],
    question: [''],
    questionKey: [''],
    reply: [''],
    replyKey:[''],
    status:['']
});
public get frequentylAskedForm(): any {
    return this._frequentylAskedForm;
}

private _subsink = new SubSink();

private _formModel: MultilanguageEntityDto<any> | undefined = undefined;
public get formModel(): MultilanguageEntityDto<any> | undefined {
    return this._formModel;
}

private _questionTranslations: Array<TranslationEntryDto> = [];
public get questionTranslations(): Array<TranslationEntryDto> {
    return this._questionTranslations;
}
private _replyTranslations: Array<TranslationEntryDto> = [];
public get replyTranslations(): Array<TranslationEntryDto> {
    return this._replyTranslations;
}


constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: UntypedFormBuilder,
    private _frequentlyAskedService:FrequentlyAskedService
) { }

public ngOnInit(): void {
    this._subsink.add(this._route.paramMap.subscribe(async p => {
        const questionId = Number(p.get('id'));
        this._formModel = await this._frequentlyAskedService.getInstance(questionId);

        this._frequentylAskedForm.setValue({
            id:questionId,
            question: this._formModel.entity?.question,
            questionKey: this._formModel.entity.questionKey,
            reply: this._formModel.entity?.reply,
            replyKey: this._formModel.entity.replyKey,
            status:this._formModel.entity.status,
           

        });
        this._questionTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Question') : [];
        this._replyTranslations = this._formModel.translations ? this._formModel.translations.filter(t => t.property === 'Reply'): [];
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
    if (this._frequentylAskedForm.invalid || this.isLoading) { return; }
    try {
        this._formErrors = [];
        const payload = {
                data: {
                    entity: {
                       
                        ...this._frequentylAskedForm.value,
                        question: this.questionTranslations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this.questionTranslations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                        reply:this.replyTranslations?.find(item => item.language.symbol === "tr-TR")?.entryValue || this.replyTranslations?.find(item => item.language.symbol === 'en-US')?.entryValue,
                        
                      },
                translations: this._formModel ? this._formModel.translations : [] 
                }
            
        }
        await this._frequentlyAskedService.upsert(payload);
        this._router.navigateByUrl('/apps/administration/frequently-asked/list');
    } catch (error: any) {
        this._formErrors = error;
    }
}

public onTranslationEntryChange(): void {
}

}
