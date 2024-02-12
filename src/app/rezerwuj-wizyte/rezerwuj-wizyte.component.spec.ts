import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezerwujWizyteComponent } from './rezerwuj-wizyte.component';

describe('RezerwujWizyteComponent', () => {
  let component: RezerwujWizyteComponent;
  let fixture: ComponentFixture<RezerwujWizyteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezerwujWizyteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RezerwujWizyteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
