import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoBajaComponent } from './helado-baja.component';

describe('HeladoBajaComponent', () => {
  let component: HeladoBajaComponent;
  let fixture: ComponentFixture<HeladoBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoBajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeladoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
