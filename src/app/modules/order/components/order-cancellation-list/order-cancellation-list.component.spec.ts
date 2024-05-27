import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancellationListComponent } from './order-cancellation-list.component';

describe('OrderCancellationListComponent', () => {
  let component: OrderCancellationListComponent;
  let fixture: ComponentFixture<OrderCancellationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCancellationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCancellationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
