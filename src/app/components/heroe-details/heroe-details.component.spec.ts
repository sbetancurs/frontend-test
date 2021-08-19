import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeDetailsComponent } from './heroe-details.component';

describe('HeroeDetailsComponent', () => {
  let component: HeroeDetailsComponent;
  let fixture: ComponentFixture<HeroeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
