import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // Navigate to the 'e' route when the form is submitted
    this.router.navigate(['/e/tabs']);
    console.log("here")
  }
}
