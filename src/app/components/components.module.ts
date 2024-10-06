import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PersonajeComponent } from './personaje/personaje.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { LugaresComponent } from './lugares/lugares.component';
import { LugarComponent } from './lugar/lugar.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

@NgModule({
  declarations: [
    PersonajeComponent,
    PersonajesComponent,
    LugaresComponent,
    LugarComponent,
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PersonajeComponent,
    PersonajesComponent,
    LugaresComponent,
    LugarComponent,
    FavoritosComponent
  ]
})
export class ComponentsModule { }