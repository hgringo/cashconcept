import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleComparatorComponent } from './collapsible-comparator.component';

describe('CollapsibleComparatorComponent', () => {
  let component: CollapsibleComparatorComponent;
  let fixture: ComponentFixture<CollapsibleComparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsibleComparatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsibleComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
