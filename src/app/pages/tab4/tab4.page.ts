import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as L from 'leaflet';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {
  imageUri: string | undefined;
  isSupported = false;
  barcodes: Barcode[] = [];
  coordinates:Position[] = [];
  isModuleAvailable = false;
  qrs:any = [];
  private map!: L.Map;
  username: string | null = null;

  constructor(private alertController: AlertController, private storageService:StorageService, private bd: RickyMortyBdService,private router:Router, private dbservice:DbserviceService, private authService: AuthService) {}

  async ngOnInit() {

    this.authService.username$.subscribe((name) => {
      this.username = name;
    });

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    this.checkModuleAvailability(); // Check for module availability
    /*
    this.storageService.qrs$.subscribe((qrs) => {
      this.qrs = qrs;
    });
    */
   (await this.dbservice.getCapturados()).subscribe((qrs)=>{
    this.qrs = qrs
   });
  }

  async checkModuleAvailability(): Promise<void> {
    const result = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    this.isModuleAvailable = result.available;

    if (!this.isModuleAvailable) {
      console.error('Google Barcode Scanner Module is not available. Attempting to install it...');
      await this.installBarcodeScannerModule(); // Attempt to install the module
    }
  }

  async installBarcodeScannerModule(): Promise<void> {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log('Google Barcode Scanner Module installed successfully.');
      this.isModuleAvailable = true; // Update the status
    } catch (error) {
      console.error('Failed to install Google Barcode Scanner Module:', error);
    }
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    if (!this.isModuleAvailable) {
      console.error('Cannot scan: Google Barcode Scanner Module is not available.');
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    

    let personaje = await this.cargarPersonaje(barcodes[barcodes.length-1].rawValue);
    console.log('Response from getPersonajeId:', personaje.name);

    /*
    const image = await Camera.getPhoto({                  #MAYBE USE Google Cloud Storage, or Azure Blob Storage
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // or CameraSource.Photos to select from the gallery
      quality: 90
    });
    */
    let coords = await this.printCurrentPosition();
    
    let myObject = {
      name: personaje.name,
      id:personaje.id,
      img:personaje.image,
      latitude: (coords).coords.latitude,
      longitude: (coords).coords.longitude,
      altitude: (coords).coords.altitude,
      owner: this.username
    };

    const character = this.qrs.find((char: any) => char.id === personaje.id);

    if(character){
      console.log(character.id," ",this.username)
      return
    }else{

    this.dbservice.saveCapturado(myObject).subscribe(async (res)=>{
      console.log(res);

      (await this.dbservice.getCapturados()).subscribe(
        (qrs) => {
          this.qrs = qrs; // Update your local data
          console.log("Updated qrs:", this.qrs);
        },
        (error) => {
          console.log("Error fetching capturados:", error);
        }
      );
    },(error)=>{
      console.log(error.error)
    })
    console.log("after capturado",myObject.latitude);
    //await this.storageService.saveRemoveQrs(myObject);

    /*
    (await this.dbservice.getCapturados()).subscribe((qrs)=>{
      this.qrs = qrs
     });*/

     //this.initMap();
  }
    // Save the image URI to a class property to use in the HTML
    //this.imageUri = image.webPath; // Use webPath for web display
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  printCurrentPosition = async () => {
    let coordinates = await Geolocation.getCurrentPosition();
    this.coordinates.push(coordinates)
    return coordinates;
  };

  async cargarPersonaje(url:any) {

    let parts = url.split('/');
    let id = parts[parts.length - 1];

    return await this.bd
      .getPersonajeId(id)
      .toPromise()
      .then((resp: any) => {
        return resp;


      });
  }

  irAPersonaje(unIdPersonaje:number){
    console.log(unIdPersonaje);
    this.router.navigate(['/pagina2',unIdPersonaje])
  }

  private initMap(): void {
    const latitude = 3.43722; // Replace with your latitude
    const longitude = -76.5225; // Replace with your longitude

    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      shadowSize: [41, 41] // size of the shadow
    });

    const defaultIconTwo = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      shadowSize: [41, 41] // size of the shadow
    });

    // Initialize the map and set its view to the specified latitude and longitude
    this.map = L.map('map').setView([latitude, longitude], 13);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // Add a marker at the specified location
    const marker = L.marker([latitude, longitude], { icon: defaultIcon }).addTo(this.map);
    const markertwo =L.marker([3.4360,-76.48], { icon: defaultIconTwo }).addTo(this.map);
    //marker.bindPopup('You are here!').openPopup();
    //markertwo.bindPopup('You are here!').openPopup();
  }
}
