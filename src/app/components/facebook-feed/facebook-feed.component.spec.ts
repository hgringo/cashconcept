import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFeedComponent } from './facebook-feed.component';

describe('FacebookFeedComponent', () => {
  let component: FacebookFeedComponent;
  let fixture: ComponentFixture<FacebookFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
