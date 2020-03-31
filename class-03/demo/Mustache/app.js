$(document).ready(function() {
  function Dog(dog) {
    this.name = dog.name;
    this.image_url = dog.image_url;
    this.hobbies = dog.hobbies;
  }
  Dog.prototype.render = function() {
    let $dogTemplate = $('#dog-template').html();
    console.log('my objects', this);
    var rendered = Mustache.render($dogTemplate , this);//this line of code
    //will do the magic for us the first parameter is template html "string"/html code/tags
    //this will refer to objects that we created 
    $('main').append(rendered);
  };
  const readJson = () => {
    $.ajax("data.json", { method: "GET", dataType: "JSON" }).then(data => {
      data.forEach(dogItem => {
        let dog = new Dog(dogItem);
        dog.render();
      });
    });
  };
  readJson();
});

