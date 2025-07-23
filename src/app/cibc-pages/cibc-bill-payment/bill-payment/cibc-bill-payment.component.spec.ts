import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibcBillPaymentComponent } from './cibc-bill-payment.component';

describe('CibcBillPaymentComponent', () => {
  let component: CibcBillPaymentComponent;
  let fixture: ComponentFixture<CibcBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CibcBillPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CibcBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
