// afterwards call function that will parse input into elements consisting of
// either number, operator, or expression in paranthesis, store them in an array
// then look for a paranthesis expression in the array and recursivelly call the
// same function on it
//
// validate starter string?, same as validate expressions with minor differences
// i.e. expression can start with paranthesis.
// validate parenthesis
// 1. Look for most nested parentheses
// 2. store string index and contents of parentheses
// 3. check if expression is valid, if no return error message as result
//                                  if yes call a function that will parse it into
// numbers(floating point, don't forget the dot) and operators and store
// those in an array in original order
// 4. Look for operators descending from highest precedence to lowest, when
// an operator is found, take elements[0](num), elements[1](operator), elements[2](num)
// and evaluate them, store result.
// 5. Replace the 3 of them with the result, shifting the array
// to remove gaps. (potentially a better performance option with some other
// algorithm but order is important in this one);
// 6. After entire expression is evaluated, replace paranthesis in string with result.
// 7.
"use strict";
import { validateParentheses, validateExpression } from "./validateInput.js";
export function calculate(str) {
  if (validateExpression(str) !== true) return validateExpression(str);
  if (validateParentheses(str) !== true) return validateParentheses(str);

  while (str.match(/\(/)) {
    const innermostParentheses = getInnermostParentheses(str);
    const result = evaluateTokens(
      tokenizeString(
        str.slice(innermostParentheses.start, innermostParentheses.end),
      ),
    );
    // str.splice(innermostParentheses.start, innermostParentheses.end, result); //
    //https://stackoverflow.com/questions/20817618/is-there-a-splice-method-for-strings
    const splitStr = str.split("(" + innermostParentheses + ")");
    str = splitStr[0] + result + splitStr[1];
  }
  //look for most nested parenthesis loop and slowly chip away at string until result.
}

function tokenizeString(str) {
  const tokens = str.match(/(\d+|[-+*/^√%])/g);
  if (tokens[0] === "-") {
    const negativeNumber = tokens[0] + tokens[1];
    tokens.splice(0, 2, negativeNumber);
  }
  return tokens;
  //returns array [num1, operator, num2, operator, num3, operator]
  //etc.
  //in terms of parenthesis,
}

function getInnermostParentheses(str) {
  const innermostParentheses = str.match(/(?<=\()[^)(]*(?=\))/);
  return innermostParentheses[0]; // string
}

function evaluateTokens(tokens) {
  const operators = {
    "-": false,
    "+": false,
    "*": false,
    "/": false,
    "^": false,
    "√": false,
    "%": false,
  };
  function operatorIndex(tokens) {
    //could optimize this by stopping the search of operator types after
    //an operator type returns -1
    if (tokens.indexOf("^") !== -1) {
      return;
    }
  }
  while (tokens.length !== 1) {
    const operator = operatorIndex(tokens);

    //    calculate and modify token array;
    //can't divide by 0
    //order of operations (modulo)
    //- at the start of expressions (either solve in tokenize by making - at start
    //a part of the following number)
  }
}

console.log(
  tokenizeString(getInnermostParentheses("15+23-(23*5-(23-4+((-15-9)-23)))")),
);
console.log("-15+24-15*52/25".match(/(\d+|[-+*/^√%])/g));
