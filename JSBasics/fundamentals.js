'use strict'; // used for enabling strict javascript. I It helps avoiding hoisting, unable to declare variables without let, var or const
// for example :
// let a = 10 // is allowed
// a = 10 // is not allowed

//Type Coercion :- JavaScript automatically converts one data type into another if needed by the operation, 
// it happens when we do arithmetic operatons on different types of variables
console.log('3'+ 2) // '32'
console.log('3'- 2) // 1
console.log('3'* 2) // 6
console.log('3'/ 2) // 1.5
// single line comment
/*
Multiline comment
*/
console.log("Hello World!"); //Print statement
console.error("Show error"); //Print statement
console.warn("show warning"); //Print statement

/*
JavaScript Variables can be declared in 4 ways:

Automatically : autometically creates variable
Using var : used for older browsers 1995-2015
Using let : latest added in 2015
Using const : used to create constants

use let type for declaring variables
*/

// valid = apple, _underscore12, $doller

// ---------------------------------- premitive data type -----------------------------------
let a;
let b = null;
let sym1 = Symbol('yep');
let sym2 = Symbol('yep');
//Symbol() is used to defined symbols, even the value is same they are not equal
let int_var = 53, float_var = 19.42; // Number
console.log(`the value of int_var is ${int_var}`);
// these quotes are different, this is back quotes (``) which is (~) key under escape key.
typeof( int_value);
var bool_var = true; //boolean
// (1,-1,{},'0'," ") are treated as true value
// (0,null,undefined,NaN,"") are treated as false
const str_var = 'Xyz'; //string

// ------------------------------ Non Primitive Data Type -------------------------------
// -------------- Objects:- are like dictionary in python
let obj = {
    name:'John Doe',
    age:36,
    city:'New York',
    address : {
        state: "Haryana",
        country: "India"
    },
    info(){
        console.log(`${this.name} is ${this.age} year old and lives in ${this.city}.`);
    },
    yeargap : function (a){
        return this.age - a;
    }
};
//accessing values
console.log(obj.name);
console.log(obj['city']);//use single or double quote
obj.info();
console.log('age diffrenece between you and him is: ',obj.yeargap(20));
obj['yeargap'](20)

// shallow copy of obj using spread
objCopy = {...obj}
// optional chaining
console.log(obj.address.state) // Haryana
console.log(obj.district.city) // it shows error because there is no district key in obj object.
// to solve this:
console.log(obj?.district?.city) // it checks if key exists, if yes then check the next and show result, else show nothing.
const district = obj?.address?.district ?? "Gurgaon"; // if key exists then value, else Gurgaon.

const keys = Object.keys(obj)
console.log(keys) // ['name', 'age', 'city', 'address', 'info', 'yeargap']

const values = Object.values(obj)
console.log(values) // ['John Doe', 36, 'New York', {state: 'Haryana', country: 'India'}, ƒ info(), ƒ (a)]

address = {
        state: "Haryana",
        country: "India"
    };

let advance_obj = {
    name:'John Doe',
    age:36,
    city:'New York',
    [`day - ${2+5}`]: 'Sunday', // string litreal as key in object.
    address, // use this type for adding a objet inside object if it already declared outside.
    info(){ // compare it to the obj object declared above. Both work same
        console.log(`${this.name} is ${this.age} year old and lives in ${this.city}.`);
    },
    yeargap(a){
        return this.age - a;
    }
};


// ------------------- Arrays :- are ordered collection of items stored in an array object.

let arr = [1,true,'xyz',[1,2,3],{name:'Joe'}];

// shallow copy of array using spread
arrCopy = {...arr}

console.log(arr[4].name);
console.log(arr[2]);//returns 'xyz'
//methods in array:-
arr.concat(another_array)
arr.push(4) // adds element(4) in the end, and return the length of the array
arr.pop() // remove element from the end, and return the removed element
arr.shift() // removes first element, and return the removed element
arr.unshift(4) // add 4 at beginning, and return the length of the array
arr.indexOf(true) // returns index of true in array
arr.includes(true) // returns true if exists
// splice(start index , how many elements to be removed ,add element1,add element2...)
arr.splice(2,1); //removes one element from index 2
arr.splice(2,0,'abc','def'); //adds two elements before index
let  new_arr = arr.slice(0,3);//(start index,end)
//use to return the slice of array


