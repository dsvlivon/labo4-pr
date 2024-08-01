import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoModificacionComponent } from './helado-modificacion.component';

describe('HeladoModificacionComponent', () => {
  let component: HeladoModificacionComponent;
  let fixture: ComponentFixture<HeladoModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoModificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeladoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
