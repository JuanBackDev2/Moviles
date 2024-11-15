import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferTwoPage } from './offer-two.page';

describe('OfferTwoPage', () => {
  let component: OfferTwoPage;
  let fixture: ComponentFixture<OfferTwoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
