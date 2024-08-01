import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoAltaComponent } from './helado-alta.component';

describe('HeladoAltaComponent', () => {
  let component: HeladoAltaComponent;
  let fixture: ComponentFixture<HeladoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoAltaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeladoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
