const FS = require('fs');
const Path = require('path');
const Https = require('https');
const { Server } = require('socket.io');

const server = Https.createServer(
  {
    key: FS.readFileSync(Path.resolve(__dirname, 'server.key')),
    cert: FS.readFileSync(Path.resolve(__dirname, 'server.crt')),
  }
);
const socket = new Server(server, {
  cors: {
    origin: '*',
  },
  secure: true,
});

function getTime() {
  const date = new Date();
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map(v => (v + '').padStart(2, '0')).join(':');
}

const clients = {};
socket.on('connection', (client) => {
  console.log(getTime() + ' >> [connection] client "' + client.id + '"');
  clients[client.id] = client;

  client.on('data', (request) => {
    if (request.target) {
      console.log(getTime() + ' >> [data] from "' + client.id + '" to "' + request.target + '"');
      clients[request.target].emit(request);
    } else {
      console.log(getTime() + ' >> [data] from "' + client.id + '" to "*"');
      for (const id in clients) {
        clients[id].emit('data', request);
      }
    }
  });

  client.on('disconnect', () => {
    console.log(getTime() + ' >> [disconnect] client "' + client.id + '"');
    delete clients[client.id];

    const ids = [];
    for (const id in clients) ids.push(id);
    for (const id in clients) {
      clients[id].emit('event', {event: 'disconnect', removed: client.id, clients: ids});
    }
  });

  const ids = [];
  for (const id in clients) ids.push(id);
  for (const id in clients) {
    clients[id].emit('event', {event: 'connect', added: client.id, clients: ids});
  }
});


server.listen(3001);