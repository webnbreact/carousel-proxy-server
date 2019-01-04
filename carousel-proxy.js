const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const url = require('url');
const path = require('path');
const cors = require('cors');
var proxy = require('http-proxy-middleware');
const axios = require('axios');

const { json, urlencoded } = bodyParser;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/rooms/:id/', express.static(path.resolve(__dirname, './public/')));

app.use('/rooms/:id/pictures', proxy({ target: 'http://localhost:4500/', changeOrigin: false }));
app.use('/rooms/:id/booking', proxy({ target: 'http://localhost:1337/', changeOrigin: false }));
app.use('/rooms/:id/listings', proxy({ target: 'http://localhost:3003/', changeOrigin: false }));
app.use('/rooms/:id/reviews', proxy({ target: 'http://localhost:3000/', changeOrigin: false }));
app.use('/rooms/:id/stars', proxy({ target: 'http://localhost:3000/', changeOrigin: false }));
app.use('/rooms/:id/query', proxy({ target: 'http://localhost:3000/', changeOrigin: false }));
app.use('/rooms/:id/hostDetails', proxy({ target: 'http://localhost:3000/', changeOrigin: false }));

app.get('/pictures', (req, res) => {
  res.send(res.data);
});
app.get('/booking', (req, res) => {
  res.send(res.data);
});
app.get('/reviews', (req, res) => {
  res.send(res.data);
});
app.get('/stars', (req, res) => {
  res.send(res.data);
});
app.get('/query', (req, res) => {
  res.send(res.data);
});
app.get('/hostDetails', (req, res) => {
  res.send(res.data);
});

// app.get('rooms/:id/booking', (req, res) => {
//   axios.get('http://localhost:1337/rooms/:id/booking/')
//     .then((data) => {
//       console.log(data);
//       res.header('Access-Control-Allow-Origin', '*');
//       res.send(data);
//     });
// });

// app.get('rooms/:id/booking', (req, res) => {
//   axios.get('http://localhost:3003/rooms/:id/booking/')
//     .then((data) => {
//       console.log(data);
//       res.header('Access-Control-Allow-Origin', '*');
//       res.send(data);
//     });
// });


app.listen(9999);
