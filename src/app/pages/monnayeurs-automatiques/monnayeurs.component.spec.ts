import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonnayeursComponent } from './monnayeurs.component';

describe('MonnayeursComponent', () => {
  let component: MonnayeursComponent;
  let fixture: ComponentFixture<MonnayeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonnayeursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonnayeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
