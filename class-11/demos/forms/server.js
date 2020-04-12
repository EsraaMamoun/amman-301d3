'use strict';
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.get('/incoming', (req, res) => {
  console.log('this is what we are getting', req.query);
  res.redirect('/thanks.html');
});
app.post('/incoming', (req, res) => {
  console.log('this is what we are getting', req.body);
  res.redirect('/thanks.html');
});
app.listen(PORT, () => console.log(`up and running on port ${PORT}`));
