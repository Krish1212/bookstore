import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { Newbook } from '../../models/newbook';

@Injectable()
export class BooksProvider {

  constructor(private ngFirestore: AngularFirestore,) {
    
  }
  //Create a new book entry for the current user
  createNewbook(book: Newbook){
    return Observable.create(observer => {
      this.ngFirestore.collection(`books`).doc(book.title).set(book).catch(success => {
        observer.next(success);
      }).catch(failure => {
        observer.error(failure);
      });
    });
  }
  //Get all the books irrespective of the current user logged in
  getallBooks() {
    return Observable.create(observer => {
      this.ngFirestore.collection(`books`).ref.get().then(success => {
        observer.next(success);
      }).catch(failure => {
        observer.error(failure);
      })
    })
  }
  //Get all the books posted by the current user
  getmyBooks(userId: string){
    return Observable.create(observer => {
      this.ngFirestore.collection(`books`).ref.where("userId", "==", userId).get().then(success => {
        observer.next(success);
      }).catch(failure => {
        observer.error(failure);
      });
    });
  }
  //Get the information of the current selected book
  getthisBook(bookTitle: string){
    return Observable.create(observer => {
      this.ngFirestore.collection(`books`).ref.doc(bookTitle).get().then(success => {
        observer.next(success);
      }).catch(failure => {
        observer.error(failure);
      });
    });
  }

}
