import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegumeFormComponent } from './legume-form.component';

describe('LegumeFormComponent', () => {
  let component: LegumeFormComponent;
  let fixture: ComponentFixture<LegumeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegumeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegumeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
