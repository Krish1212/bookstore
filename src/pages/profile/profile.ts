import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { Profile } from '../../models/profile';
import { NgauthProvider } from '../../providers/ngauth/ngauth';
import { HomePage } from '../home/home';

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: Loading;
  profileForm: FormGroup;
  username: AbstractControl;
  role: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;
  gender: AbstractControl;
  birthday: AbstractControl;
  profile = {} as Profile;
  error: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, 
    private frmBuilder: FormBuilder, 
    private ngAuth: NgauthProvider) {
      this.profileForm = this.frmBuilder.group({
        'username': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'role':['',Validators.compose([Validators.required])],
        'firstName': ['', Validators.required],
        'lastName': ['', Validators.required],
        'gender': ['', Validators.required],
        'birthday': ['', Validators.required]
      });
      this.username = this.profileForm.controls['username'];
      this.role = this.profileForm.controls['role'];
      this.firstName = this.profileForm.controls['firstName'];
      this.lastName = this.profileForm.controls['lastName'];
      this.gender = this.profileForm.controls['gender'];
      this.birthday = this.profileForm.controls['birthday'];
    }

  createProfile(){
    this.loading = this.loadingCtrl.create({
      spinner:'bubbles',
      content: 'Creating Profile....',
      dismissOnPageChange: true
    });
    if(this.profileForm.valid) {
      this.profile = {'username': this.username.value, 'role': this.role.value, 'firstName':this.firstName.value, 'lastName':this.lastName.value, 'gender':this.gender.value, 'birthday': this.birthday.value};
      this.ngAuth.createUserProfile(this.profile).subscribe( userRef => {
        this.navCtrl.setRoot(HomePage);
      }, userError => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: userError.message,
            buttons: [{
              text: 'Ok',
              role: 'cancel'
            }]
          });
          alert.present();
        });
        this.error = userError;
      });
    }
    this.loading.present();
  }

}
