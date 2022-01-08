'use strict';

const UserService = require('../../services/UserService');

describe('addUser method testing', () => {
  it('it pushes argument to array this.users', () => {
    const service = new UserService();
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);

    const expected = [user];
    expect(service.users).toEqual(expected);
  });
});

describe('getUser method testing', () => {
  it('it returns user if id exists', () => {
    const service = new UserService();
    const id = 1;
    const user = {
      id,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);

    const actual = service.getUser(id);
    expect(actual).toEqual(user);
  });


  it('it returns undefined if id does not exist', () => {
    const service = new UserService();
    const id = 2;
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);

    const actual = service.getUser(id);
    expect(actual).toBeUndefined();
  });
});

describe('removeUser method testing', () => {
  it('it removes user if id exists', () => {
    const service = new UserService();
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);
    service.removeUser(user.id);

    expect(service.users).toEqual([]);
  });

  it('it returns user that was removed', () => {
    const service = new UserService();
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);
    const removed = service.removeUser(user.id);

    expect(removed).toEqual(user);
  });

  it('it returns undefined if id does not exist', () => {
    const service = new UserService();
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);
    const removed = service.removeUser(69);

    expect(removed).toBeUndefined();
  });
});

describe('getRoomUsers method testing', () => {
  it('it returns array of users if room exists', () => {
    const service = new UserService();
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);
    const roomUsers = service.getRoomUsers(user.room);

    const expected = [user];
    expect(roomUsers).toEqual(expected);
  });

  it('it returns empty array if room does not exist', () => {
    const service = new UserService();
    const user = {
      id: 1,
      username: 'Liubochka bubochka',
      room: 'room of bubochka'
    };
    service.addUser(user);
    const roomUsers = service.getRoomUsers('my Metarhia');

    const expected = [];
    expect(roomUsers).toEqual(expected);
  });
});
