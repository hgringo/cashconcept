import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingComponent } from './financing.component';

describe('FinancingComponent', () => {
  let component: FinancingComponent;
  let fixture: ComponentFixture<FinancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
