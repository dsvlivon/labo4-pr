import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepaisComponent } from './detallepais.component';

describe('DetallepaisComponent', () => {
  let component: DetallepaisComponent;
  let fixture: ComponentFixture<DetallepaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallepaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallepaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
