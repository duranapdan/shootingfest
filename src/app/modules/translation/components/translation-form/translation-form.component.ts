import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { DictionaryStaticListDto, LanguageDto, TranslationService } from '../../services/translation.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { LanguageService } from 'src/app/modules/language/components/services/language.service';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
    selector: 'app-translation-form',
    templateUrl: './translation-form.component.html',
    styleUrls: ['./translation-form.component.scss']
})
export class TranslationFormComponent implements OnInit {
    public get isLoading(): boolean {
        return this._translationService.isLoading;
    }

    private _subsink = new SubSink();

    private _formModel: DictionaryStaticListDto | undefined = undefined;
    public get formModel(): DictionaryStaticListDto | undefined {
        return this._formModel;
    }

    private _languages: PagedList<LanguageDto> = {page:0 , count:12};

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _translationService: TranslationService,
        private _languageService:LanguageService,
        private _toolbarService:ToolbarService
    ) { }

    private _mode: 'edit' | 'create' = 'edit';
    public get mode(): 'edit' | 'create' {
        return this._mode;
    }

    public async ngOnInit(): Promise<void> {
        this._languages = await this._languageService.getList();

        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const key = p.get('key');

            if (key) {
                this._formModel = await this._translationService.get(key);
                this._mode = 'edit';
            } else {
                this._formModel = {
               
                    entryKey: '',
                    dictionary: this._languages?.items!.map((l: { id: any; symbol: any; }) => {
                        return {
                            id: 0,
                            entryValue: '',
                            languageId: l.id,
                            languageSymbol: l.symbol
                        }
                    })
                
                };
                this._mode = 'create';
            }
        }));
        this._toolbarService.isVisibleToCreate(false)

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    public async onSaveClick(): Promise<void> {
        if (!this._formModel || this.isLoading) { return; }
        try {
            this._formErrors = [];
            await this._translationService.upsert(this._formModel);
            this._router.navigateByUrl('/apps/administration/translations/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }
}
