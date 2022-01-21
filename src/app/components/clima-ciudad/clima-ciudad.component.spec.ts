import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaCiudadComponent } from './clima-ciudad.component';

describe('ClimaCiudadComponent', () => {
  let component: ClimaCiudadComponent;
  let fixture: ComponentFixture<ClimaCiudadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimaCiudadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
