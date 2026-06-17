import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkoutpayment } from './checkoutpayment';

describe('Checkoutpayment', () => {
  let component: Checkoutpayment;
  let fixture: ComponentFixture<Checkoutpayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkoutpayment],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkoutpayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
