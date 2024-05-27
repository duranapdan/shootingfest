import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskedListComponent } from './frequently-asked-list.component';

describe('FrequentlyAskedListComponent', () => {
  let component: FrequentlyAskedListComponent;
  let fixture: ComponentFixture<FrequentlyAskedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequentlyAskedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequentlyAskedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
