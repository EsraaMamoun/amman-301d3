'use strict';
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const PORT = process.env.PORT || 4000;
const app = express();
// make a connection to the psql using the provided link
const client = new pg.Client(process.env.DATABASE_URL);

client.on('error', (err) => {
  throw new Error(err);
});
// get data from the query and Insert it to the DB
app.get('/add', (req, res) => {
  let name = req.query.name;
  let role = req.query.role;
  const SQL = 'INSERT INTO people(name,role) VALUES ($1,$2) RETURNING *';
  const safeValues = [req.query.name, req.query.role];
  client
    .query(SQL, safeValues)
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get('/people', (req, res) => {
  const SQL = 'SELECT * FROM people;';
  client
    .query(SQL)
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
client
  .connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`my server is up and running on port ${PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(`startup error ${err}`);
  });
