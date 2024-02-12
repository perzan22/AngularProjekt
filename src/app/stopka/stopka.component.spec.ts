import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopkaComponent } from './stopka.component';

describe('StopkaComponent', () => {
  let component: StopkaComponent;
  let fixture: ComponentFixture<StopkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopkaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
