import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankInfoListComponent } from './components/bank-info-list/bank-info-list.component';
import { BankInfoRoutingModule } from './bank-info-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { BankInfoFormComponent } from './components/bank-info-form/bank-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        BankInfoListComponent,
        BankInfoFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PipesModule,
        TranslateModule,
        BankInfoRoutingModule
    ],
    exports: [],
    providers: [],
})
export class BankInfoModule { }