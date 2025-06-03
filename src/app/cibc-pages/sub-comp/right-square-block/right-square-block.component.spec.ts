import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSquareBlockComponent } from './right-square-block.component';

describe('RightSquareBlockComponent', () => {
  let component: RightSquareBlockComponent;
  let fixture: ComponentFixture<RightSquareBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSquareBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSquareBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
