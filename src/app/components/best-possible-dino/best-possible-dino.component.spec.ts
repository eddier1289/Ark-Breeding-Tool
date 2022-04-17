import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPossibleDinoComponent } from './best-possible-dino.component';

describe('BestPossibleDinoComponent', () => {
  let component: BestPossibleDinoComponent;
  let fixture: ComponentFixture<BestPossibleDinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestPossibleDinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPossibleDinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
