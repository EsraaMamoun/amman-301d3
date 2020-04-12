'use strict';

let name = 'something';

function say(words) {
  let normalized = normalize(words);
  render(normalized);
}

function normalize(str) {
  return str.toUpperCase();
}

function render(stuff) {
  console.log(stuff);
}

say(name);

console.log(normalize('Rosie'));
