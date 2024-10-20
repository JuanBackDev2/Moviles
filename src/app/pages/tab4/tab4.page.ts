import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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

  constructor(private alertController: AlertController, private storageService:StorageService, private bd: RickyMortyBdService,private router:Router) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    this.checkModuleAvailability(); // Check for module availability
    
    this.storageService.qrs$.subscribe((qrs) => {
      this.qrs = qrs;
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

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // or CameraSource.Photos to select from the gallery
      quality: 90
    });

    let coords = await this.printCurrentPosition();
    
    let myObject = {
      character: personaje,
      instaImage:image.webPath,
      latitude: (coords).coords.latitude,
      longitude: (coords).coords.longitude,
      altitude: (coords).coords.altitude
    };

    await this.storageService.saveRemoveQrs(myObject);

  
    // Save the image URI to a class property to use in the HTML
    this.imageUri = image.webPath; // Use webPath for web display
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

}
