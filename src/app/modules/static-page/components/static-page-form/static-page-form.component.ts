import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { SubSink } from 'subsink';
import { StaticPageDto, StaticPageService, StaticPageUpsertDto } from '../../services/static-page.service';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';

@Component({
    selector: 'app-static-page-form',
    templateUrl: './static-page-form.component.html',
    styleUrls: ['./static-page-form.component.scss']
})
export class StaticPageFormComponent implements OnInit {
    public get isLoading(): boolean {
        return this._staticPageService.isLoading;
    }

    private _staticPageForm = this._formBuilder.group({
        id: [0],
        url: ['', [Validators.required]],
        contentKey: ['', [Validators.required]],
        descKey: ['', [Validators.required]],
        content:[''],
        description:[''],
    });
    public get staticPageForm(): UntypedFormGroup {
        return this._staticPageForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<StaticPageUpsertDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<StaticPageUpsertDto> | undefined {
        return this._formModel;
    }

    private _descTranslations: Array<TranslationEntryDto> = [];
    public get descTranslations(): Array<TranslationEntryDto> {
        return this._descTranslations;
    }

    private _contentTranslations: Array<TranslationEntryDto> = [];
    public get contentTranslations(): Array<TranslationEntryDto> {
        return this._contentTranslations;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _staticPageService: StaticPageService

    ) { }

    public ngOnInit(): void {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const categoryId = Number(p.get('id'));
            this._formModel = await this._staticPageService.getInstance(categoryId);

            this._staticPageForm.setValue({
                id: categoryId,
                url: this._formModel.entity?.url,
                contentKey: this._formModel.entity?.contentKey,
                descKey: this._formModel.entity?.descKey,
                content:this._formModel.entity?.content,
                description:this._formModel.entity?.description,
            });

            this._descTranslations = this._formModel.translations.filter(t => t.property === 'Description');
            this._contentTranslations = this._formModel.translations.filter(t => t.property === 'Content');
            console.log(this._formModel);
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
        console.log(this._staticPageForm.value);
        if (this._staticPageForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            await this._staticPageService.upsert({
                data: {
                entity: {
                    ...this._staticPageForm.value,
                    content: this._contentTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Content")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Content")?.entryValue,
                    description: this._descTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Description")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Description")?.entryValue,
                   
                },
                translations: this._descTranslations.concat(this._contentTranslations)
                
                }
            });
            this._router.navigateByUrl('/apps/administration/static-pages/list');
        } catch (error: any) {
            this._formErrors = error;
        }
    }
}
