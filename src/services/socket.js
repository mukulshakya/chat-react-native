const {
  default: {
    apiUrl: {live},
  },
} = require('../constants');
const io = require('socket.io-client');
const socket = io(live);
socket.once('connect', async () => {
  console.log('socket connection success', socket.id);
});

module.exports = {
  on(event, func) {
    console.log({on: {event, func}});
    socket.on(event, func);
  },
  emit(event, data) {
    console.log({emit: {event, data}});
    socket.emit(event, data);
  },
};
