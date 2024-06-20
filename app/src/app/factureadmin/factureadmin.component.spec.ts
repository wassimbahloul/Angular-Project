import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureadminComponent } from './factureadmin.component';

describe('FactureadminComponent', () => {
  let component: FactureadminComponent;
  let fixture: ComponentFixture<FactureadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactureadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
