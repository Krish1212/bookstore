import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Profile } from '../../models/profile';

@Injectable()
export class ShareProvider {
    
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  birthday: Date;

  constructor() {
  }
  setProfile(userProfile:Profile) {
    this.firstName = userProfile.firstName;
    this.lastName = userProfile.lastName;
    this.gender = userProfile.gender;
    this.role = userProfile.role;
    this.birthday = userProfile.birthday;
  }

  getProfile() {
      return {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'gender': this.gender,
          'birthday':this.birthday,
          'role':this.role,
      };
  }
}
