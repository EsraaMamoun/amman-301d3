'use strict';

const client = require('./client');
const handler = require('./handler');

function locationHandler(request, response) {
    const city = request.query.city;
    getLocationData(city)
        .then(data => handler.render(data, response))
        .catch((error) => handler.errorHandler(error, request, response));
}

function getLocationData(city) {
    let SQL = 'SELECT * FROM locations WHERE search_query = $1';
    let values = [city];
    return client.query(SQL, values)
      .then(results => {
        if (results.rowCount) { return results.rows[0]; }
        else {
          let key = process.env.GEOCODE_API_KEY;
          const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;
          return superagent.get(url)
            .then(data => cacheLocation(city, data.body));
        }
      });
  }

function cacheLocation(city, data) {
    const location = new Location(data[0]);
    let SQL = `
      INSERT INTO locations (search_query, formatted_query, latitude, longitude)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    let values = [city, location.formatted_query, location.latitude, location.longitude];
    return client.query(SQL, values)
      .then(results => results.rows[0]);
  }
  
  function Location(data) {
    this.formatted_query = data.display_name;
    this.latitude = data.lat;
    this.longitude = data.lon;
  }
  
module.exports = locationHandler;