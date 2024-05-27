import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancellationFormComponent } from './order-cancellation-form.component';

describe('OrderCancellationFormComponent', () => {
  let component: OrderCancellationFormComponent;
  let fixture: ComponentFixture<OrderCancellationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCancellationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCancellationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
