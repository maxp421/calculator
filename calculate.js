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
    console.log(str);
    const innermostParentheses = getInnermostParentheses(str);
    const result = evaluateTokens(tokenizeString(innermostParentheses));
    // str.splice(innermostParentheses.start, innermostParentheses.end, result); //
    //https://stackoverflow.com/questions/20817618/is-there-a-splice-method-for-strings
    //
    //edge case - when final string is surrounded with parenthesis
    const splitStr = str.split("(" + innermostParentheses + ")");
    //if result of parentheses contents starts with minus and there was a plus before the parentheses
    //we need to check before merging the splits and remove the +;
    //also shit like 15*-9 think about how to deal with that (potentially make all minuses
    // a part of the number, making the number negative? the whole three token strat needs
      // to be changed)
    if(result[0] === -)
    str = splitStr[0] + result + splitStr[1];
  }
  str = evaluateTokens(tokenizeString(str));
  //look for most nested parenthesis loop and slowly chip away at string until result.
  return str;
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
  const operators = [
    { operator: "^", isExhausted: false },
    { operator: "√", isExhausted: false },
    { operator: "/", isExhausted: false },
    { operator: "*", isExhausted: false },
    { operator: "%", isExhausted: false },
    { operator: "+", isExhausted: false },
    { operator: "-", isExhausted: false },
  ];
  function getResult([token1, operator, token2]) {
    token1 = +token1;
    token2 = +token2;
    if (operator === "^") return Math.pow(token1, token2);
    if (operator === "√") return Math.pow(token2, 1 / token1); //imprecise, write
    //custom function like https://cwestblog.com/2011/05/06/cube-root-an-beyond/
    if (operator === "*") return token1 * token2;
    if (operator === "/") return token1 / token2;
    if (operator === "%") return token1 % token2;
    //mention in readme and below the calc that modulo comes after */, to avoid
    //confusion use parentheses
    if (operator === "+") return token1 + token2;
    if (operator === "-") return token1 - token2;
  }

  while (tokens.length !== 1) {
    for (const entry of operators) {
      if (entry.isExhausted) continue;

      const operatorIndex = tokens.indexOf(entry.operator);

      if (operatorIndex === -1) {
        entry.isExhausted = true;
        continue;
      }
      const operationTokens = tokens.slice(
        operatorIndex - 1,
        operatorIndex + 2,
      );
      console.log("operationTokens", operationTokens);
      tokens.splice(
        operatorIndex - 1,
        operatorIndex + 2,
        getResult(operationTokens),
      );
      console.log(tokens);
      break;
    }
    return tokens.toString();

    //    calculate and modify token array;
    //can't divide by 0
    //order of operations (modulo)
    //- at the start of expressions (either solve in tokenize by making - at start
    //a part of the following number)
  }
}

console.log(calculate("15+23-(23*5-(23-4+((-15-9)-23)))"));
// console.log(getInnermostParentheses("15+23-(23*5-(23-4+((-15-9)-23)))"));
//ADD FLOATING POINT NUMBERS!!!
// console.log(calculate("15+23"));
