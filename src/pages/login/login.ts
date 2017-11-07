import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { HomePage } from '../home/home';
import { NgauthProvider } from '../../providers/ngauth/ngauth';
import { EmailValidator } from '../../validators/email';
import { User } from '../../models/user';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  loading: Loading;
  error: any;
  user = {} as User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private loadingCtrl: LoadingController, 
    private ngAuth: NgauthProvider, 
    private alertCtrl: AlertController) {
      this.loginForm = this.formBuilder.group({
        'username': ['', Validators.compose([Validators.required,EmailValidator.isValid])],
        'password': ['', Validators.compose([Validators.minLength(6),Validators.required])]
      });
      this.username = this.loginForm.controls['username'];
      this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...Please wait',
      spinner: 'bubbles',
      dismissOnPageChange: true
    });
    if(this.loginForm.valid){
      this.user = {'email': this.username.value, 'password': this.password.value};
      this.ngAuth.userLogin(this.user).subscribe(authUser => {
        console.log(authUser);
        this.navCtrl.setRoot(HomePage);
        //this.navCtrl.push('profile');
      }, authError => {
        let errorMessage:string = authError.message;
        console.log(authError);
        this.loading.dismiss().then(() => {
          if(authError.code === 'auth/user-not-found'){
            let errorAlert = this.alertCtrl.create({
              message: errorMessage + ' Please Register to have fun',
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
            errorAlert.present();
          } else if(authError.code === 'auth/network-request-failed') {
            let errorAlert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
            errorAlert.present();
          }
        });
        this.error = authError;
      });
      this.loading.present();
    }
  }

  gotoRegister(){
    this.navCtrl.push('register');
  }

}
