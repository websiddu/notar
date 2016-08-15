import { Injectable } from '@angular/core';

declare var _;

@Injectable()
export class UserService {

  currentUser: any;

  setCurrentUser(user) {
    this.currentUser = user;
  }

  addUserTags(tags) {
    this.currentUser.tags = _.merge(this.currentUser.tags, tags.split(','));
  }

}
