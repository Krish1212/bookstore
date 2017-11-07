import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { User } from '../../models/user';
import { NgauthProvider } from '../../providers/ngauth/ngauth';
import { EmailValidator } from '../../validators/email';


@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  loading: Loading;
  user = {} as User;
  error: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private frmBuilder:FormBuilder, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, 
    private ngAuth: NgauthProvider) {
      this.signupForm = this.frmBuilder.group({
        'username': ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        'password': ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
      this.username = this.signupForm.controls['username'];
      this.password = this.signupForm.controls['password'];
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }
  register(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'User registration...in progress',
      dismissOnPageChange: true,
    });
    if(this.signupForm.valid){
      this.user = {'email':this.username.value, 'password':this.password.value};
      this.ngAuth.userSignup(this.user).subscribe(authUser => {
        //console.log(authUser);
        this.navCtrl.push('profile');
      }, authError => {
        this.loading.dismiss().then(() => {
          console.log(authError);
          let errorMessage: string = authError.message;
          if (authError.code === 'auth/weak-password' || authError.code === 'auth/email-already-in-use'){
            this.alertCtrl.create({
              message: errorMessage,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            }).present();
          }
        });
        this.error = authError;
      });
      this.loading.present();
    }
  }

}
