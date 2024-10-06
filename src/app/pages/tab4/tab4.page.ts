import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  coordinates:Position[] = [];
  isModuleAvailable = false;
  qrs:any = [];

  constructor(private alertController: AlertController, private storageService:StorageService) {}

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
    let coords = this.printCurrentPosition();

    let myObject = {
      character: barcodes[barcodes.length-1].rawValue,
      latitude: (await coords).coords.latitude,
      longitude: (await coords).coords.longitude,
      altitude: (await coords).coords.altitude,
    };

    this.storageService.saveRemoveQrs(myObject);
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
}
