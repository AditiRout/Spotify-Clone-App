import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule for Angular Material Card
import { AboutusComponent } from './aboutus.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import for handling animations

describe('AboutusComponent', () => {
  let component: AboutusComponent;
  let fixture: ComponentFixture<AboutusComponent>;

  // Asynchronous setup for TestBed to compile components
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusComponent ],  // Declare the component to be tested
      imports: [
        MatCardModule,  // Add MatCardModule to handle <mat-card>
        NoopAnimationsModule  // Needed if animations are used in the component
      ]
    }).compileComponents();  // Compile the component and template
  });

  // Synchronous setup to create the component instance
  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusComponent);  // Create instance of component
    component = fixture.componentInstance;  // Assign component instance
    fixture.detectChanges();  // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Test if component is created
  });
});
