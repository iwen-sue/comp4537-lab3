const mo = require('./modules/math.js');

const a = 3;
const b = 2;

const sum = mo.add(a, b);
const difference = mo.subtract(a, b);

console.log(`Hello Grace. The sum of ${a} and ${b} is ${sum}. The difference of ${a} and ${b} is ${difference}.`);