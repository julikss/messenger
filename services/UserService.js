'use strict';

class UserService {
  constructor() {
    this.users = [];
  }

  // user = { id, username, room }
  addUser(user) {
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  removeUser(id) {
    const index = this.users.findIndex(user => user.id === id);

    if (index !== -1) {
      const [ removedUser ] = this.users.splice(index, 1);
      return removedUser;
    }
  }

  getRoomUsers(room) {
    return this.users.filter(user => user.room === room);
  }
}

module.exports = UserService;
