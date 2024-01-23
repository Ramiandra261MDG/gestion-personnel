import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInactiveComponent } from './personal-inactive.component';

describe('PersonalInactiveComponent', () => {
  let component: PersonalInactiveComponent;
  let fixture: ComponentFixture<PersonalInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
