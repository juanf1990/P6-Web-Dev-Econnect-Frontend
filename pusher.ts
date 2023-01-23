import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
    appId: '1541839',
    key: '71ec3b896a6904a65265',
    secret: '2cc4c1a20b7838948f72',
    cluster: 'eu',
    useTLS: true,

});

export const clientPusher = new ClientPusher('71ec3b896a6904a65265', {
    cluster: 'eu',
    forceTLS: true,
  });