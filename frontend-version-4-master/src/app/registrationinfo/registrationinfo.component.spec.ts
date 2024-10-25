import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationinfoComponent } from './registrationinfo.component';

describe('RegistrationinfoComponent', () => {
  let component: RegistrationinfoComponent;
  let fixture: ComponentFixture<RegistrationinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
