import { Component, OnInit } from '@angular/core';
import { FrequentlyAskedService } from '../frequently-asked.service';
import { ToolbarService } from 'src/app/layout/core/toolbar.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';

@Component({
  selector: 'app-frequently-asked-list',
  templateUrl: './frequently-asked-list.component.html',
  styleUrls: ['./frequently-asked-list.component.scss']
})
export class FrequentlyAskedListComponent implements OnInit {

  public get isLoading(): boolean {
    return this._frequentlyAskedService.isLoading;
}

private _frequentlyAsked: Array<any> = [];
public get frequentlyAsked(): Array<any> {
    return this._frequentlyAsked;
}

private _subsink = new SubSink();

constructor(
    private _router: Router,
    private _toolbarService: ToolbarService,
    private _frequentlyAskedService: FrequentlyAskedService,
    private _confirmationService: ConfirmationService
) {
    this._subsink.add(this._toolbarService.create.subscribe(() => { this._router.navigateByUrl('/apps/administration/frequently-asked/create') }));
}

public async ngOnInit(): Promise<void> {
    // this._subBrands = await this._brandService.getAllSubBrands();
    await this.getOrderCancellations();
    this._toolbarService.isVisibleToCreate(true)

}

public ngOnDestroy(): void {
    this._subsink.unsubscribe();
}

public onEditQuestionClick(question: any): void {
    this._router.navigateByUrl(`/apps/administration/frequently-asked/edit/${question.id}`);
}

public async onDeleteQuestion(question: any): Promise<void> {
    try {
        const result = await this._confirmationService.confirm();
        if (!result) { return; }

        await this._frequentlyAskedService.delete(Number(question.id));
        await this.getOrderCancellations();
    } catch (error: any) {
        alert(error.join('\n'));
    }
}

private async getOrderCancellations(): Promise<void> {
  let orderCancellationResponse = await this._frequentlyAskedService.getList();
  this._frequentlyAsked = orderCancellationResponse.items
}

getBrandNameByFind(id: number) {
    return this._frequentlyAsked.find(x => x.id === id)?.name;
}

}
