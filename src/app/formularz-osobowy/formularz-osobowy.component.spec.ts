import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularzOsobowyComponent } from './formularz-osobowy.component';

describe('FormularzOsobowyComponent', () => {
  let component: FormularzOsobowyComponent;
  let fixture: ComponentFixture<FormularzOsobowyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularzOsobowyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularzOsobowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
