import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpisBarberComponent } from './opis-barber.component';

describe('OpisBarberComponent', () => {
  let component: OpisBarberComponent;
  let fixture: ComponentFixture<OpisBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpisBarberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpisBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
