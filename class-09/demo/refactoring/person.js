
const Person = function(name, age) {
this.name = name;
this.age = age;
};

Person.prototype.getName = function() { return this.name; };

module.exports = Person;
