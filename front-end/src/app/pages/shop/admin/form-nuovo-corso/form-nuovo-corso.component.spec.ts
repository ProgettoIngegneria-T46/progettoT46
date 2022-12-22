import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNuovoCorsoComponent } from './form-nuovo-corso.component';

describe('FormNuovoCorsoComponent', () => {
  let component: FormNuovoCorsoComponent;
  let fixture: ComponentFixture<FormNuovoCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNuovoCorsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNuovoCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
