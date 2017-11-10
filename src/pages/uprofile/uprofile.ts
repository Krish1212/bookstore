import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShareProvider } from '../../providers/share/share';

@IonicPage({
  name:'uprofile'
})
@Component({
  selector: 'page-uprofile',
  templateUrl: 'uprofile.html',
})
export class UprofilePage {
  userProfile: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private shareData: ShareProvider) {
      this.userProfile = this.shareData.getProfile();
  }

}