// ------------------------------ set: are unordered, unique collection of items stored in an Set Object.

let set_dataType = new Set(['hi','hello','hi',1,true,2, true])
let set_dataType2 = new Set(['hi','hello','hi',3,5,7])
let set_dataType3 = new Set('hello') // {'h', 'e', 'l', 'l', 'o'}
console.log(set_dataType) // {'hi', 'hello', 1, true, 2}

set_dataType.forEach((value,value_again,set)=>{console.log(`item: ${value} at key: ${value_again}.`)}) // item: hi at key: hi.

set_dataType.size // 5
set_dataType.has('hi') // true
set_dataType.add('aarav') // {'hi', 'hello', 1, 2, 'aarav'}
set_dataType.delete('aarav') // remove element from set_dataType and returns ture if it exists and removed successfully.
set_dataType.clear() // used for clearing all elements from set.

set_dataType.union(set_dataType2) // {'hi', 'hello', 1, 2, 3, 5, 7}

set_dataType.intersection(set_dataType2) // {'hi', 'hello'}


// ------------------------------- map: it is same like objects but its keys can be anything (not string), like: true, 1

let map_dataType = new Map();
map_dataType.set('name', 'Aarav'); // it returns the updated map, which helps in chaining the methods to it.
map_dataType.set(true, 'yep, its correct! :D');
map_dataType.set(false, 'nop, its wrong! :(');
map_dataType.set(2, [1, 2, 3])
map_dataType.set('age',23).set('gender','male')
console.log(map_dataType) 
//{'name' => 'Aarav',true => 'yep,its correct! :D',false => 'nop, its wrong! :(',2 => [1, 2, 3],'age' => 23,"gender" => "male"}
const map_dataType2 = new Map([['name','Aarav'],[true,'this is true ;)'],[2,'this is 2 :)']])
console.log(map_dataType2) // {'name' => 'Aarav', true => 'this is true ;)', 2 => 'this is 2 :)'}
map_dataType.forEach((value,key,map)=>{console.log(`item: ${value} at key: ${key}.`)}) // item: Aarav at key: name.

map_dataType.get('name') // 'Aarav'
map_dataType.get(true) // 'yep, its correct! :D'
map_dataType.get(2) // [1, 2, 3]
map_dataType.get(map_dataType.get('name') == 'Aarav') // condition result in boolean, result: 'yep, its correct! :D'

map_dataType.size // 6
map_dataType.has('name') // true
map_dataType.keys() // {'name', true, false, 2, 'age', 'gender'}
map_dataType.values() // {'Aarav', 'yep, its correct! :D', 'nop, its wrong! :(', Array(3), 23, "male"}
map_dataType.delete(2) // true, returns true if key exists and got deleted, else false.

// convert object into map
const objToMap = new Map(Object.entries(obj)); // obj.entries are array of arrays.

// -----------------------------------------------Operators:--------------------------------------------
//Arithmetic Operator (+,-,*,/,%,**)
//Unary Operators (a++,++a)
//Relational/Comparison operators(==,!=,===,!==,>,<,>=,<=)
//shift operators (a>>b,a<<b) shift value a, b times in binary value and result in origional
//Logical operators(&& and,|| or,! not) returns boolean value
//Assignment operator (=,+=,-=,*=,/=)
//bitwise operators (& and,| or,^ xor,~ not)

/*Ternary operator: quick if else
Condition? console.log('true') : console.log('false');
*/



//---------------------------------------- conditional statements ----------------------------------------
/*
normal if else:-
if(condition){
    code block to be executed if condition is true
}
else{
    code block to be executed if condition is false
}

else if:-
if(condition_1){}
else if(condition_2){}
else if(condition_3){}
else{}

*/
// switch Case:-
let grade = 'B';
let result;
switch (grade) {
    case 'A':
        result = "A (Excellent)";
        break;
    case 'B':
        result = "B (Average)";
        break;
    default:
        result = "No Grade";
}
console.log(result);

/* ---------------------------------------------- Loops -------------------------------------------:
for loop :-
for(initialization; condition; increment){
    block of code for execution
}
*/

// let i,a;
// for(i,a;i<10 || a>=6;i++,a+=2){
//     code block to be executed;
// }
for(let i=0; i<3; i++){
console.log('value of i is: ',i);
}

