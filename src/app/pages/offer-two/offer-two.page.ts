import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-offer-two',
  templateUrl: './offer-two.page.html',
  styleUrls: ['./offer-two.page.scss'],
})
export class OfferTwoPage implements OnInit {

  constructor(private dbservice: DbserviceService,private authService: AuthService,private router: Router,private route: ActivatedRoute) { }

  ido:any;
  nomori:any
  username:any;
  capturados:any = []

  async ngOnInit() {

    (await this.dbservice.getCapturados()).subscribe((qrs)=>{
      this.capturados = qrs
     });

     this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const rowData = JSON.parse(params['data']);
        this.nomori = rowData.nombreduenoori
        this.ido = rowData.idori; // Do something with rowData
      }
    });

    this.authService.username$.subscribe((name) => {
      this.username = name;
    });
  }

  addOffer(row:any){

    let obj = {
      idori:this.ido,
      nombreduenori:this.nomori,
      idinter:row,
      nombreduenointer:this.username
    }

    this.dbservice.saveExchangeRequest(obj).subscribe(response => {
      console.log('Response:', response);
      alert("The exchange request has been delivered to "+this.nomori)
      this.router.navigate(['/e/tabs/tab1']);
    },
    error => {
      console.error('Error:', error);
      // Handle the error, maybe show an error message
    });;

  }
}
