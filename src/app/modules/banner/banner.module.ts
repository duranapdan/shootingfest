
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerRoutingModule } from './banner-routing.module';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerFormComponent } from './components/banner-form/banner-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BannerService } from './services/banner.sevice';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        BannerListComponent,
        BannerFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        BannerRoutingModule,
        NgbModule
    ],
    providers: [BannerService],
})
export class BannerModule { }