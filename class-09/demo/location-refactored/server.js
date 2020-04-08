'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const pg = require('pg');
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();
const handler = require('./handler.js');
app.use(cors());

const locationHandler = require('./location.js');
// Route Definitions
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.use('*', handler.notFoundHandler);
app.use(handler.errorHandler);



// HOW SHULD WE REFACTOR:
//  What are our pain points here?
//  Where can we extract logic for this (and any other "normal" API")
function weatherHandler(request, response) {

  let { latitude, longitude } = request.query;

  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;

  superagent.get(url)
    .then(data => {
      const weatherSummaries = data.body.daily.data.map(day => {
        return new Weather(day);
      });
      response.status(200).json(weatherSummaries);
    })
    .catch((error) => {
      handler.errorHandler(error, request, response);
    });

}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}


function startServer() {
  app.listen(PORT, () => console.log(`Server up on ${PORT}`));
}

// Start Up the Server after the database is connected and cache is loaded
const client = require('./client.js');

client.connect()
  .then(startServer)
  .catch(err => console.error(err));
