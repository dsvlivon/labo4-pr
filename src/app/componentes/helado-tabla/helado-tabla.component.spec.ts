import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoTablaComponent } from './helado-tabla.component';

describe('HeladoTablaComponent', () => {
  let component: HeladoTablaComponent;
  let fixture: ComponentFixture<HeladoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeladoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
