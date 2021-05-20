import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));

app.post('/add', (req, res) => {
  const number1 = parseFloat(req.body.num1);
  const number2 = parseFloat(req.body.num2);
  let intflag = 0;
  if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
  }
  if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
  }
  if (intflag == 0) {
    const result = number1 + number2;
    res.status(200).send('result:' + result.toFixed(2));
  } else {
    res.status(200).send('The numbers you entered are not valid');
  }
});

app.post('/subtract', (req, res) => {
  const number1 = parseFloat(req.body.num1);
  const number2 = parseFloat(req.body.num2);
  let intflag = 0;
  if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
  }
  if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
  }
  if (intflag == 0) {
    const result = number1 - number2;
    res.status(200).send('result:' + result.toFixed(2));
  } else {
    res.status(200).send('The numbers you entered are not valid');
  }
});

app.post('/multuplication', (req, res) => {
  const number1 = parseFloat(req.body.num1);
  const number2 = parseFloat(req.body.num2);
  let intflag = 0;
  if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
  }
  if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
  }
  if (intflag == 0) {
    const result = number1 * number2;
    res.status(200).send('result:' + result.toFixed(2));
  } else {
    res.status(200).send('The numbers you entered are not valid');
  }
});

app.post('/divide', (req, res) => {
  const number1 = parseFloat(req.body.num1);
  const number2 = parseFloat(req.body.num2);
  let intflag = 0;
  if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
  }
  if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
  }
  if (intflag == 0) {
    const result = number1 / number2;
    res.status(200).send('result:' + result.toFixed(2));
  } else {
    res.status(200).send('The numbers you entered are not valid');
  }
});

exports.app = functions.https.onRequest(app);
