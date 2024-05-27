import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrequentlyAskedListComponent } from './frequently-asked-list/frequently-asked-list.component';
import { FrequentlyAskedFormComponent } from './frequently-asked-form/frequently-asked-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FrequentlyAskedRoutingModule } from './frequently-asked-routing.module';



@NgModule({
  declarations: [
    FrequentlyAskedListComponent,
    FrequentlyAskedFormComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule,
    NgbModule,
    PipesModule,
    ReactiveFormsModule,
    TranslateModule,
    FrequentlyAskedRoutingModule
  ]
})
export class FrequentlyAskedModule { }
