import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscModule } from 'src/app/misc/misc.module';

import { AbbonamentiComponent } from './abbonamenti.component';

describe('AbbonamentiComponent', () => {
  let component: AbbonamentiComponent;
  let fixture: ComponentFixture<AbbonamentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbbonamentiComponent ],
      imports: [
        HttpClientModule,
        MiscModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbbonamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load everything', () => {
    expect(component).toBeTruthy();
  });
});
