import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaContactComponent } from './cta-contact.component';

describe('CtaContactComponent', () => {
  let component: CtaContactComponent;
  let fixture: ComponentFixture<CtaContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
