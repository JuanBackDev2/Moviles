import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import * as L from 'leaflet';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-tabmap',
  templateUrl: './tabmap.page.html',
  styleUrls: ['./tabmap.page.scss'],
})
export class TabmapPage implements OnInit {

  constructor(private dbservice:DbserviceService,private ionTabs: IonTabs) { }
  private map!: L.Map;
  qrs:any = [];
  inter:any = [];

  async ngOnInit() {
    (await this.dbservice.getIntercambiados()).subscribe((inter)=>{
      this.inter = inter
     });

    (await this.dbservice.getCapturados()).subscribe((qrs)=>{
      this.qrs = qrs
      this.initMap();
     });

     this.ionTabs.ionTabsDidChange.subscribe(async () => {
      (await this.dbservice.getIntercambiados()).subscribe((inter)=>{
        this.inter = inter
       });
  
      (await this.dbservice.getCapturados()).subscribe((qrs)=>{
        this.qrs = qrs
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

        for (const qr of this.qrs) {
          L.marker([qr.latitude, qr.longitude], { icon: defaultIcon }).addTo(this.map);
          console.log(qr.latitude, qr.longitude)
        }
        for (const int of this.inter) {
          L.marker([int.latnuevo, int.longnuevo], { icon: defaultIconTwo }).addTo(this.map);
        }
       });
      
    });

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
    this.map = L.map('map').setView([latitude, longitude],12);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 13,
    }).addTo(this.map);

  
    console.log("before lat",this.qrs)
    for (const qr of this.qrs) {
      L.marker([qr.latitude, qr.longitude], { icon: defaultIcon }).addTo(this.map);
      //this.markerGroup.addLayer(marker); 
      console.log(qr.latitude, qr.longitude)
    }
    for (const int of this.inter) {
      L.marker([int.latnuevo, int.longnuevo], { icon: defaultIconTwo }).addTo(this.map);
      //this.markerGroup.addLayer(marker); 
    }
    //marker.bindPopup('You are here!').openPopup();
    //markertwo.bindPopup('You are here!').openPopup();
  }
  
}

