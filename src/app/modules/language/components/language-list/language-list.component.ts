import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { LanguageService } from '../services/language.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { LanguageDto } from 'src/app/modules/translation/services/translation.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {

  public get isLoading(): boolean {
    return this._languageService.isLoading;
  }

  private _languages: PagedList<LanguageDto> = { page: 0, count: 12 };
  public get languages(): PagedList<LanguageDto> {
    return this._languages;
  }
  private _subsink = new SubSink();
  constructor(
    private _router: Router,
    private _toolbarService: ToolbarService,
    private _languageService: LanguageService,
    private _confirmationService: ConfirmationService
  ) { this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/languages/create') })); }



  async ngOnInit(): Promise<void> {
    await this.getLanguages()
    this._toolbarService.isVisibleToCreate(false)

  }

  private async getLanguages(): Promise<void> {
    this._languages = await this._languageService.getList();

    console.log(this._languages);
}

public onEditLanguageClick(language: LanguageDto): void {
  this._router.navigateByUrl(`/apps/administration/languages/edit/${language.id}`);
}

public async onDeleteLanguage(language: LanguageDto): Promise<void> {
  try {
      const result = await this._confirmationService.confirm();
      if (!result) { return; }

      await this._languageService.delete(Number(language.id));
      await this.getLanguages();
  } catch (error: any) {
      alert(error.join('\n'));
  }
}


}
