import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEntryPage } from './add-entry';

@NgModule({
  declarations: [
    AddEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEntryPage),
  ],
})
export class AddEntryPageModule {}
