import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinoStatsComponent } from './dino-stats.component';

describe('DinoStatsComponent', () => {
  let component: DinoStatsComponent;
  let fixture: ComponentFixture<DinoStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinoStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinoStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
