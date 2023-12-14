"use strict";
//Function which takes string and returns result.
//Inside it's going to call other functions to break this process down into steps
//1. We break the string down into numbers and operators, and fill an array with the results
//0,1,2,3,4... from left to right.
//2. we loop through the array and look for */, then take neighboring array element numbers
//and use operator to calculate their result. once that is done we replace the num1, num2 and operator
//with result and shrink array.
//
//
//Fix naming - parenthesis - singular parentheses - plural
function calculateString(str) {
  return;
}
function validateInput(str) {
  validateParentheses(str);
  validateExpression(str);
}

// TODO TERAZ - pridat vsetky operatory - mod, mocnina odmocnina, este raz prejst
// vsetky edge cases na validity checkoch

function validateParentheses(str) {
  //Validity tests:
  //there has to be an operator before opening parenthesis unless:
  //  parenthesis are the first item in the string
  //  nested paranthesis ((15-1)+25)
  //if ) comes before a (, false
  //if ( lacks a pair, false
  //if ) lacks a pair, false
  function operatorBeforeParenthesis() {
    const trimmedStr = str.slice(1, str.length);
    //opening paranthesis ( added to list of operators in case of nested parenthesis
    const noOperatorBeforeParenthesis = trimmedStr.match(/(?<![-+*/^√%(])\(/g);
    if (noOperatorBeforeParenthesis) {
      return "no operator before an opening paranthesis.";
    }
    return true;
  }
  function arePaired() {
    const parentheses = str.match(/[()]/g);
    let opening = 0;
    let closing = 0;
    for (const item of parentheses) {
      if (item === "(") opening++;
      else if (item === ")") {
        if (opening - closing === 0) return "unpaired closing parenthesis";
        closing++;
      }
    }
    return opening - closing === 0 ? true : "unpaired opening paranthesis";
  }

  if (operatorBeforeParenthesis() !== true) return operatorBeforeParenthesis();
  if (arePaired !== true) return arePaired();
  return true;
}

//check validity of string, no paranthesis
function validateExpression(str) {
  // Used to validate a math expression with no parenthesis. Need a
  // separate method to validate the entire string with parenthesis for things
  // like if string starts with a -( or just () etc. and a suitable name for both
  if (str.match(/^[^-\d]/)) {
    return "must start with a digit or -";
  }
  if (str.match(/[^\d)]$/)) {
    return "must end with a digit";
  }
  if (str.match(/([-+*/^√%]){2,}/)) {
    return "2 or more subsequent operators";
  }
  return true;
}

function parseString(str) {
  const elements = [];
  return;
  //returns array [num1, operator, num2, operator, num3, operator]
  //etc.
  //in terms of parenthesis,
}
//can't divide by 0
//
function testsxD() {
  console.log(validateExpression("15+12√11"));
  console.log(validateExpression("15+12+11"));
  console.log(validateParentheses("15+(25 - 4)(15 - 7)"));
  console.log(validateParentheses(")+("));
  console.log(validateParentheses(")+()+("));
  console.log(
    "parenthesis inside parenthesis",
    validateParentheses("15+((257)-(15+5))"),
  );
}
calculateString();
