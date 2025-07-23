import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeAccountDetailsComponent } from './payee-account-details.component';

describe('PayeeAccountDetailsComponent', () => {
  let component: PayeeAccountDetailsComponent;
  let fixture: ComponentFixture<PayeeAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayeeAccountDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayeeAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
