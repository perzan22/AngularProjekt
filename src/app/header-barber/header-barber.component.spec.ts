import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarberComponent } from './header-barber.component';

describe('HeaderBarberComponent', () => {
  let component: HeaderBarberComponent;
  let fixture: ComponentFixture<HeaderBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderBarberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
