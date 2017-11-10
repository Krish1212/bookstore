import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, AlertController, MenuController, ToastController, Events } from 'ionic-angular';

import { NgauthProvider } from '../../providers/ngauth/ngauth';
import { ShareProvider } from '../../providers/share/share';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile:any = {};
  loading:Loading;
  constructor(public navCtrl: NavController, 
    private ngAuth: NgauthProvider, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, 
    private menuCtrl: MenuController, 
    private toastCtrl: ToastController, 
    private shareData: ShareProvider, 
    private events:Events) {
      this.menuCtrl.enable(true);
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading User Profile...Please wait',
        dismissOnPageChange: true
      });
      this.getProfile().then((data) => {
        this.loading.dismiss().then((data) => {
          this.toastCtrl.create({
            message: 'Logged in successfully',
            duration: 3000,
            position:'middle'
          }).present();
        });
      }).catch((error) => {
        this.loading.dismiss().then(() => {
          this.alertCtrl.create({
            message: 'hello: ' + error.message,
            buttons: [{
              text: 'ok',
              role: 'cancel'
            }]
          }).present();
        });
      });
      this.loading.present();
    }

  async getProfile() {
    await this.ngAuth.currentUserProfile().subscribe(uProfile => {
      this.userProfile = uProfile;
      this.shareData.setProfile(this.userProfile);
      this.events.publish("myprofile", this.userProfile);
      //console.log('from home: ' + JSON.stringify(this.userProfile));
    });
  }

  signOut(){
    this.ngAuth.userSignOut();
    this.navCtrl.setRoot('login');
  }

}
