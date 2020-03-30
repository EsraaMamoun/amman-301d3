$(document).ready(function() {
  function Dog(dog) {
    this.name = dog.name;
    this.image_url = dog.image_url;
    this.hobbies = dog.hobbies;
  }
  Dog.prototype.render = function() {
    let $dogClone = $("#dog-template").clone();
    $dogClone.find("h2").text(this.name);
    $dogClone.find("img").attr("src", this.image_url);
    $dogClone.find("p").text(this.hobbies);
    // $dogClone.removeClass("dog-template");
    $dogClone.removeAttr("id");
    $dogClone.attr("id", this.name);
    $("main section:first").append($dogClone);
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

/*
 {
    "name": "Odie",
    "image_url": "https://vignette.wikia.nocookie.net/garfield/images/a/ac/OdieCharacter.jpg/revision/latest?cb=20161218045212",
    "hobbies": "Annoying Garfield"
  },
*/
