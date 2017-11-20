import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@IonicPage({
  name:'addEntry'
})
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {
  newEntryForm:FormGroup;
  title:AbstractControl;
  author:AbstractControl;
  year:AbstractControl;
  salesprice:AbstractControl;
  lendprice:AbstractControl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private frmBuilder:FormBuilder, 
    private alertCtrl:AlertController, 
    private platform: Platform) {
      this.platform = platform;
      this.newEntryForm = this.frmBuilder.group({
        'title': ['', Validators.compose([Validators.required])],
        'author':['', Validators.compose([Validators.required])],
        'year':['', Validators.compose([Validators.required, Validators.maxLength(4)])],
        'salesprice': ['', Validators.required],
        'lendprice': ['', Validators.required]
      });
      this.title = this.newEntryForm.controls['title'];
      this.author = this.newEntryForm.controls['author'];
      this.year = this.newEntryForm.controls['year'];
      this.salesprice = this.newEntryForm.controls['salesprice'];
      this.lendprice = this.newEntryForm.controls['lendprice'];
  }

  createEntry(){
    if (this.newEntryForm.valid){
      console.log('New Entry Created');
      this.alertCtrl.create({
        message: 'New Entry Created',
        buttons: [{
          text: 'OK',
          role: 'cancel'
        }]
      }).present();
    }
  }
}
