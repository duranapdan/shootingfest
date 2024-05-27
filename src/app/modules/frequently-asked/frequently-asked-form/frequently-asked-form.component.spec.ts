import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskedFormComponent } from './frequently-asked-form.component';

describe('FrequentlyAskedFormComponent', () => {
  let component: FrequentlyAskedFormComponent;
  let fixture: ComponentFixture<FrequentlyAskedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequentlyAskedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequentlyAskedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
