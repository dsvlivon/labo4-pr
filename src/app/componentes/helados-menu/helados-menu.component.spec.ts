import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladosMenuComponent } from './helados-menu.component';

describe('HeladosMenuComponent', () => {
  let component: HeladosMenuComponent;
  let fixture: ComponentFixture<HeladosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladosMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeladosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
