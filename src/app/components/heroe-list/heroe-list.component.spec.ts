import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeListComponent } from './heroe-list.component';

describe('HeroeListComponent', () => {
  let component: HeroeListComponent;
  let fixture: ComponentFixture<HeroeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
