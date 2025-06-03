import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibcHomeComponent } from './cibc-home.component';

describe('CibcHomeComponent', () => {
  let component: CibcHomeComponent;
  let fixture: ComponentFixture<CibcHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CibcHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CibcHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 