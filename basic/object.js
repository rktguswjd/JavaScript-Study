"use strict";
// Objects
// One of the JavaScript's data types
// a collection of related data and/or functionality
// Nearly all objects in JavaScript are instances of Object
// object = { key : value };

// 1. Literals and properties
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object connstructor' syntax

function print(person) {
    console.log(person.name);
    console.log(person.age);
}

const ellie = { name: 'ellie', age: 20 };
print(ellie);

// with JavaScript magic (dynamically typed language)
// can add properties later
ellie.hasJob = true;
console.log(ellie.hasJob);

// can delete properties later
delete ellie.hasJob;
console.log(ellie.hasJob);

// 2. Computed properties
// key should be always string
// 어떤 경우에 어떤 것을 쓰나
// dot을 쓰는 경우: 코딩하는 그 순간 키에 해당하는 값을 받아오고 싶을때
// computed properties를 쓰는 경우: 정확하게 어떤 키가 필요한지 모를때, 즉 runtime에서 결정될 때
console.log(ellie.name);
console.log(ellie['name']);
ellie['hasJob'] = true;
console.log(ellie.hasJob);

function printValue(obj, key) {
    console.log(obj[key]);
}
printValue(ellie, 'name');
printValue(ellie, 'age');

// 3. Property value shorthand
const person1 = { name: 'bob', age: 2 };
const person2 = { name: 'steve', age: 15 };
const person3 = { name: 'HyunJeong', age: 23 };
const person4 = makePerson('ellie', 30);
console.log(person4);
function makePerson(name, age) {
    return {
        name,
        age,
    };
}

// 4. Constructor Function
const person5 = new Person('dave', 22);
console.log(person5)
function Person(name, age) {
    // this = {};
    this.name = name;
    this.age = age;
    // return this;
}

// 5. in operator: property existence check (key in obj)
console.log('name' in ellie); // t
console.log('age' in ellie); // t
console.log('random' in ellie); // f
console.log(ellie.random); // undefined

// 6. for..in vs for..of
// for (key in obj)
console.clear();
for (let key in ellie) {
    console.log(key);
}

// for (value of iterable)
const array = [1, 2, 3, 4, 5];
for (let value of array) {
    console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3, ...])
const user = { name: 'ellie', age: 20 };
const user2 = user;
// user2.name = 'coder';
console.log(user);

// old way
const user3 = {};
for (let key in user) {
    user3[key] = user[key];
}
console.log(user3);

// const user4={};
// Object.assign(user4, user);
const user4 = Object.assign({}, user);
console.log(user4);

// another example
const fruit1 = { color: 'red' };
const fruit2 = { color: 'blue', size: 'big' };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); // blue
console.log(mixed.size);