for(let i=0; i<10; i++){
    if(i==4){
        continue;
    }
    else if (i == 6){
        break;
    }
    console.log('value of i is: ',i);
}


//for Each:- it is a method of object for traversing
let fruits = ['apple','peach','orange','banana','mango'];
fruits.forEach(item => console.log(item));

fruits.forEach((item,index,array)=>{console.log(`item: ${item} at index: ${index}.`)}) // item: apple at index: 0.

//for of:- for getting values inside object
for(item of fruits){
    console.log('value in object is: ',item);
}
//for in:- for getting index of element in object
for(item in fruits){
    console.log('Index of items is: ',item);
}
// for getting index and items in same loop
for(item of fruits.entries()){
    console.log(item) // [0, 'apple']
    console.log(`item index : ${item[0]}, and value is : ${item[1]}.`) // item index 0, and value is : apple.
}
// doing same thing using destructuring array
for([index, element] of fruits.entries()){
    console.log(`item index : ${index}, and value is : ${element}.`) // item index 0, and value is : apple.
}

// loop on object
for (const data of Object.entries(obj)){
    console.log(`here the key is ${data[0]}, and data is ${data[1]}.`) // here the key is name, and data is John Doe.
} // when the key is a function : here the key is yeargap, and data is function (a){ return this.age - a; }.

// loop on set:
for (const data of set_dataType){
    console.log(data)
}

/* --------------------------------- while loop : -
while(condition){
    //code block to be executed while the condition is true
}
*/
let j=1;
while(j<=3){
    console.log("Value of J is ",j);
    j++;
}
/*Do While Loop :-
do{
    //code block will execute at least once
}
while(condition);
*/
let i = 0;
do {
    console.log("I am inside do while loop and value of I is: ",i);
    i++;
    } while (i < 3);



// ------------------------------------------- functions ------------------------------------------------
function add(a,b){
    return a+b;
    }
console.log('Function add returns',add(43,64));

const addNum = function (a,b){
    return a+b
}
console.log('Function addNum returns',addNum(4,5))

const addNumAgain = (a,b)=>{
    return a+b
}
console.log('Function addNumAgain returns',addNumAgain(4,5))

const addNumAgain2 = (a,b)=> a+b
console.log('Function addNumAgain2 returns',addNumAgain2(4,5))


//recursive function
function factorial(n) {
    if (n == 0 || n == 1) {
        return 1;
        } else {
            return n * factorial(n-1);
            }
    }
console.log('Factorial of 5 is: ',factorial(5));
//calling functions with parameters
let x = add(78,92);
console.log('Addition result is: ',x);

console.log(typeof(typeof(int_var)));


// ------------------------------------- DOM manipulation ------------------------------------------

// get element from html
value = document.getElementById("Id")
value = document.getElementsByClassName("class")
value = document.getElementsByTagName("h1") // get list of all h1 tags
// querySelector() can get anything from document like: tag, .class, #id.
value = document.querySelector("h1") // get first element of h1 tag
value = document.querySelectorAll("h1") // get list of all h1 tags.

// change element
value.innerHTML // show text including \n and html tags.
value.innerText // show inner text excluding \n and html tags.
value.textContent // show text content including \n and excluding html tags.

// change attributes
value.getAttribute("href") // to get the value of that attribute
value.setAttribute("href","newIndex.html") // override the value of that attribute, first attribute name, second value

value.classList // to get all the classes it has in list format.
// classList Methods: add("className"), remove, toggle("className"), contains("className"), replace("old","new"), length
value.classList.remove("className")

// add css property
value.style.color = "red" // change css property using style.cssPropery = "value"

// create element using js
newheading = document.createElement("h1")
newheading.innerText = "this is new heading"
newheading.setAttribute("class","heading class")

// adding new element into html
value.append(newheading) // after element
value.appendChild(newheading) // inside element
value.prepend(newheading) // before element
value.insertAdjacentElement('beforebegin',newheading) // beforebegin, afterend, beforeend, afterbegin

// added event listener
document.querySelector('btn-class').addEventListener('click',function(){
     console.log('print hello world on click on that perticular button with btn-class.')
}) // types of events: click, dbclick, mousedown, mouseup, keydown, keyup , keypress... google for more.
document.addEventListener('keydown', function(e){
    console.log(e.key) // e is the event object passed to function when a key is pressed. and e.key shows which key is pressed
    if (e.key === 'Enter'){
        value.classList.add("ClassName")
    }
})

