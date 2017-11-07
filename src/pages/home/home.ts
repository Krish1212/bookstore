import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NgauthProvider } from '../../providers/ngauth/ngauth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:any;
  constructor(public navCtrl: NavController, private ngAuth: NgauthProvider) {
    this.user = this.ngAuth.currentUserProfile();
    console.log(this.user);
  }

  signOut(){
    this.ngAuth.userSignOut();
    this.navCtrl.setRoot('login');
  }

}
