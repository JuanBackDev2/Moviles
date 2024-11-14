import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  constructor(private dbservice: DbserviceService,private authService: AuthService,private router: Router) { }
  username:any;

  capturados:any = []

  async ngOnInit() {
    (await this.dbservice.getCapturados()).subscribe((qrs)=>{
      this.capturados = qrs
     });

     this.authService.username$.subscribe((name) => {
      this.username = name;
    });

  }

  addOffer(row:any){
    let user = this.username
    console.log(row,"aquiii")
    this.dbservice.saveOffer({id:row,owner:user}).subscribe(
      response => {
        console.log('Response:', response);
        this.router.navigate(['e/tabs/tab5'], { queryParams: { reload: true } });
      },
      error => {
        console.error('Error:', error);
        // Handle the error, maybe show an error message
      });
  }
}
