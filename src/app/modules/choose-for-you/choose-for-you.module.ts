import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseForYouRoutingModule } from './choose-for-you-routing.module';
import { ChooseForYouListComponent } from './components/choose-for-you-list/choose-for-you-list.component';
import { ChooseForYouFormComponent } from './components/choose-for-you-form/choose-for-you-form.component';
import { ChooseForYouService } from './services/choose-for-you.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        ChooseForYouListComponent,
        ChooseForYouFormComponent
    ],
    providers: [ChooseForYouService],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        ChooseForYouRoutingModule,
        PipesModule
    ]
})
export class ChooseForYouModule { }