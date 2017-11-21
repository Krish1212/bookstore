import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { NgauthProvider } from '../../providers/ngauth/ngauth';
import { BooksProvider } from '../../providers/books/books';
import { Newbook } from '../../models/newbook';

@IonicPage({
  name:'addEntry'
})
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {
  async getUserId() {
    return await this.afAuth.currentUser;
  }
  newEntryForm:FormGroup;
  newEntrybook = {} as Newbook;
  title:AbstractControl;
  authors:AbstractControl;
  year:AbstractControl;
  salesprice:AbstractControl;
  lendprice:AbstractControl;
  loading:Loading;
  userId:string;
  error:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private frmBuilder:FormBuilder, 
    private alertCtrl:AlertController, 
    private loadingCtrl: LoadingController, 
    private afAuth: NgauthProvider, 
    private ngBook: BooksProvider) {
      this.newEntryForm = this.frmBuilder.group({
        'title': ['', Validators.compose([Validators.required])],
        'author':['', Validators.compose([Validators.required])],
        'year':['', Validators.compose([Validators.required, Validators.maxLength(4)])],
        'salesprice': ['', Validators.compose([Validators.required, Validators.pattern('[^\-][0-9]+')])],
        'lendprice': ['', Validators.compose([Validators.required, Validators.pattern('[^\-][0-9]+')])]
      });
      this.title = this.newEntryForm.controls['title'];
      this.authors = this.newEntryForm.controls['author'];
      this.year = this.newEntryForm.controls['year'];
      this.salesprice = this.newEntryForm.controls['salesprice'];
      this.lendprice = this.newEntryForm.controls['lendprice'];
  }

  createEntry(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'User registration...in progress',
      dismissOnPageChange: true,
    });
    if(this.newEntryForm.valid){
      this.getUserId().catch(userId => {
        this.userId = (userId) ? userId : '';
      });
      this.newEntrybook = {'title':this.title.value,'authors':this.authors.value,'pubyear':this.year.value,'salesprice':this.salesprice.value,'lendprice':this.lendprice.value,'userId':this.userId};
      this.ngBook.createNewbook(this.newEntrybook).subscribe((success) => {
        this.alertCtrl.create({
          message: 'New Entry Created',
          buttons: [{
            text: 'OK',
            role: 'cancel'
          }]
        }).present();
        this.navCtrl.pop();
      }, (failure) => {
        this.loading.dismiss().then(() => {
          this.alertCtrl.create({
            message: failure.message,
            buttons: [{
              text: 'Ok',
              role:'cancel'
            }]
          }).present();
        });
        this.error = failure;
      });
    }
    this.loading.present();
  }
}