// =================================================================================================
// ---------------------------------------- advance Javascript -------------------------------------

// time delay
setTimeout(() => {
    console.log("Message after delay of 2000ms means 2 seconds.")
}, 2000);
// setTimeout with values:
setTimeout((value1,value2) => {
    console.log(`Message after delay of 2000ms means 2 seconds. Value 1: ${value1},Value 2: ${value2}`)
}, 2000,"Aarav","Harithas");

// loop code after interval
setInterval(()=>{
    console.log("Message repeate after every 2000ms means 2 seconds.")
},2000)
// stop setInterval:
const timer20sec = function(){

    let counter = 5;
    const timer = setInterval(()=>{
        console.log(`Message repeates ${counter} times after every 1 seconds.`)
        counter--;
        if (counter <= 0){
        clearInterval(timer);
    }
    },1000)
    }
timer20sec()

// destructuring array -------------------------
let arr2 = [1,2,3,4,[7,8]]
let [a1,b1,c1] = arr
console.log(a1,b1,c1) // a1 = 1, b1 = 2, c1 = 3
let [a2,b2, ,c2] = arr
console.log(a2,b2,c2) // a2 = 1, b2 = 2, c2 = 4
let [a3,b3, , ,[ ,c3]] = arr2
console.log(a3,b3,c3) // a3 = 1, b3 = 2, c3 = 8
let arr3 = [1,2]
let [a4=0,b4=0,c4=0] =arr3 // default value is set when there is no index value in array
console.log(a4,b4,c4) // a4 = 1, b4 = 2, c4 = 0

// switching variables:
let temp = a1;
a1 = b1;
b1 = temp;
// another way:
[b1,a1] = [a1,b1];

// destructuring objects -----------------------
let obj1 = {
    name: "Aarav",
    age: 23
};

let {name,age} = obj1;
console.log(name,age); // 'Aarav' 23
// make variable name different from key name in object:
let {name:myname,age:myage} = obj1;
console.log(myname,myage); // 'Aarav' 23
// set default values if not key not available in object:
let {name:myname1='Unamed',age:myage1=0,gender:mygender='Male'} = obj1;
console.log(myname1,myage1,gender); // 'Aarav' 23 'Male'

// mutating values
let name2 = "Unknown";
let age2 = 25;

const obj2 = {
    name2:"Gaurav", age2:23
};
// let {name2,age2} = obj2; // it doesn't work due to curly bracases' code block property instead use this:
let ({name2,age2} = obj2);

// nested object destructuring

const obj3 = {
    name3:"Gaurav", age3:23, dob:{day:11,month:8,year:2002}
};
let {dob:{day,month}} = obj3
console.log(day,month); // 11 8
// renaming the variables:
let {dob:{day:dob_day,month:dob_month}} = obj3
console.log(dob_day,dob_month); // 11 8


// ------------------------------------ spread ---------------------------------------
// It works on iterables, where Iterables are : String, Arrays, Maps, Sets but not Objects
let  newarr = [1,2,3,4]
let all_items = [8,9,7,newarr[0],newarr[1],newarr[2],newarr[3]]
console.log(all_items) //[8,9,7,1,2,3,4]
// use spead operator (...):
let all_items2 = [7,8,9,...newarr] // it is used to spread all the elements of array.
console.log(all_items) //[7,8,9,1,2,3,4]

let str = "Aarav"
let str_spread = [...str] // string spread
console.log(str_spread) // ['A', 'a', 'r', 'a', 'v']
console.log(...str) // A a r a v
// console.log(`spread of str is :${...str}.`) // But it not works in string literal.

// spread on objects:
let obj4 = {name:'Aarav',age:23}
let obj5 = {...obj4, dob:"11-08-2002", gender:"male"}
console.log(obj5) // {name: 'Aarav', age: 23, dob: '11-08-2002', gender: 'male'}


// ------------------------------------- Rest -----------------------------------------
// used on the left side
let [first, second, ...others] = [1, 2, 3, 4, 5, 6, 7, ...[8, 9]]
console.log(first, second, others) // 1 2 [3, 4, 5, 6, 7, 8, 9]

let weekdays = {
    'mon':{
        open:12,
        close:21
    },
    'tue':{
        open:10,
        close:22
    },
    'wed':{
        open:11,
        close:23
    }};
