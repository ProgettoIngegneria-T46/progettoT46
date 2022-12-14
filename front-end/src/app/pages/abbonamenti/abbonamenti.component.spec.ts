import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbonamentiComponent } from './abbonamenti.component';

describe('AbbonamentiComponent', () => {
  let component: AbbonamentiComponent;
  let fixture: ComponentFixture<AbbonamentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbbonamentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbbonamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
