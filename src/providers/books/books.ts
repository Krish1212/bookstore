import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { Newbook } from '../../models/newbook';

@Injectable()
export class BooksProvider {

  constructor(private ngFirestore: AngularFirestore,) {
    
  }

  createNewbook(book: Newbook){
    return Observable.create(observer => {
      this.ngFirestore.collection(`books`).doc(book.title).set(book).catch(success => {
        observer.next(success);
      }).catch(failure => {
        observer.error(failure);
      });
    });
  }

}
