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

// TODO TERAZ - pridat vsetky operatory - mod, mocnina odmocnina, este raz prejst
// vsetky edge cases na validity checkoch

export function validateParentheses(str) {
  //Validity tests:
  //there has to be an operator before opening parenthesis unless:
  //  parenthesis are the first item in the string
  //  nested paranthesis ((15-1)+25)
  //if ) comes before a (, false
  //if ( lacks a pair, false
  //if ) lacks a pair, false
  function hasOperatorBeforeParenthesis() {
    const trimmedStr = str.slice(1, str.length);
    //opening paranthesis ( added to list of operators in case of nested parenthesis
    const noOperatorBeforeParenthesis = trimmedStr.match(/(?<![-+*/^√%(])\(/g);
    if (noOperatorBeforeParenthesis) {
      return "no operator before an opening paranthesis.";
    }
    return true;
  }

  function validateParenthesesOrder() {
    const parentheses = str.match(/[()]/g);
    if (parentheses === null) return true;
    let parenthesesStack = 0;
    for (const char of parentheses) {
      if (char === "(") parenthesesStack++;
      else if (char === ")") {
        if (parenthesesStack === 0) return "unpaired closing parenthesis";
        parenthesesStack--;
      }
    }
    return parenthesesStack === 0 ? true : "unpaired opening paranthesis";
  }

  const operatorResult = hasOperatorBeforeParenthesis();
  if (operatorResult !== true) operatorResult;
  const validatedOrderResult = validateParenthesesOrder();
  if (validatedOrderResult !== true) return validatedOrderResult;
  return true;
}

//check validity of string, no parenthesis
export function validateExpression(str) {
  // Used to validate a math expression, doesn't take inner paranthesis into account
  // thus has to be called on the contents of parentheses that are inside the expression
  // separately
  if (str.match(/^[^-\d(]/)) {
    return "must start with a -, (, or a digit";
  }
  if (str.match(/[^\d)]$/)) {
    return "must end with a digit or )";
  }
  if (str.match(/([-+*/^√%]){2,}/)) {
    return "2 or more subsequent operators";
  }
  return true;
}

function testsxD() {
  console.log(validateExpression("15+12√11"));
  console.log(validateExpression("15+12+11"));
  console.log(
    "parenthesis at start and end",
    validateExpression("(15+26-(28*3))"),
  );
  console.log(validateParentheses("15+(25 - 4)(15 - 7)"));
  console.log("arepaired", validateParentheses(")+("));
  console.log(validateParentheses(")+()+("));
  console.log(
    "parenthesis inside parenthesis",
    validateParentheses("15+((257)-(15+5))"),
  );
}
testsxD();
