import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightRectBlockComponent } from './right-rect-block.component';

describe('RightRectBlockComponent', () => {
  let component: RightRectBlockComponent;
  let fixture: ComponentFixture<RightRectBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightRectBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightRectBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
