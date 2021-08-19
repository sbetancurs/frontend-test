import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeCardComponent } from './heroe-card.component';

describe('HeroeCardComponent', () => {
  let component: HeroeCardComponent;
  let fixture: ComponentFixture<HeroeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
