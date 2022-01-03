'use strict';

// eslint-disable-next-line no-undef
const socket = io();

socket.on('message', message => {
  console.log(message);
});
