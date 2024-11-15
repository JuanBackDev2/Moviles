import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferTwoPageRoutingModule } from './offer-two-routing.module';

import { OfferTwoPage } from './offer-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferTwoPageRoutingModule
  ],
  declarations: [OfferTwoPage]
})
export class OfferTwoPageModule {}
