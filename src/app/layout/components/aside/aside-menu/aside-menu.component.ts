import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmStatus, SupportRequestStatus } from 'src/app/complex-types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;



  public get currentSupportRequestStatus(): SupportRequestStatus {
    var r = SupportRequestStatus.Open;
    this._route.queryParams.subscribe(async (p) => {
      r = p['status']
        ? <SupportRequestStatus>p['status']
        : SupportRequestStatus.Open;
    });
    return r;
  }

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void { }
}
