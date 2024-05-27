import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SubSink } from 'subsink';
import { DictionaryStaticListDto, TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-translation-list',
    templateUrl: './translation-list.component.html',
    styleUrls: ['./translation-list.component.scss']
})
export class TranslationListComponent implements OnInit {
    public get isLoading(): boolean {
        return this._translationService.isLoading;
    }

    private _dic: Array<DictionaryStaticListDto> = [];
    private _emptyDics: Array<DictionaryStaticListDto> = [];

    private _filteredDic: Array<DictionaryStaticListDto> = [];
    public get dic(): Array<DictionaryStaticListDto> {
        return this._filteredDic;
    }

    private _isEmptyChecked: boolean = false;
    public get isEmptyChecked(): boolean {
        return this._isEmptyChecked;
    }
    public set isEmptyChecked(v: boolean) {
        this._isEmptyChecked = v;
        this.searchTriggered(this._searchTerm);
    }

    private _subsink = new SubSink();

    constructor(
        private _router: Router,
        private _toolbarService: ToolbarService,
        private _translationService: TranslationService,
    ) {
        this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/translations/create') }));
    }

    public async ngOnInit(): Promise<void> {
        await this.getDictionary();
        this._toolbarService.isVisibleToCreate(true)

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    private async getDictionary(): Promise<void> {
        this._dic = await this._translationService.getList();
        console.log(this._dic);
        this._filteredDic = this._dic.concat([]);
        this._emptyDics = this._dic.filter(d => d.dictionary.findIndex(dd => !dd.entryValue) > -1);
        console.log(this._dic);
    }

    private _searchTerm: string = '';
    public searchTriggered(s: string): void {
        this._searchTerm = s.toLocaleLowerCase();

        this._filteredDic = (this._isEmptyChecked ? this._emptyDics : this._dic)
            .filter(d => d.entryKey?.toLocaleLowerCase().includes(this._searchTerm) || d.dictionary.findIndex(e => e.entryValue?.toLocaleLowerCase().includes(this._searchTerm)) > -1);
    }

}