let {mon, ...restdays} = weekdays;
console.log(mon) // {open: 12, close: 21}
console.log(restdays) // {tue:{open:10,close:22}, wed:{open:11,close:23}}

// using rest into function for taking additional arguments just like *args and **kwargs
function rest_sum (a,b,...others){
    sum = 0;
    sum = a + b;
    for(i=0; i< others.length;i++){
        sum = others[i] + sum;
    }
    return sum
}

let my_rest_sum = rest_sum(2,3,4,5,7,8);
console.log(my_rest_sum) // 29


// ---------------------------------short-circuiting------------------------------------

// ---------------- || or -----------------------------
// it check if first value is true value then return that value, otherwise check next value
// if all values are false, it returns the last value.
const data1 = undefined;
// using ternary operator:
const value1 = data1 ? data : 10; // if data1 is true value, return data1 else return 10
// using short-curcuiting way:
const value2 = data1 || 10;
console.log(value2) // 10
const value3 = data1 || '' || 0 || 'Hello'
console.log(value3) // 'Hello'

// ---------------- && and -----------------------------
// it check if first value is false value then return that value, otherwise check next value
// if all values are true, it returns the last value.
const data2 = undefined;
// using ternary operator:
const value4 = data2 ? data : 10; // if data2 is true value, return data2 else return 10
// using short-curcuiting way:
const value5 = data2 && 10;
console.log(value5) // undefined
const value6 = data2 && '' && 0 && 'Hello';
console.log(value6) // undefined, value of data2

// ---------------- ?? nullish coalescing -----------------------------
// it check if first value is not null or undefined value then return that value, otherwise check next value
// if all values are not null or undefined, it returns the last value.
// it worked on null and undefined, but not works on 0, '', False.
const data3 = undefined;
// using short-curcuiting way:
const value7 = data3 ?? 10;
console.log(value7) // 10
const value8 = undefined ?? null ?? '' ?? 0 ?? false ?? 'hi';
console.log(value8) // '', empty string


// --------------------------------------- Call and Apply function --------------------------------------

// to apply a custom funtion of a object to any object where this keyword point to the current object.
const call_obj = {
    name: "Aarav",
    age: 23,
    skills: [],
    add_skill(str){
        console.log(`${this.name}, age: ${this.age} has added new skill ${str}`);
        this.skills.push(str);
    }
}
call_obj.add_skill('Python'); // Aarav, age: 23 has added new skill Python

const addskill = call_obj.add_skill; // its just a copy of call_obj.add_skill, where 'this' keyword not point to object.

const call_obj2 = {
    name: "Gaurav",
    age: 23,
    skills: []
}

addskill.call(call_obj2,"java"); // Gaurav, age: 23 has added new skill java

// apply works as same but take arrays as arguments:
addskill.apply(call_obj, ["C/C++"]); // Aarav, age: 23 has added new skill C/C++

// --------------------------------- Bind :
const obj2_bind = addskill.bind(call_obj2);
obj2_bind("Rust"); // Gaurav, age: 23 has added new skill Rust

const calcpercent = (rate,value) =>{  return value + value * rate };
const tenpercent = calcpercent.bind(null,0.1);
console.log(tenpercent(500)); // 550
// alternative of above:
function percentrate (rate){
    return function (value){
        return value + value * rate;
    }
}
const tenpercent2 = percentrate(0.1)
console.log(tenpercent2(400)) // 440


// ------------------------------ Immediately Invoked Funciton Expression IIFE -----------------------------
(function(){console.log("IIFE fucntion")})();
(()=>{console.log("IFFE using funciton expression.")})();

// -------------------------------------- Map, Filter, Reduce -----------------------------------------
// Map: applied a function to the iterable object.
const usd = [10,120,-23,65,5,-73,2,-89]
// const usdToInr = usd.map(function(value){return value * 85})
// const usdToInr = usd.map((value)=>{return value * 85})
const usdToInr = usd.map(value=>value * 85)
console.log(usdToInr) // [850, 10200, -1955, 5525, 425, -6205, 170, -7565]

// Filter: filter items from iterables based on condition.
const poitiveUsd = usd.filter(function(value){return value > 0})
console.log(poitiveUsd) // [10, 120, 23, 65, 5, 73, 2, 89]
// Find: return the first element where the condition is true
const firstNegative = usd.find(value=>value < 0)
console.log(firstNegative) // -23
// FindIndex : return the index of first element where the condition is true
const firstNegativeIndex = usd.findIndex(value=>value < 0)
console.log(firstNegativeIndex) // 2

