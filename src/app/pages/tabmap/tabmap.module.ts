import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabmapPageRoutingModule } from './tabmap-routing.module';

import { TabmapPage } from './tabmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabmapPageRoutingModule
  ],
  declarations: [TabmapPage]
})
export class TabmapPageModule {}
