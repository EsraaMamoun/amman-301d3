'use strict';

//const Person = require('./person');
const Obj = require('./person.js');

const myCar = Obj.myCar

let person = new Person('Fred', 51);


// bad code -- references the same thing over and over
function sayName(person) {
  const name = person.getName();
  if (person.age >= 50) {
    return name.toUpperCase();
  } else {
    return name.toLowerCase();
  }
}

function sayNameRefactored(person) {
  const name = person.getName();
  return person.age >= 50 ? name.toUpperCase() : name.toLowerCase();
}

console.log(sayName(person));

// better -- cache a reference to it, just once
// Seems small, but calling functions is harder on the server than a variable lookup.





// Promises - Ugly
function doSomethingAsync(person) {
  return Promise.resolve(person);
}

doSomethingAsync(person)
  .then( data => {
    //
    //
    //
    //
    //
    //
    

    data.name = data.name.toUpperCase();
    console.log('ugly upper', data.name);
    return data;
  })
  .then(differentData => {
    differentData.name = differentData.name.toLowerCase();
    console.log('ugly lower', differentData.name);
  });


  doSomethingAsync(person)
    .then(data => nameToUpperCase(data.name))
    .then(name => print(name))
    .then(name => nameToLowerCase(name))
    .then(differentName => print(differentName));
    
  console.log("hello");


function print(name) {
  console.log(name);
  return name;
}

function nameToUpperCase(name) {
  return name.toUpperCase();
}

function nameToLowerCase(name) {
  return name.toLowerCase();
}
// Promises Better