// Reduce: reduce the value of iterables into a single value
const totalUsd = usd.reduce(function(accumulator,value,index,array){
    console.log(`accumulator: ${accumulator}, value: ${value}, index: ${index}.`); // accumulator: 0, value: 10, index: 0.
    return accumulator + value;
},0) // where initial value of accumulator is 0.
console.log(totalUsd); // 17
const maxUsd = usd.reduce(function(acc, value){return (acc > value) ? acc : value},0)
console.log(maxUsd) // 120

// chaining all three of them:
// finding max value of inr:
const totalPositiveInr = usd.map(value=>value*85).filter(value=>value>0).reduce(function(acc,val){return acc + val },0)
console.log(totalPositiveInr) // 17170

// ---------------------------------------- include, some, every, flat --------------------------------
const isInclude = usd.includes(120) // check if value is available in iterable
console.log(isInclude) // true
// Some: check if any value is available based on certain conidition:
const isSome = usd.some(value=>value>30)
console.log(isSome) // true
// Every: check if every value is available based on certain condition
const isEvery = usd.every(value=>value>30)
console.log(isEvery) // false
// Flat: it is used to flat nested iterables, array.flat(1), where 1 is the level of nesting.
const nestedArr = [[1,4,2,2],[45,[4,9],7,8],31,82,[1],19]
console.log(nestedArr.flat(1)) // [1, 4, 2, 2, 45, Array(2), 7, 8, 31, 82, 1, 19]
console.log(nestedArr.flat(2)) // [1, 4, 2, 2, 45, 4, 9, 7, 8, 31, 82, 1, 19]
console.log(nestedArr.flat(3)) // [1, 4, 2, 2, 45, 4, 9, 7, 8, 31, 82, 1, 19]


// ----------------------------------------------- Sorting ----------------------------------------
// Sort: it sorts the elements by converting it into string.
// It mutates the original array
const StrArrForSort = ["Aarav","Gaurav","sharma","Harithas","gaurav","Sharma","aarav"]
console.log(StrArrForSort.sort()) // ['Aarav', 'Gaurav', 'Harithas', 'Sharma', 'aarav', 'gaurav', 'sharma']

const NumArrForSort = [12,2,-54,45,100,-29,84]
console.log(NumArrForSort.sort()) // [-29, -54, 100, 12, 2, 45, 84]
// actual way of sorting Number array:
const actualNumSortAsce = NumArrForSort.sort((a,b)=>a-b)
console.log(actualNumSortAces) // [-54, -29, 2, 12, 45, 84, 100]
// By passing a callback function, it actually check if subtracting the first value from second gives us positive value or negative,
// If returned value is negative(means first value is small), then it didn't change there place. Ohterwise it interchanges it.
// If returned 0, then remain unchanged.

// Sorting in descending.
const actualNumSortDesc = NumArrForSort.sort((a,b)=>b-a)
console.log(actualNumSortDesc) // [100, 84, 45, 12, 2, -29, -54]


// --------------------------------------- OOP in Javascript ----------------------------------------------

function Person(name, age){
    this.name = name;
    this.age = age;
}

const person1 = new Person("Aarav",23);
const person2 = new Person("Gaurav",23)
console.log(person1.name, person1.age); // Aarav 23

// ------------ prototypal inheritance
// adding a function to that function
Person.prototype.calbirth = function (){
    console.log(`${this.name}'s birth year according to your age from 2025 is : ${2025 - this.age}.`);
};

Person.prototype.species = "Human";

person1.calbirth() // Aarav's birth year according to your age from 2025 is : 2002.
console.log(person1.species) // Human
person2.calbirth() // Gaurav's birth year according to your age from 2025 is : 2002.

// ----------------------- Using ES6 method
class PersonCls {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    // calbirth = function(){
    //     console.log(`${this.name}'s birth year according to your age from 2025 is : ${2025 - this.age}.`);
    // }
    calbirth(){
        console.log(`${this.name}'s birth year according to your age from 2025 is : ${2025 - this.age}.`);
    }
}

const personcls1 = new PersonCls("Aarav",23);

personcls1.calbirth() // Aarav's birth year according to your age from 2025 is : 2002.