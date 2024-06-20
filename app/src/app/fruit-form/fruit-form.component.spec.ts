import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitFormComponent } from './fruit-form.component';

describe('FruitFormComponent', () => {
  let component: FruitFormComponent;
  let fixture: ComponentFixture<FruitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FruitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FruitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
