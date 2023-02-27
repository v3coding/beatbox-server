
var express = require('express');
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const dgram = require('dgram');
const server = dgram.createSocket('udp4');


var bodyParser = require('body-parser');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/main');
});

app.post('/trigger-function', (req, res) => {
  // Perform server-side processing here
  console.log('POST request received');

  // Send a UDP packet to port 12345 on localhost
  const message = 'Hello, world!';
  const port = 12345;
  const address = '127.0.0.1';
  server.send(message, port, address, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end(); // Send an error response back to the client
    } else {
      console.log(`Sent message "${message}" to ${address}:${port}`);
      
      // Listen for a response over UDP and wait for it
      const udpPromise = new Promise((resolve, reject) => {
        server.on('message', (msg, rinfo) => {
          console.log(`Received message "${msg}" from ${rinfo.address}:${rinfo.port}`);
          resolve(msg);
          msg = '';
        });
      });
      
      // Wait for the UDP response and send it back to the client
      udpPromise.then((msg) => {
        res.status(200).send(msg);
      });
    }
  });
});

app.post('/trigger-function2', (req, res) => {
  // Perform server-side processing here
  console.log('POST request received');

  // Send a UDP packet to port 12345 on localhost
  const message = 'Button - 1 pressed';
  const port = 12345;
  const address = '127.0.0.1';
  server.send(message, port, address, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end(); // Send an error response back to the client
    } else {
      console.log(`Sent message "${message}" to ${address}:${port}`);
      
      // Listen for a response over UDP and wait for it
      const udpPromise = new Promise((resolve, reject) => {
        server.on('message', (msg, rinfo) => {
          console.log(`Received message "${msg}" from ${rinfo.address}:${rinfo.port}`);
          resolve(msg);
          msg = '';
        });
      });
      
      // Wait for the UDP response and send it back to the client
      udpPromise.then((msg) => {
        res.status(200).send(msg);
      });
    }
  });
});

app.post('/tempoUp', async (req, res) => {
  let {} = req.body;
  let errors = [];
  console.log('pooping');
});

app.listen(8088, async function () {
  console.log('BeatboxServer listening on port 8088');
});