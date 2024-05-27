import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { ToolbarService } from '../../core/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true })
  ktPageTitle!: ElementRef;
  pageTitleAttributes!: {
    [attrName: string]: string | boolean;
  };
  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';

  public get isCreateVisible(): boolean {
    return this._toolbarService.isCreateVisible;
  }

  public get isVisible():boolean{
    return this._toolbarService.isVisible; 
}

  constructor(private _layout: LayoutService, private _toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarContainerCssClasses =
      this._layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this._layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this._layout.getHTMLAttributes('pageTitle');
  }

  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  onCreateClick() {
    this._toolbarService.create.emit();
  }
}
