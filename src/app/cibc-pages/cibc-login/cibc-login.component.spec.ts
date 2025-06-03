import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibcLoginComponent } from './cibc-login.component';

describe('CibcLoginComponent', () => {
  let component: CibcLoginComponent;
  let fixture: ComponentFixture<CibcLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CibcLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CibcLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 