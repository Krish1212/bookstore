import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from '../../models/user';
import { Profile } from '../../models/profile';

@Injectable()
export class NgauthProvider {

  constructor(private afAuth: AngularFireAuth, private ngFirestore: AngularFirestore) {
    //console.log('Hello NgauthProvider Provider');
  }

  userLogin(user: User) {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  userSignup(user: User) {
    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
      .then((authData) => {
        observer.next(authData);
      }).catch((authError) => {
        observer.error(authError);
      });
    });
  }

  userSignOut(){
    return this.afAuth.auth.signOut();
  }
  get currentUser():string {
    return this.afAuth.auth.currentUser ? this.afAuth.auth.currentUser.uid : null;
  }

  currentUserProfile() {
    let userId = this.currentUser;
    return Observable.create(observer => {
      if (userId) {
        this.ngFirestore.collection(`profiles`).doc(userId).ref.get().then(userProfile => {
          if(userProfile.exists) {
            //console.log('from ngauth: ' + JSON.stringify(userProfile.data()));
            observer.next(userProfile.data());
          }
        }).catch(error => {
          observer.error(error);
        });
      }
    });
  }

  createUserProfile(profile: Profile){
    return Observable.create(observer => {
      this.afAuth.authState.take(1).subscribe(auth => {
        //console.log('inside ngauth: ' + auth.uid);
        this.ngFirestore.collection(`profiles`).doc(auth.uid).set(profile)
        .then((docRef) => {
          observer.next(docRef);
        }).catch((error) => {
          observer.error(error);
        })
      });
    });
  }

}
