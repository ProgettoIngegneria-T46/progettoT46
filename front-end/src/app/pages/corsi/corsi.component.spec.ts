import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscModule } from 'src/app/misc/misc.module';

import { CorsiComponent } from './corsi.component';

describe('CorsiComponent', () => {
  let component: CorsiComponent;
  let fixture: ComponentFixture<CorsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorsiComponent ],
      imports: [
        HttpClientModule,
        MiscModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render everything', () => {
    expect(component).toBeTruthy();
  });
});
