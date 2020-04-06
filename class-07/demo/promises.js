let myPromise = new Promise((resolve, reject) => {
  let a = 4 + 4;
  if (a % 2 === 0) {
    resolve('Success');
  } else {
    reject('Failed');
  }
});

myPromise
  .then(data => {
    console.log('this is what we got', data);
  })
  .catch(err => console.log('oh nooooo', err));

function myFunc(x) {
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
    resolve('I was resolved ' + x);
    //}, x);
  });
}
console.log(myFunc(2000));
myFunc(2000).then(data => console.log(data));
console.log('I will be the first');
