import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeSearchResultsComponent } from './payee-search-results.component';

describe('PayeeSearchResultsComponent', () => {
  let component: PayeeSearchResultsComponent;
  let fixture: ComponentFixture<PayeeSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayeeSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayeeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
