import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  private _localPersonajes: any[] = [];
  private personajesSubject = new BehaviorSubject<any[]>([]);  // Holds the current state of personajes[]
  personajes$ = this.personajesSubject.asObservable();  // Observable to subscribe to

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();

  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  get getLocalPersonajes() {
    return [ ...this._localPersonajes ]
  }

  async loadFavorites() {
    try {
      
      const personajes = await this._storage?.get('personajes');
      this._localPersonajes = personajes || [];

    } catch (error) {
      
    }

  }

  public personajeInFavorites( personaje: any ) {
    return !!this._localPersonajes.find( localPersonaje => localPersonaje.id === personaje.id );
  }

  async saveRemovePersonaje( personaje: any ) {
    const exists = this._localPersonajes.find( localPersonaje => localPersonaje.id === personaje.id );

    if ( exists ) {
      this._localPersonajes = this._localPersonajes.filter( localPersonaje => localPersonaje.id !== personaje.id );
    } else {
      this._localPersonajes = [ personaje, ...this._localPersonajes];
    }

    await this._storage?.set('personajes', this._localPersonajes );
    console.log(this._localPersonajes)
    this.personajesSubject.next(this._localPersonajes);  // Notify subscribers about the change
  }

}
