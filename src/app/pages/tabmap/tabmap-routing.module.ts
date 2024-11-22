import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabmapPage } from './tabmap.page';

const routes: Routes = [
  {
    path: '',
    component: TabmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabmapPageRoutingModule {}
