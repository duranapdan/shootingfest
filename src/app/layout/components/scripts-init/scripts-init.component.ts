import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { LayoutService, LayoutType } from '../../core/layout.service';
import {
  ToggleComponent,
  ScrollTopComponent,
  DrawerComponent,
  StickyComponent,
  MenuComponent,
  ScrollComponent,
} from '../../../kt/components';
import { PageInfoService } from '../../core/page-info.service';

@Component({
  selector: 'app-scripts-init',
  templateUrl: './scripts-init.component.html',
})
export class ScriptsInitComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  private layoutConfig$!: Observable<LayoutType>;

  private pageInfoTimeout: any = undefined;
  constructor(
    private layout: LayoutService,
    private pageInfo: PageInfoService,
    private router: Router
  ) {
    const initPageInfo = () => {
      if (this.pageInfoTimeout) {
        clearTimeout(this.pageInfoTimeout);
      }

      this.pageInfoTimeout = setTimeout(() => {
        this.pageInfo.calculateTitle();
        this.pageInfo.calculateBreadcrumbs();
        clearTimeout(this.pageInfoTimeout);
        this.pageInfoTimeout = undefined;
      }, 100);
    };

    initPageInfo();
    // subscribe to router events
    this.router.events
      // .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(initPageInfo);
  }

  ngOnInit(): void {
    this.layoutConfig$ = this.layout.layoutConfigSubject.asObservable();
    const layoutUpdateSubscription = this.layoutConfig$.subscribe(() => {
      this.pluginsInitialization();
    });
    this.unsubscribe.push(layoutUpdateSubscription);
  }

  pluginsInitialization() {
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
    }, 200);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
