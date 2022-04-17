import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinoBreedingComponent } from './dino-breeding.component';

describe('DinoBreedingComponent', () => {
  let component: DinoBreedingComponent;
  let fixture: ComponentFixture<DinoBreedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinoBreedingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinoBreedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
